import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={styles.main}>{children}</main>
    </>
  );
}

const styles = {
  main: {
    minHeight: "calc(100vh - 70px)",
    padding: "30px",
    background: "#f9fafb",
  },
};

export default Layout;
