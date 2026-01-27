import { Outlet } from "react-router-dom";
import Navigationbar from "./components/Navigationbar";
import Footer from './components/Footer'
import Header from "./components/Header";

const MainLayout = () => {
  return (
    <>

      <Header />
      <Navigationbar />

      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;