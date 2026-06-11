import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToHash from "../components/ScrollToHash";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <ScrollToHash />
      
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
