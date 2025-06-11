import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Enquiry {
  id: string;
  timestamp?: { toDate: () => Date };
  read?: boolean;
}

interface Stats {
  totalEnquiries: number;
  recentEnquiries: number;
  unreadEnquiries: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalEnquiries: 0,
    recentEnquiries: 0,
    unreadEnquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const snapshot = await getDocs(collection(db, "contact_submissions"));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Enquiry[];

        const now = Date.now();
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

        setStats({
          totalEnquiries: data.length,
          recentEnquiries: data.filter(enquiry =>
            enquiry.timestamp && new Date(enquiry.timestamp.toDate()).getTime() > sevenDaysAgo
          ).length,
          unreadEnquiries: data.filter(enquiry => !enquiry.read).length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="min-h-screen py-12 bg-gradient-to-b from-green-50 to-white ">
      <div className="container mx-auto px-4 md:px-6 mt-40">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-lg font-medium mb-3 shadow-sm">
            Wayanadan Huts Admin Dashboard
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mt-4">
            Welcome Back
          </h1>
          <p className="text-green-600 mt-2">
            Manage your eco-retreat with ease
          </p>
        </motion.div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatTile
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            title="Total Enquiries"
            value={stats.totalEnquiries}
            color="green"
            loading={loading}
          />

          <StatTile
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Recent (7 days)"
            value={stats.recentEnquiries}
            color="amber"
            loading={loading}
          />

          <StatTile
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            }
            title="Unread Enquiries"
            value={stats.unreadEnquiries}
            color="red"
            loading={loading}
          />
        </div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-green-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/enquiries"
              className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:border-green-300 transition-all hover:shadow-md flex items-center"
            >
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-green-900">View All Enquiries</h3>
                <p className="text-sm text-green-600">View the latest bookings</p>
              </div>
            </Link>

            <Link
              to="/"
              className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:border-green-300 transition-all hover:shadow-md flex items-center"
            >
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                {/* Home icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9.75L12 3l9 6.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-green-900">Home</h3>
                <p className="text-sm text-green-600">Go to homepage</p>
              </div>
            </Link>

          </div>
        </motion.div>


      </div>
    </section>
  );
};

interface StatTileProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  color: "green" | "amber" | "red";
  loading: boolean;
}

const StatTile = ({ icon, title, value, color, loading }: StatTileProps) => {
  const colorClasses = {
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      value: "text-green-900",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      value: "text-amber-900",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      value: "text-red-900",
    },
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-green-100"
    >
      <div className="p-6">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${colorClasses[color].bg} ${colorClasses[color].text}`}>
            {icon}
          </div>
          <div className="ml-4">
            <p className={`text-sm font-medium ${colorClasses[color].text}`}>
              {title}
            </p>
            <p className={`text-2xl font-semibold ${colorClasses[color].value}`}>
              {loading ? (
                <span className="inline-block h-6 w-6 border-2 border-green-200 border-t-green-500 rounded-full animate-spin"></span>
              ) : (
                value
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;