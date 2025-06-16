import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  writeBatch,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiFilter, FiX } from "react-icons/fi";

const AdminEnquirires = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    phone: "",
    status: "",
    fromDate: "",
    toDate: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchEnquiries = async () => {
    const snapshot = await getDocs(collection(db, "contact_submissions"));
    const data = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        ...d,
        checkIn: d.checkIn?.toDate?.() || null,
        checkOut: d.checkOut?.toDate?.() || null,
        timestamp: d.timestamp?.toDate?.() || null,
      };
    });

    // Sort by createdAt if available, otherwise by document ID (which is time-ordered)
    data.sort((a, b) => {
      const timeA = a.timestamp?.getTime?.() || 0;
      const timeB = b.timestamp?.getTime?.() || 0;
      return timeB - timeA; // Newest first
    });

    setEnquiries(data);
    setFilteredEnquiries(data);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, enquiries]);

  const applyFilters = () => {
    let result = [...enquiries];

    if (filters.phone) {
      result = result.filter((e) =>
        e.phone?.toLowerCase().includes(filters.phone.toLowerCase())
      );
    }

    if (filters.status) {
      result = result.filter((e) => e.status === filters.status);
    }

    if (filters.fromDate) {
      const fromDate = new Date(filters.fromDate);
      result = result.filter((e) => {
        if (!e.checkIn) return false;
        return new Date(e.checkIn) >= fromDate;
      });
    }

    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      result = result.filter((e) => {
        if (!e.checkIn) return false;
        return new Date(e.checkIn) <= toDate;
      });
    }

    setFilteredEnquiries(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleStatusChange = async (
    id: string,
    newStatus: string,
    selectedDates?: string[],
    cottage?: string
  ) => {
    const docRef = doc(db, "contact_submissions", id);
    await updateDoc(docRef, { status: newStatus });

    if (newStatus === "booked" && selectedDates && cottage) {
      const batch = writeBatch(db);
      selectedDates.forEach((dateStr) => {
        const newDoc = doc(collection(db, "booked_dates"));
        batch.set(newDoc, { date: dateStr, cottage });
      });
      await batch.commit();
    }

    if (newStatus === "cancelled") {
      // First, fetch the enquiry to get its date range and accommodation
      const snapshot = await getDoc(docRef);
      const data = snapshot.data();

      if (data?.checkIn && data?.checkOut && data?.accommodation) {
        const checkIn = data.checkIn.toDate();
        const checkOut = data.checkOut.toDate();
        const cottage = data.accommodation;

        // Generate all date strings between checkIn and checkOut
        const dateStrings = [];
        const current = new Date(checkIn);
        while (current <= checkOut) {
          const dateStr = current.toISOString().split("T")[0];
          dateStrings.push(dateStr);
          current.setDate(current.getDate() + 1);
        }

        // Find and delete matching documents in booked_dates
        const q = query(
          collection(db, "booked_dates"),
          where("cottage", "==", cottage),
          where("date", "in", dateStrings.slice(0, 10)) // Firestore allows max 10 in "in" queries
        );

        const snapshot = await getDocs(q);
        const batch = writeBatch(db);
        snapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }
    }

    await fetchEnquiries();
  };

  const getDatesForBooking = (e: any): string[] => {
    if (!e.checkIn || !e.checkOut) return [];

    const start = new Date(e.checkIn);
    const end = new Date(e.checkOut);

    const dates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "-";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnquiries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const resetFilters = () => {
    setFilters({
      phone: "",
      status: "",
      fromDate: "",
      toDate: "",
    });
    setFilteredEnquiries(enquiries);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Contact Enquiries
          </h2>
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-lg font-medium">
            Manage customer enquiries
          </span>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Filters</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
              >
                <FiFilter className="mr-1" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
              <button
                onClick={resetFilters}
                className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
              >
                <FiX className="mr-1" />
                Reset
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={filters.phone}
                  onChange={(e) =>
                    setFilters({ ...filters, phone: e.target.value })
                  }
                  placeholder="Search by phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">All Statuses</option>
                  <option value="New">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="booked">Booked</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) =>
                    setFilters({ ...filters, fromDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) =>
                    setFilters({ ...filters, toDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredEnquiries.length} enquiries
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adults
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Child
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guests
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Accommodation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {formatDate(e.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {e.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {e.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {e.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {e.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {formatDate(e.checkIn)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {formatDate(e.checkOut)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {e.adults}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {e.children}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {e.guests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {e.accommodation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold 
                          ${
                            e.status === "booked"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                          ${
                            e.status === "contacted"
                              ? "bg-yellow-100 text-yellow-800"
                              : ""
                          }
                          ${
                            e.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : ""
                          }
                          ${
                            !e.status || e.status === "New"
                              ? "bg-blue-100 text-blue-800"
                              : ""
                          }`}
                        >
                          {e.status || "New"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {e.status === "New" || !e.status ? (
                          <button
                            onClick={() =>
                              handleStatusChange(e.id, "contacted")
                            }
                            className="text-xs bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-2 py-1 rounded mr-2"
                          >
                            Contacted
                          </button>
                        ) : e.status === "contacted" ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleStatusChange(
                                  e.id,
                                  "booked",
                                  getDatesForBooking(e),
                                  e.accommodation
                                )
                              }
                              className="text-xs bg-green-200 hover:bg-green-300 text-green-800 px-2 py-1 rounded"
                            >
                              Book
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(e.id, "cancelled")
                              }
                              className="text-xs bg-red-200 hover:bg-red-300 text-red-800 px-2 py-1 rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusChange(e.id, "cancelled")
                            }
                            className="text-xs bg-red-200 hover:bg-red-300 text-red-800 px-2 py-1 rounded"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={12}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No enquiries found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between items-center">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FiChevronLeft className="mr-1" />
                  Previous
                </button>
                <div className="hidden md:flex">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`mx-1 px-3 py-1 rounded-md ${
                          currentPage === number
                            ? "bg-emerald-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}
                </div>
                <div className="md:hidden text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                  <FiChevronRight className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminEnquirires;
