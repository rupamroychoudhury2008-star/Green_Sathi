function PageWrapper({ backgroundImage, children }) {
  return (
    <div
      className="page-bg"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="page-overlay">{children}</div>
    </div>
  );
}

export default PageWrapper;
