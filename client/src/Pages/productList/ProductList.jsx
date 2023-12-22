import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { publicRequest } from "../../RequestMethod";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { getProducts, deleteProduct } from "../../Redux/apiCalls";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

export default function ProductList() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProduct = async () => {
        setIsLoading(true);
        try {
            const res = await publicRequest.get('products');
            setData(res.data);
        } catch (e) { console.log("Error in fecth api in product list"); }
        finally { setIsLoading(false) }
    };
    useEffect(() => {
        getProduct();
    }, []);

    const handleDelete = (id) => {
        // use redux-toolkit
        deleteProduct(id, dispatch);
        getProduct();
        toast.success("product deleted")
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
            field: "product",
            headerName: "Product",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="" />
                        {params.row.title}
                    </div>
                );
            },
        },
        { field: "inStock", headerName: "Stock", width: 200 },
        {
            field: "price",
            headerName: "Price($)",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/productlist/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
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
                <div className="productList" style={{ height: '550px', width: '100%', marginTop: "40px" }}>
                    {
                        isLoading ? <Loader /> :
                            <DataGrid
                                rows={data}
                                disableSelectionOnClick
                                columns={columns}
                                getRowId={(row) => row._id}
                                pageSize={7}
                                checkboxSelection
                            />
                    }
                </div>
            </div>
        </>
    );
}