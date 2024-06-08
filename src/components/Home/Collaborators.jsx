import { useEffect, useState } from 'react';
import SubSection from '../../shared/SubSection';

const Collaborators = () => {
    const [sponsor, setSponsor] = useState();
    const heading = "Our Valued Sponsors";
    const subHeading = "Meet our valued sponsors whose generous support across various levels—Platinum, Gold, Silver, Bronze, and Community—drives our mission and success, enabling us to achieve our goals and initiatives";

    useEffect(() => {
        fetch('sponsors.json')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setSponsor(data);
            })
    }, [])
    return (
        <div className='w-[92%] mx-auto py-10'>
            {/* <h2 className='text-3xl text-center font-mulish font-semibold text-[#151515db]'>Our Proud Collaborators</h2> */}
            <SubSection heading={heading} subHeading={subHeading}/>
            <div className='w-full flex justify-center items-center gap-10'>
                {
                    sponsor && sponsor.map(each => <>
                        <div className="w-40 py-4">
                            <div className="card-body flex flex-col justify-center items-center shadow-xl shadow-red-100 rounded-md duration-100 hover:shadow-none hover:border-2 hover:border-base-300">
                                <img className='w-10' src={each?.logo_url} alt="Shoes" />
                                <h2 className="card-title">{each?.company_name}</h2>
                            </div>
                        </div>
                    </>)
                }
            </div>
        </div>
    );
};

export default Collaborators;