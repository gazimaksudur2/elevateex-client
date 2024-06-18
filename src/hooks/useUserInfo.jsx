import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserInfo = ()=>{
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: userInfo = [] } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data;
        }
    });
    return [userInfo[0]];
}

export default useUserInfo;