import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiFilter, FiX } from "react-icons/fi";

type Rating = {
  id: string;
  name: string;
  rating: number;
  description: string;
  status: string;
  createdAt: Date | null;
};

const AdminRatings = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [filteredRatings, setFilteredRatings] = useState<Rating[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    status: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchRatings = async () => {
    const snapshot = await getDocs(collection(db, "ratings"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Rating, "id" | "createdAt">),
      createdAt: doc.data().createdAt?.toDate?.() || null,
    })) as Rating[];

    data.sort((a, b) => b.createdAt?.getTime() - a.createdAt?.getTime());
    setRatings(data);
    setFilteredRatings(data.filter((r) => r.status === ""));
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, ratings]);

  const applyFilters = () => {
    let result = [...ratings];
    if (filters.status) {
      result = result.filter((r) => r.status === filters.status);
    }
    setFilteredRatings(result);
    setCurrentPage(1);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const docRef = doc(db, "ratings", id);
    await updateDoc(docRef, { status: newStatus });
    await fetchRatings();
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "-";
    return new Intl.DateTimeFormat("en-IN").format(date);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRatings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRatings.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const resetFilters = () => {
    setFilters({ status: "" });
    setFilteredRatings(ratings.filter((r) => r.status === ""));
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
            User Ratings
          </h2>
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-lg font-medium">
            Manage submitted ratings
          </span>
        </motion.div>

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
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">All</option>
                  <option value="New">New</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredRatings.length} ratings
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Comment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(r.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {r.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {r.rating}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {r.description}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            r.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : r.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {r.status || "New"}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        {r.status === "New" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(r.id, "approved")
                              }
                              className="text-xs bg-green-200 hover:bg-green-300 text-green-800 px-2 py-1 rounded"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(r.id, "rejected")
                              }
                              className="text-xs bg-red-200 hover:bg-red-300 text-red-800 px-2 py-1 rounded"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No ratings found for selected filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border text-sm rounded-md ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400"
                    : "bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                <FiChevronLeft className="inline mr-1" />
                Previous
              </button>
              <div className="hidden md:flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <button
                      key={n}
                      onClick={() => paginate(n)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === n
                          ? "bg-emerald-500 text-white"
                          : "bg-white hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {n}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border text-sm rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400"
                    : "bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                Next
                <FiChevronRight className="inline ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminRatings;
