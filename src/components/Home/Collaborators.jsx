import React, { useEffect, useState } from 'react';

const Collaborators = () => {
    const [sponsor, setSponsor] = useState();

    useEffect(() => {
        fetch('sponsors.json')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSponsor(data);
            })
    }, [])
    return (
        <div className='w-[92%] mx-auto py-10'>
            <h2 className='text-3xl text-center font-mulish font-semibold text-[#151515db]'>Our Proud Collaborators</h2>
            <div className='w-full flex justify-center items-center gap-10'>
                {
                    sponsor && sponsor.map(each => <>
                        <div className="card hover:scale-110 duration-100">
                            <div className="card-body flex flex-col justify-center items-center shadow-xl shadow-red-100 rounded-md">
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