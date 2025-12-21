function PageContainer({ title, children }) {
  return (
    <div className="PageContainer">
      <h2>{title}</h2>
      <div className="page-box">{children}</div>
    </div>
  );
}

export default PageContainer;
