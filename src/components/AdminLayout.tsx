import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';



const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
    <main className="flex-grow">
      <Outlet />
    </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;