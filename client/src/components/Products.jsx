import { useEffect, useState } from "react"
import styled from "styled-components"
import Product from "./Product"
import axios from "axios"
import { userRequest, BASE_URL } from "../RequestMethod"
import Loader from "./Loader"

const Container = styled.div`
 padding:20px;
 display:flex;  
 flex-wrap: wrap;
 margin-top:10px;
 justify-content:space-between;
`
const background=styled.body`
filter :blur(8px);
`

// propes are coming to productlist pages
const Products = ({ cat, filters, sort }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(
                    cat
                        ? `${BASE_URL}products?category=${cat}`
                        : `${BASE_URL}products`
                );
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        getProducts();
    }, [cat]);

    useEffect(() => {
        cat &&
            setFilterProduct(
                products.filter((item) =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value)
                    )
                )
            );
    }, [products, cat, filters]);

    useEffect(() => {
        if ((sort === "newest")) {
            setFilterProduct(prev =>
                [...prev].sort((a, b) => a.createAt - b.createAt)
            );
        } else if ((sort === "asc")) {
            setFilterProduct(prev =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilterProduct(prev =>
                [...prev].sort((a, b) => b.price - a.price)
            ); 
        }
    }, [sort])

    return (
        <Container>
            {
                isLoading ? <Loader/>    : (
                    cat
                        ? filterProduct.map((item) => (
                            <Product item={item} key={item.id} />))
                        : products
                            .slice(0, 8)   //hom many item display
                            .map((item) => (
                                <Product item={item} key={item.id} />)))
                // propes passing Product page
            }

        </Container>
    )
}

export default Products;