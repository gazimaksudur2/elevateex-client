// import { useLocation } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import Classes from './classes/Classes';
import AllTopics from './classes/AllTopics';
import ClassWork from './classes/ClassWork';
import { IoAdd } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { Rating } from '@mui/material';
import { useLocation } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserInfo from '../../hooks/useUserInfo';

const EnrolledClassPage = () => {
    const location = useLocation();
    const [course, setCourse] = useState();
    const axiosSecure = useAxiosSecure();
    const [userInfo] = useUserInfo();
    const id = location.pathname.split('/')[location.pathname.split('/').length - 1];
    // console.log(id);
    useEffect(()=>{
        axiosSecure.get(`/allclasses?_id=${id}`)
        .then(res=>{
            setCourse(res.data[0]);
        })
        .catch(error=>{
            console.log(error);
        })
    },[]);
    // const course = {
    //     "id": 1,
    //     "course_banner": "https://kinforce.net/learen/wp-content/uploads/2022/08/young-woman-doing-web-meeting-using-mirrorless-cam-7CTA9CH.jpg",
    //     "instructor": "Jane Doe",
    //     "instructor_url": "https://kinforce.net/learen/wp-content/uploads/2022/08/small-business-owners-startup-and-e-commerce-conce-83S5W35.jpg",
    //     "instructor_email": "janedoe@gmail.com",
    //     "course_title": "Introduction to Python",
    //     "course_fee": "99.99",
    //     "course_type": "Programming",
    //     "course_duration": "4 weeks",
    //     "total_lessons": 20,
    //     "rating": 4.8,
    //     "course_status": "pending",
    //     "course_description": "Embark on a journey to learn Python basics and start coding with confidence in just 4 weeks. This comprehensive course covers everything from variables and data types to loops, functions, and object-oriented programming concepts. Gain hands-on experience with practical exercises and projects designed to reinforce your understanding of Python fundamentals. By the end of the course, you'll have the skills to write your own Python scripts and applications, setting a solid foundation for further exploration in the world of programming."
    // };
    const ref = useRef();
    const ratingRef = useRef();
    // console.log(course);

    const reviewSubmission = () => {
        // const letter = ref
        // console.log(ref.current.value);
        const reviewDoc = {
            description: ref.current.value,
            rating: ratingRef.current.value,
            user_name: userInfo.displayName,
            user_url: userInfo.photoURL,
            rated_at: new Date().toISOString().slice(0,10),
            course_title: course.course_title,
        }
        axiosSecure.post(`reviews`, reviewDoc )
            .then(() => {
                Swal.fire({
                    title: "Great job!",
                    text: "Review submitted Successfully!",
                    icon: "success"
                });
            })
            .catch(error => {
                // console.log(error.message);
                Swal.fire({
                    title: "Error Occured!",
                    text: error.message,
                    icon: "error"
                });
            })
    }
    const defaultLetter = ('The '+ course?.course_title +' course offers exceptional content, clear and engaging instruction from '+ course?.instructor +', and practical projects that reinforce learning. With strong community support and comprehensive resources, this course is a valuable investment for anyone looking to master [subject/topic]. Highly recommended!');
    const TERmodal = <>
        <dialog id="my_modal_1" className="modal backdrop-blur">
            <div className="modal-box bg-base-100">
                <div className="w-full flex flex-col justify-center items-center">
                    <img className="w-40" src="https://img.freepik.com/free-vector/hand-drawn-cartoon-business-planning_23-2149158459.jpg?t=st=1718243146~exp=1718246746~hmac=8a44771af4255b9d25c4de78d618b9996d5a6c1fe648b0cbd2434d7e7df87509&w=826" alt="" />
                </div>
                <h3 className="text-center font-medium text-[#151515ab]">Submit your <span className="font-semibold text-blue-600"> Experience in a Review</span> Over this course.</h3>
                {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                <div className="modal-action">
                    <form method="dialog" className="w-full flex flex-col justify-center items-center gap-3">
                        <div className='flex justify-center items-center gap-8'>
                            <p className='text-lg'>Rate Here</p>
                            <Rating ref={ratingRef} name="half-rating-read" precision={0.5}/>
                        </div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Your review</span>
                            </div>
                            <textarea ref={ref} className="textarea textarea-secondary w-full h-44" defaultValue={defaultLetter}></textarea>
                        </label>
                        <div className="w-full flex justify-end items-center gap-3">
                            <button className="btn btn-primary">Cancel</button>
                            <button onClick={reviewSubmission} className="btn btn-outline">Review it</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    </>
    return (
        <div className='p-6'>
            {TERmodal}
            <div className=' py-4 flex flex-col justify-center items-start'>
                <h2 className='text-xl font-semibold'>Rate your Experience </h2>
                <div className='w-full pr-20 flex justify-between items-center'>
                    <p>Rate through Teaching Evaluation Report submission</p>
                    <button onClick={() => document.getElementById('my_modal_1').showModal()} className='btn btn-accent'><IoAdd size={24} /> TER</button>
                </div>
            </div>
            <Tabs>
                <TabList>
                    <Tab>Course Description</Tab>
                    {/* <Tab>Course Classes</Tab> */}
                    <Tab>Class Works</Tab>
                </TabList>

                <TabPanel>
                    <AllTopics course={course} />
                </TabPanel>
                {/* <TabPanel>
                    <Classes course={course}/>
                </TabPanel> */}
                <TabPanel>
                    <ClassWork course={course} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default EnrolledClassPage;