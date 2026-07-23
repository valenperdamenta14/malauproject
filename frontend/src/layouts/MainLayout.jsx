import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />

      <main
        style={{
          marginLeft: "270px",
          width: "calc(100% - 270px)",
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "28px",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;