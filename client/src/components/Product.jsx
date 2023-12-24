import { useState } from "react";
import { Favorite, FavoriteBorderOutlined, Flag, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import styled from "styled-components"
import { Link } from 'react-router-dom'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { toast } from "react-toastify";


const Info = styled.div`
opacity:0;
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
z-index:3;
display:flex;
align-items:center;
justify-content:center;
transition:all 0.3s ease;
`
const Conatiner = styled.div`
  flex:1;
  padding:20px;
  margin:5px;
  min-width:280px;
  height:350px;
  display:flex;
  align-item:center;
  justify-content:center;
  background-color:#f5fbff;
  position:relative;

&:hover ${Info}{
   opacity:1;
}
`
// const Circle = styled.div`
//     width:200px;
//     height:200px;
//     border-radius:50%;
//     background-color:white;
//     position:absolute;
// `
const Image = styled.img`
width:100%;
height:100%;
object-fit:cover;
border-radius:15px;
z-index:2;
`
const Icon = styled.div`
 width:40px;
 height:40px;
 border-radius:50%;
 background-color:white;
 display:flex;
align-items:center;
justify-content:center;
margin:10px;
transition:all 0.5s ease;
cursor:pointer;
&:hover{
    background-color:#e9f5f5;
    transform:scale(1.3);
}
`

const Product = ({ item }) => {
const[flag,setflag] = useState(true)

const LikedProduct = ()=>{
    flag?setflag(false):setflag(true)
    if(flag){
        toast.success("liked Product")
    }else{
        toast.success("disliked Product")
    }
}
    return (
        <Conatiner>
            {/* <Image src={item.img} loading="lazy" alt="products" /> */}
            {
                <LazyLoadImage
                    src={item.img}
                    alt={'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'}
                    className="img-lazy"
                    width={'100%'} height={'100%'}
                    effect='blur' // opacity | black-and-white
                />
            }
            <Info>
                <Icon>
                    <Link to='/Cart'>
                        <ShoppingCartOutlined />
                    </Link>
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlined />
                    </Link>
                </Icon>
                <Icon>
                {
                    flag?<FavoriteBorderOutlined onClick={LikedProduct}/>:<Favorite onClick={LikedProduct}/>
                 } 
                </Icon>
            </Info>
        </Conatiner >
    )
}

export default Product