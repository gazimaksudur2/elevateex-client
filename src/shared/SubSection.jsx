const SubSection = ({ heading, subHeading, align = "center" }) => {
  const alignCls = align === "left" ? "text-left" : "text-center";

  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto" : ""} py-12 px-4 ${alignCls}`}>
      <h2 className="heading-section text-balance">{heading}</h2>
      {subHeading && (
        <p className="mt-4 text-body-lg max-w-2xl mx-auto text-balance">{subHeading}</p>
      )}
    </div>
  );
};

export default SubSection;
