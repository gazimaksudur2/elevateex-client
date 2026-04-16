import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

/**
 * useUserInfo – fetches the current user's profile document from the backend.
 * Returns [userInfo, isLoading, error, refetch]
 */
const useUserInfo = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {
        data: userInfo,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data?.[0] ?? null;
        },
        enabled: !!user?.email,
        staleTime: 1000 * 60 * 5,
        retry: (failureCount, err) => {
            const status = err?.response?.status;
            if (status === 401 || status === 403) return false;
            return failureCount < 2;
        },
    });

    return [userInfo ?? null, isLoading, error, refetch];
};

export default useUserInfo;
