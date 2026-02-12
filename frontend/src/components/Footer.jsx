function Footer() {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "20px",
        textAlign: "center",
        borderTop: "1px solid #e5e7eb",
        backgroundColor: "#fafafa",
        fontSize: "14px",
        color: "#6b7280",
      }}
    >
      © {new Date().getFullYear()} Green Sathi 🌱  
      <br />
      Empowering farmers with AI
    </footer>
  );
}

export default Footer;
