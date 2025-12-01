function PageContainer({ title, children }) {
  return (
    <div>
      <h2>{title}</h2>
      <div className="page-box">{children}</div>
    </div>
  );
}

export default PageContainer;
