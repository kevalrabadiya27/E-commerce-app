import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { userRequest } from "../../RequestMethod";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Loader from "../../components/Loader";

export default function UserList() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        const getUsers = async () => {
            try {
                const res = await userRequest.get("users");
                setData(res.data);
            } catch (e) { console.log("Error in fecth api"); }
            finally { setIsLoading(false) }
        };
        getUsers();
    }, []);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };
    // table column
    const columns = [
        {
            field: "id", headerName: "Avtar", width: 90,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={params.row.avatar} alt="" />
                    </div>
                );
            }
        },
        {
            field: "user",
            headerName: "User",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {/* <img className="userListImg" src={params.row.avatar} alt="" /> */}
                        {params.row.username}
                    </div>
                );
            },
        },
        { field: "email", headerName: "Email", width: 200 },
        // {
        //     field: "status",
        //     headerName: "Status",
        //     width: 120
        // },
        // {
        //     field: "transaction",
        //     headerName: "Transaction Volume",
        //     width: 160,
        // },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row._id}>
                            <button className="userListEdit">Edit</button>
                        </Link>

                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <>

            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="userList" style={{ height: '500px', width: '100%', marginTop: "40px" }}>
                    {
                        isLoading ? <Loader /> :

                            <DataGrid
                                rows={data}
                                style={{ fontSize: "15px" }}
                                disableSelectionOnClick
                                columns={columns}
                                pageSize={7}
                                checkboxSelection
                                getRowId={(row) => row._id}
                            />
                    }
                </div>
            </div>
        </>
    );
}