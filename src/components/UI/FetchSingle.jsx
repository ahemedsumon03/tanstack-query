import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function FaceSinglePost() {

    const { id } = useParams();

    const FetchSinglePost = async () => {
        try {
            const { data, status } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            return status === 200 ? data : null;
        } catch (error) {
            console.log(error);
        }
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['singlePost', id],
        queryFn: FetchSinglePost,
        gcTime: 2000,
        staleTime: 5000
    })

    console.log(data)

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error is: {error.message || "Something wrong"}</p>

    return (
        <ul className="section-accordion">
            <li key={data?.id}>
                <p>{data?.id}</p>
                <p>{data?.title}</p>
                <p>{data?.body}</p>
            </li>
        </ul>
    )
}