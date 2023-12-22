import React from "react"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Slider from "../components/Slider"
import Categories from "../components/Categories"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import styled from "styled-components"

const Title = styled.h1`
color:"black";
text-align:center;
margin:8px;
`

const Home = () => {
    return (
        <>
            <div>
                <Announcement />
                <Navbar />
                <Slider />
                <Categories />
                <div>
                    <Title>PRODUCTS</Title>
                    <Products />
                </div>
                <Newsletter />
                <Footer />
            </div>
        </>
    )
}

export default Home