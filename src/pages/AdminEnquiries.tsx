import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { motion } from "framer-motion";

const AdminEnquirires = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);

  const fetchEnquiries = async () => {
    const snapshot = await getDocs(collection(db, "contact_submissions"));
    const data = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        ...d,
        checkIn: d.checkIn?.toDate?.() || null, // Convert Firestore Timestamp to JS Date
        checkOut: d.checkOut?.toDate?.() || null,
      };
    });
    setEnquiries(data);
  };

  // 2. Fetch on component mount
  useEffect(() => {
    fetchEnquiries();
  }, []);

  // 3. Update and refetch on status change
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

    // ✅ Refresh the enquiries list after update
    await fetchEnquiries();
  };
  function getDatesForBooking(e: any): string[] {
    if (!e.checkIn || !e.checkOut) return [];

    const start = new Date(e.checkIn);
    const end = new Date(e.checkOut);

    const dates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split("T")[0]); // YYYY-MM-DD
    }
    return dates;
  }

  return (
    <section
      id="enquiries"
      className="py-20 bg-gradient-to-b from-emerald-50 to-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-lg font-medium mb-4">
            Contact Enquiries
          </span>
        </motion.div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Check-In</th>
                <th className="px-6 py-3">Check-Out</th>
                <th className="px-6 py-3">Guests</th>
                <th className="px-6 py-3">Accommodation</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr
                  key={e.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {e.name}
                  </td>
                  <td className="px-6 py-4">{e.email}</td>
                  <td className="px-6 py-4">{e.phone}</td>
                  <td className="px-6 py-4">
                    {e.checkIn ? e.checkIn.toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {e.checkOut ? e.checkOut.toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4">{e.guests}</td>
                  <td className="px-6 py-4">{e.accommodation}</td>
                  <td className="px-6 py-4">{e.message}</td>
                  <td className="px-6 py-4">
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
                      ${!e.status ? "bg-gray-100 text-gray-800" : ""}`}
                    >
                      {e.status || "New"}
                    </span>
                  </td>

                  <td className="px-6 py-4 space-x-2">
                    {e.status === "New" ? (
                      <button
                        onClick={() => handleStatusChange(e.id, "contacted")}
                        className="text-xs bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-2 py-1 rounded"
                      >
                        Mark Contacted
                      </button>
                    ) : (
                      <div className="flex">
                        <button
                          onClick={() =>
                            handleStatusChange(
                              e.id,
                              "booked",
                              getDatesForBooking(e),
                              e.accommodation
                            )
                          }
                          className="text-xs bg-green-200 hover:bg-green-300 text-green-800 px-2 py-1 rounded  me-2"
                        >
                          Booked
                        </button>
                        <button
                          onClick={() => handleStatusChange(e.id, "cancelled")}
                          className="text-xs bg-red-200 hover:bg-red-300 text-red-800 px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminEnquirires;
