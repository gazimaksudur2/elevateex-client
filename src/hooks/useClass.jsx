import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

/**
 * useClass – fetches courses with an optional query string.
 * Returns [courses, isLoading, error, refetch]
 */
const useClass = ({ query = '' } = {}) => {
    const axiosPublic = useAxiosPublic();

    const {
        data: classes = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['classes', query],
        queryFn: async () => {
            const res = await axiosPublic.get(`allclasses${query}`);
            return res.data;
        },
        // Do not retry on 4xx — the data shape won't change
        retry: (failureCount, err) => {
            const status = err?.response?.status;
            if (status && status >= 400 && status < 500) return false;
            return failureCount < 2;
        },
    });

    return [classes, isLoading, error, refetch];
};

export default useClass;
