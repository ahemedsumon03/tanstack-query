import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <header>
            <div>
                <NavLink to="/">ReactQuery</NavLink>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/traditional">FetchOld</NavLink>
                    </li>
                    <li>
                        <NavLink to="/react-query"> FetchRQ </NavLink>
                    </li>
                    <li>
                        <NavLink to="/infinity-scrollbar"> InfiniteScroll </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
};