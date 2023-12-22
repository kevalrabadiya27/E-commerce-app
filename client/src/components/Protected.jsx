import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Protected = (props) => {

    const { Components } = props;
    const navigate = useNavigate();

    const admin = localStorage.getItem("isAdmin");
    useEffect(() => {
        if ((admin == "false") || (!admin)) {
            toast.error("login required")
            navigate("/login")
            return;
        }
    }, [admin])
    return (
        <>
            <Components />
        </>
    )
}

export default Protected;