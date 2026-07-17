import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Sidebar />

      <main
        style={{
          marginLeft: "260px",
          padding: "30px",
          background: "#f1f5f9",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </>
  );
};

export default MainLayout;