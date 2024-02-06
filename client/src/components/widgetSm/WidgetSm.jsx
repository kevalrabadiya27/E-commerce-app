import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../RequestMethod";
import { Link } from "react-router-dom";

export default function WidgetSm() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await userRequest.get("users/?new=true");
                setUsers(res.data);
            } catch (e) { console.log(e); }
        };
        getUsers();
    }, []);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">

                {users.map((user) => (
                    <li className="widgetSmListItem" key={user._id}>
                        <img
                            src={user.img || 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png'}
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.username}</span>
                            <span className="widgetSmUserTitle">{user.jobrole}</span>
                        </div>
                        <button className="widgetSmButton">
                        <Link to="/users" style={{textDecoration:'none'}}>
                            <Visibility className="widgetSmIcon" />
                            Display
                        </Link>
                        </button>
                    </li>
                ))}

            </ul>
        </div>
    );
}