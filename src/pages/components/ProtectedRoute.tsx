import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;
  if (!user || user.email !== "wayanadanhuts@gmail.com") return <Navigate to="/admin/login" />;

  return children;
};
