import React from "react";
import "./topbar.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'

export default function Topbar() {
    const navigate = useNavigate();
    const handlebtn = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        toast.success("logout sucessfully");
        navigate('/');
    }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Dashboard</span>
                </div>
                <div className="Center"><div className="logo">Xcart</div></div>
                <div>
                    <div className="right">
                        {(
                            !localStorage.getItem("isAdmin") ?
                                <>
                                    <Link to='/' style={{ textDecoration: 'none' }}>
                                        <div className="MenuItem">SIGN IN</div>
                                    </Link>

                                </>
                                :
                                <>
                                    <div className="MenuItem">
                                        <div onClick={handlebtn}>
                                            LOGOUT
                                        </div>
                                    </div>
                                    <div className="topbar">
                                        <div className="topbarWrapper">
                                            <div className="topRight">
                                                <img src="https://cdn.shopify.com/s/files/1/0984/4522/products/GitHup-Site-Admin-Developer-T-Shirt-For-Men-1_large.jpg?v=1588305158" alt="" className="topAvatar" />
                                            </div>
                                        </div>
                                    </div>

                                </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}