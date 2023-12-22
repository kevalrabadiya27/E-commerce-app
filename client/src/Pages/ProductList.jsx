import { useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Products from "../components/Products"
import { mobile } from '../Responsive'

const Container = styled.div`
`
const Title = styled.h1`
margin:20px;
`
const FilterConatiner = styled.div`
 display:flex;
 justify-content:space-between;
`
const Filter = styled.div`
 margin:20px;
 ${mobile({ width: '0px 20px', display: 'flex', flexDirection: 'column' })}
`
const FilterText = styled.span`
  font-size:20px;
  font-weight:600;
  margin-right:20px;
  ${mobile({ marginRight: '0px' })}
`
const Select = styled.select`
    font-size:15px;
    padding:10px;
    margin-right:10px;
    ${mobile({ margin: '10px 0px' })}
`
const Option = styled.option`
   margin-top:5px;
   font-size:17px; 
`
const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2]
    const [filters, setfilters] = useState({})
    const [Sort, setSort] = useState("newest")
    window.scrollTo(0, 0);

    const handleFilters = (e) => {
        const value = e.target.value;
        setfilters({
            ...filters,
            [e.target.name]: value
        });
    };
    return (
        <Container>
            <Announcement />
            <Navbar />
            <Title>
                {cat}
            </Title>
            <FilterConatiner>
                <Filter>
                    <FilterText>
                        Filter Products:
                    </FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled>
                            Color
                        </Option>
                        <Option>white</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>blue</Option>
                        <Option>green</Option>
                        <Option>purple</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled >
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>
                        Search Product:
                    </FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">
                            Newest
                        </Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterConatiner>
            {/* propes passing to products in componets */}
            <Products cat={cat} filters={filters} sort={Sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList;