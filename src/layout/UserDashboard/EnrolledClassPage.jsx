import { useLocation } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Classes from './classes/Classes';
import AllTopics from './classes/AllTopics';
import ClassWork from './classes/ClassWork';
import { IoAdd } from 'react-icons/io5';

const EnrolledClassPage = () => {
    const location = useLocation();
    const id = location.pathname;
    console.log(id);
    return (
        <div className='p-6'>
            <div className=' py-4 flex flex-col justify-center items-start'>
                <h2 className='text-xl font-semibold'>Rate your Experience </h2>
                <div className='w-full pr-20 flex justify-between items-center'>
                    <p>Rate through Teaching Evaluation Report submission</p>
                    <button className='btn btn-accent'><IoAdd size={24}/> TER</button>
                </div>
            </div>
            <Tabs>
                <TabList>
                    <Tab>Course Description</Tab>
                    <Tab>Course Classes</Tab>
                    <Tab>Class Works</Tab>
                </TabList>

                <TabPanel>
                    <AllTopics/>
                </TabPanel>
                <TabPanel>
                    <Classes/>
                </TabPanel>
                <TabPanel>
                    <ClassWork/>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default EnrolledClassPage;