import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useClass = ({query})=>{
    // const value = (query == '') ? '': (query);
    // const value = '?course_status=approved';
    const axiosPublic = useAxiosPublic();
    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`allclasses${query}`);
            return res.data;
        }
    });
    return [classes];
}

export default useClass;