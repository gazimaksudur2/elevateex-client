const SubSection = ({heading, subHeading}) => {
    return (
        <div className='w-[70%] mx-auto py-10 text-center'>
            <h2 className="text-3xl font-mulish font-bold text-[#151515db] pb-2">{heading}</h2>
            <p className="text-[#151515bb] ">{subHeading}</p>
        </div>
    );
};

export default SubSection;