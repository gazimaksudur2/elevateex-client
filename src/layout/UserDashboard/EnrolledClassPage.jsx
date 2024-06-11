// import { useLocation } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import Classes from './classes/Classes';
import AllTopics from './classes/AllTopics';
import ClassWork from './classes/ClassWork';
import { IoAdd } from 'react-icons/io5';
import { useRef } from 'react';
import Swal from 'sweetalert2';

const EnrolledClassPage = () => {
    // const location = useLocation();
    // const id = location.pathname;
    // console.log(id);
    const course = {
        "id": 1,
        "course_banner": "https://kinforce.net/learen/wp-content/uploads/2022/08/young-woman-doing-web-meeting-using-mirrorless-cam-7CTA9CH.jpg",
        "instructor": "Jane Doe",
        "instructor_url": "https://kinforce.net/learen/wp-content/uploads/2022/08/small-business-owners-startup-and-e-commerce-conce-83S5W35.jpg",
        "instructor_email": "janedoe@gmail.com",
        "course_title": "Introduction to Python",
        "course_fee": "99.99",
        "course_type": "Programming",
        "course_duration": "4 weeks",
        "total_lessons": 20,
        "rating": 4.8,
        "course_status": "pending",
        "course_description": "Embark on a journey to learn Python basics and start coding with confidence in just 4 weeks. This comprehensive course covers everything from variables and data types to loops, functions, and object-oriented programming concepts. Gain hands-on experience with practical exercises and projects designed to reinforce your understanding of Python fundamentals. By the end of the course, you'll have the skills to write your own Python scripts and applications, setting a solid foundation for further exploration in the world of programming."
    };
    const ref = useRef();
    
    const adminApply = () => {
        // const letter = ref
        console.log(ref.current.value);
        Swal.fire({
            title: "Best of Luck!",
            text: "Application Submitted Successfully!",
            icon: "success"
        });
    }
    const defaultLetter = "I am writing to formally request admin privileges for my account. As I continue to contribute to our ElevateEx, having admin access would enable me to manage tasks more efficiently and assist with administrative responsibilities, ensuring smoother operations and timely updates.";
    const TERmodal = <>
        <dialog id="my_modal_1" className="modal backdrop-blur">
            <div className="modal-box bg-base-100">
                <div className="w-full flex flex-col justify-center items-center">
                    <img className="w-40" src="https://img.freepik.com/free-vector/follow-me-social-business-theme-design_24877-50426.jpg?t=st=1717443448~exp=1717447048~hmac=e757907a06ab84e3244b1cdfc700081ea5fef85f5985f3f3026ba306bf2e14cf&w=740" alt="" />
                </div>
                <div className="flex flex-col justify-center items-start">
                    <p>To superAdmin,</p>
                    <h3 className=""><span className="font-semibold text-lg">Subject:</span> Request for the Admin role.</h3>
                </div>
                <h3 className="font-bold text-lg">Hello! Sir,</h3>
                {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                <div className="modal-action">
                    <form method="dialog" className="w-full flex flex-col justify-center items-center gap-3">
                        <textarea ref={ref} className="textarea textarea-secondary w-full h-44" defaultValue={defaultLetter}></textarea>
                        <div className="w-full flex justify-end items-center gap-3">
                            <button className="btn btn-primary">Close</button>
                            <button onClick={adminApply} className="btn btn-outline">Apply</button>
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