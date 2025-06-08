import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      const snapshot = await getDocs(collection(db, "contact_submissions"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEnquiries(data);
    };
    fetchEnquiries();
  }, []);

  return (
    <section
      id="food-menu"
      className="py-20 bg-gradient-to-b from-emerald-50 to-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-lg font-medium mb-4">
            Dashboard
          </span>
        </motion.div>
        {/* Tile Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800 dark:text-white">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Total Enquiries
            </p>
            <p className="text-3xl font-semibold text-blue-600">
              {enquiries.length}
            </p>
          </div>
          {/* You can add more tiles here */}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
