import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useClass = ()=>{
    const axiosPublic = useAxiosPublic();
    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async()=>{
            const res = await axiosPublic.get('allclasses');
            return res.data;
        }
    });
    return [classes];
}

export default useClass;