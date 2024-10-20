import axios from "axios";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from 'react-intersection-observer';

export default function InfinityScoller() {

    const { inView, ref } = useInView({
        threshold: 1,
    });

    const fetchGithubData = async ({ pageParam = 1 }) => {
        try {
            const { data } = await axios.get(`https://api.github.com/users?per_page=10&page=${pageParam}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const { data, fetchNextPage, hasNextPage, status, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchGithubData,
        getNextPageParam: (lastPage, allpage) => {
            return lastPage.length === 10 ? allpage.length + 1 : undefined;
        }
    })

    // const handleScroll = () => {
    //     const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
    //     if (bottom && hasNextPage) {
    //         fetchNextPage();
    //     }
    // }

    useEffect(() => {
        // window.addEventListener('scroll', handleScroll);
        // return () => window.removeEventListener('scroll', handleScroll);

        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, inView, fetchNextPage]);

    if (status === 'loading') return <div style={{ fontSize: '20px', color: 'whitesmoke' }}>Loading..</div>
    if (status === 'error') return <div style={{ fontSize: '20px', color: 'whitesmoke' }}>Error..</div>


    return (
        <div>
            <p style={{ textAlign: 'center', textDecoration: 'underline' }}>Infinity ScrollBar with tanstack query</p>

            {data?.pages?.map((page, index) => (
                <ul key={index}>
                    {page.map((user) => (
                        <li
                            key={user.id}
                            style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                            <p>{user.login}</p>
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                width={50}
                                height={50}
                            />
                        </li>
                    ))}
                </ul>
            ))}

            <div ref={ref} style={{ padding: "20px", textAlign: "center", color: 'white', fontSize: '20px' }}>
                {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                        ? "Scroll down to load more"
                        : "No more users"}
            </div>
        </div>
    )
}