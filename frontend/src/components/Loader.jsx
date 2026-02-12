function Loader({ text = "Loading..." }) {
  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontSize: "16px",
        color: "#374151",
      }}
    >
      ⏳ {text}
    </div>
  );
}

export default Loader;
