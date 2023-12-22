import "./product.css";
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData";
import { userRequest, publicRequest } from "../../RequestMethod"
import { Link, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { format } from 'timeago.js'

export default function Product() {
    const location = useLocation();
    const productdId = location.pathname.split("/")[2];
    // const [pStats, setpStats] = useState([""]);
    const [oldData, setOldData] = useState([]);
    const [loading, setloading] = useState(false);
    // const product = useSelector((state) => state.product.products.find((product) => product._id == productdId));

    const [Update, setUpdate] = useState({
        title: oldData.title,
        price: oldData.price,
        color: oldData.color,
        size: oldData.size
    })

    // const MONTHS = useMemo(
    //     () => [
    //         "Jan",
    //         "Feb",
    //         "Mar",
    //         "Apr",
    //         "May",
    //         "Jun",
    //         "Jul",
    //         "Agu",
    //         "Sep",
    //         "Oct",
    //         "Nov",
    //         "Dec",
    //     ],
    //     []
    // );

    // useEffect(() => {
    //     const getStats = async () => {
    //         try {
    //             const res = await userRequest.get("orders/income?pid=" + productdId);
    //             console.log(res.data);
    //             const list = res.data.sort((a, b) => {
    //                 return a._id - b._id
    //             })
    //             list.map((item) =>
    //                 setpStats((prev) => [
    //                     ...prev,
    //                     { name: MONTHS[item._id - 1], Sales: item.total },
    //                 ])
    //             );
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     getStats();
    // }, [productdId, MONTHS]);

    useEffect(() => {
        const getProduct = async () => {
            setloading(true)
            try {
                const res = await publicRequest.get("/products/find/" + productdId)
                setOldData(res.data)
            } catch (err) {
                console.log(err);
            }
            finally {
                setloading(false)
            }
        }
        getProduct();
    }, [productdId])

    const handleChange = (e) => {
        setUpdate({ ...Update, [e.target.name]: e.target.value })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await publicRequest.put("products/" + productdId, {
                title: Update.title,
                price: Update.price,
                color: Update.color,
                size: Update.size
            }).then((res) => {
                setUpdate(res.data)
                toast.success("Edit sucessfully please refresh page")
            })
        } catch (e) {
            toast.error(e)
        }

    }
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">PRODUCT</h1>
                <Link to='/newproduct'>
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={productData} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    {

                        loading ? <h3>Loading.....</h3> :
                            <div className="productInfoTop">
                                <img src={oldData.img} alt="" className="productInfoImg" />
                                <span className="productName">{oldData.title}</span>
                            </div>
                    }
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Size:</span>
                            <span className="productInfoValue">{oldData.size}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Color:</span>
                            <span className="productInfoValue">{oldData.color}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Price:</span>
                            <span className="productInfoValue">{oldData.price}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Create:</span>
                            <span className="productInfoValue">{format(oldData.createdAt)}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>PRODUCT NAME</label>
                        <input type="text"
                            placeholder={oldData.title}
                            name="title"
                            value={Update.title}
                            onChange={handleChange}
                        />
                        <label>PRODUCT COLOR</label>
                        <input type="text"
                            placeholder={oldData.color}
                            name="color"
                            value={Update.color}
                            onChange={handleChange}
                        />
                        <label>PRODUCT PRICE</label>
                        <input type="text"
                            placeholder={oldData.price}
                            name="price"
                            value={Update.price}
                            onChange={handleChange}
                        />
                        <label>PRODUCT SIZE</label>
                        <input type="text"
                            placeholder={oldData.size}
                            name="size"
                            value={Update.size}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            {/* <img src={"upload Img"} alt="" className="productUploadImg" /> */}
                            {/* <label for="file">
                                <Publish />
                            </label> */}
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productAddButton" onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}