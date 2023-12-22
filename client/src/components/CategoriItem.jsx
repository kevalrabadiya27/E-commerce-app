import styled from "styled-components"
import { mobile } from '../Responsive'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Container = styled.div`
flex:1;
margin:5px;
height:70vh;
position: relative;
`
const Image = styled.img`
width:100%;
height:100%;
object-fit:cover;
border-radius:15px;
${mobile({ height: '30vh' })};
`
const Info = styled.div`
 position: absolute;
 width:100%;
 height:100%;
 top:0;
 left:0;
 display:flex;
 flex-direction:column;
 align-items:center;
 justify-content:center;
`
const Title = styled.h1`
color:white;
text-align:center;
margin:10px;
`
const Button = styled.button`
border:none;
padding:10px;
margin:0px 16%;
font-size:17px;
background-color:white;
color:gray;
cursor:pointer; 
font-weight:600;
`
const CategoriItem = ({ item }) => {
    return (
        <Container>
            <Link to={`/products/${item.cat}`}>
                {/* <Image src={item.img} alt="categoris" /> */}
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
                    <Title>{item.title}</Title>
                    <Button>SHOP NOW</Button>
                </Info>
            </Link>
        </Container>
    )
}

export default CategoriItem