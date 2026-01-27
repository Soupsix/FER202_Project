import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from './components/Footer'
import Header from "./components/Header";

const MainLayout = () => {
  return (
    <>

      <Header />
      <Navbar />

      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;