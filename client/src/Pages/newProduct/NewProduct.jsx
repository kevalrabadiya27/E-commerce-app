import { useState } from "react";
import "./newProduct.css";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { analytics } from '../../firebase'
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewProduct() {
    const [inputs, setInputs] = useState({
        title: "",
        price: "",
        categories: "",
        inStock: "yes",
        img: "",
        size: "M",
        color: ""
    });
    const [File, setFile] = useState(null);
    const [process, setprocess] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {

        if (e.target.type == "file") {
            setFile(e.target.files[0]);
            setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
        }
        else
            setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const handleClick = async (e) => {
        e.preventDefault();

        const { title, price, categories, inStock, img, size, color } = inputs;

        if (!title || !price || !categories || !inStock || !img || !size || !color) {
            return;
        }

        const storage = getStorage();
        const storageRef = ref(storage, 'images/rivers.jpg');
        const uploadTask = uploadBytesResumable(storageRef, File);
        uploadTask.on('state_changed',
            (snapshot) => {
                setSubmitting(true);
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setprocess(progress);
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (e) => {
                console.log(e);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                    // after downloading url add entry to database
                    const uploadData = { title: inputs.title, desc: inputs.desc, price: inputs.price, categories: inputs.categories, inStock: inputs.true, img: downloadURL }

                    const response = await fetch("https://e-commerce-api-kevalrabadiya.vercel.app/api/products/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(uploadData)
                    });
                    setSubmitting(false);
                    const ans = await response.json()
                    if (!ans.sucess) {
                        toast.error("incorrect data please check")
                    } else {
                        toast.success("product created!")
                        navigate("/products");
                    }
                });
            }
        );
    };

    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="newProduct">
                    <h1 className="addProductTitle">New Product</h1>
                    <form className="addProductForm">
                        <div className="addProductItem">
                            <label>Image</label>
                            <input
                                name="img"
                                type="file"
                                id="file"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Title</label>
                            <input
                                name="title"
                                type="text"
                                value={inputs.title}
                                placeholder="Apple Airpods"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Color</label>
                            <input
                                name="color"
                                type="text"
                                value={inputs.color}
                                placeholder="color"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Size</label>
                            <select name="size" value={inputs.size} placeholder="Select Size" onChange={handleChange}>
                                <option value="M">M</option>
                                <option value="XL">XL</option>
                                <option value="S">S</option>
                                <option value="L">L</option>
                            </select>
                        </div>
                        <div className="addProductItem">
                            <label>Price</label>
                            <input
                                name="price"
                                type="number"
                                value={inputs.price}
                                placeholder="100"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Categories</label>
                            <input type="text" value={inputs.categories} placeholder="jeans,skirts" name="categories" onChange={handleChange} />
                        </div>
                        <div className="addProductItem">
                            <label>Stock</label>
                            <select name="inStock" value={inputs.inStock} onChange={handleChange}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <button
                            disabled={submitting}
                            onClick={handleClick}
                            className="addProductButton">
                            {submitting ? "Adding Product.." + Math.floor(process) + "% done" : "Create"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}