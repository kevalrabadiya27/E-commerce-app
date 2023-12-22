import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredinfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../RequestMethod";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

export default function Home() {
    const [userStats, setUserStats] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        setIsLoading(true);
        const getStats = async () => {
            try {
                const res = await userRequest.get("/users/stats");
                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], "Active User": item.total },
                    ])
                );
            } catch { }
            finally { setIsLoading(false) }
        };
        getStats();
    }, [MONTHS]);

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                {
                    isLoading ? <Loader /> :
                        <div className="home">
                            <FeaturedInfo />
                            <Chart
                                data={userStats}
                                title="User Analytics"
                                grid
                                dataKey="Active User"
                            />
                            <div className="homeWidgets">
                                <WidgetSm />
                                <WidgetLg />
                            </div>
                        </div>
                }
            </div>
        </>
    );
}