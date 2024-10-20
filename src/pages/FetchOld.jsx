import axios from "axios";
import { useEffect, useState } from "react"

const FetchOld = () => {

    const [posts, setposts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const getPostData = async () => {
        try {
            const { data, status } = await axios.get("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3");
            if (status === 200) {
                setposts(data);
                setLoading(false);
            }

        } catch (error) {
            console.log(error);
            setIsError(true);
            setLoading(false);
        }
    }

    useEffect(() => { getPostData() }, []);

    isLoading && <p>Loading...</p>;
    isError && <p>Something went wrong</p>;

    return (
        <div>
            <ul className="section-accordion">
                {posts?.map(({ id, title, body }) => (
                    <li key={id}>
                        <p>{title}</p>
                        <p>{body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FetchOld