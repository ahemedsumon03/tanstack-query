import axios from "axios";
import { keepPreviousData, useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const FetchRq = () => {

    const [pageNumber, setPageNumber] = useState(0);

    const queryClient = useQueryClient();

    const fetchData = async () => {
        try {
            const { data, status } = await axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${pageNumber}&_limit=3`);
            if (status === 200) {
                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deletePost = (id) => {
        return axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    }

    const updatePost = (id) => {
        return axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, { title: 'Hello update Data' });
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', pageNumber],
        queryFn: fetchData,
        gcTime: 2000,
        placeholderData: keepPreviousData
    })

    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (data, id) => {
            console.log({ data, id });
            queryClient.setQueryData(['posts', pageNumber], (oldData) => {
                return oldData?.filter(post => post.id !== id);
            })
        }
    })

    const updateMutation = useMutation({
        mutationFn: (id) => updatePost(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(['posts', pageNumber], (oldData) => {
                return oldData?.map(post => post.id === id ? { ...post, title: data?.data?.title } : post)
            })
        }
    })


    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error is: {error.message || "Something wrong"}</p>


    return (
        <div>
            <ul className="section-accordion">
                {data?.map(({ id, title, body }) => (
                    <li key={id}>
                        <NavLink to={`/data/${id}`}>
                            <p>{id}</p>
                            <p>{title}</p>
                            <p>{body}</p>
                        </NavLink>
                        <button onClick={() => deleteMutation.mutate(id)}>Deltete</button>
                        <button onClick={() => updateMutation.mutate(id)}>Update</button>
                    </li>
                ))}
            </ul>

            <div className="pagination-section container">
                <button disabled={pageNumber < 1} onClick={() => setPageNumber((prev) => prev - 3)}>Prev</button>
                <p>{(pageNumber / 3) + 1}</p>
                <button onClick={() => setPageNumber(prev => prev + 3)}>Next</button>
            </div>
        </div>
    )
}

export default FetchRq