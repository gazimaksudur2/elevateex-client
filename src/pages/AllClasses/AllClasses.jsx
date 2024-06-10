import { ScrollRestoration } from 'react-router-dom';
import SubSection from '../../shared/SubSection';
import { MdFilterList } from 'react-icons/md';
import ClassCards from '../../components/AllClasses/ClassCards';
import { useEffect, useState } from 'react';

const AllClasses = () => {
    const [courses, setCourses] = useState();
    const heading = "Discover Our Wide Range of Courses";
    const subHeading = "Explore our extensive selection of classes, carefully curated to expand your knowledge and skills across various fields. Each course is designed to support your educational and career goals, providing you with the tools and resources needed for success.";
    const handleFilter = ()=>{

    }

    useEffect(()=>{
        fetch('courses.json')
        .then(res=>res.json())
        .then(data=>{
            setCourses(data);
        })
    },[]);

    return (
        <div className="pb-8 -mt-10">
            <ScrollRestoration />
            <SubSection heading={heading} subHeading={subHeading}/>
            <p className="text-center text-xl font-semibold py-2">Total Existing course is : {courses?.length}</p>
            <div className="my-4 md:my-8 w-[95%] md:w-[80%] mx-auto flex flex-col md:flex-row justify-between md:items-center space-y-4">
                <div className="flex justify-center items-center gap-0">
                    <input type="text" placeholder="Find Your Preferred course.." className="input input-bordered w-full rounded-r-none" />
                    <button className="btn btn-primary rounded-l-none">Search</button>
                </div>
                <div className="md:w-[30%] flex justify-center items-center gap-4">
                    <div className="flex justify-center items-center gap-1">
                        <MdFilterList size={20} className="font-semibold" />
                        <h4 className="font-medium">Filter By</h4>
                    </div>
                    <select onChange={handleFilter} className="w-[60%] md:w-[40%] select select-info" name="price">
                        <option disabled selected value={'all'}>Price</option>
                        <option value={'all'}>All</option>
                        <option value={'40-150'}>$40-$150</option>
                        <option value={'151-300'}>$151-$300</option>
                        <option value={'301-500'}>$301-$500</option>
                        <option value={'501 to more'}>$501 & more</option>
                    </select>
                </div>
            </div>
            <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    courses && courses.map((course, idx) => (<ClassCards key={idx} course={course}/>))
                }
            </div>
        </div>
    );
};

export default AllClasses;