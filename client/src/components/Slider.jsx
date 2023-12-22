import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material"
import { useState } from "react"
import styled from "styled-components"
import { sliderItems } from "../Data"
import { mobile } from '../Responsive'
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Container = styled.div`
  width:100%;
  height:100vh;
  display:flex;
  ${'' /* background-color:skyblue ; */}
  position:reletive;
  margin-top:10px;
  overflow:hidden;
  ${mobile({ width: '100vw' })}
`
const Arrow = styled.div`
width:50px;
height:50px;
background-color:#fff7f7;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
position:absolute;
top:0;
margin:auto;
left:${props => props.direction === "left" && "10px"};
right:${props => props.direction === "right" && "10px"};
bottom:0;
cursor:pointer;
opacity:0.5;
z-index:2;
${mobile({ width: '30px', height: '30px' })}

&:hover{
    background-color:lightblue;
}
`
const Wrapper = styled.div`
height:100%;
display:flex;
transition:all 1.5s ease;
transform:translatex(${(props) => props.slideIndex * -100}vw)
`
const Slide = styled.div`
display:flex;
align-items:center;
width:100vw;
height:100vh;
background-color:#${props => props.bg}
`
const ImgContainer = styled.div`
height:100%;
flex:1;
`
const Image = styled.img`
 height:80%;
 border-radius:20px;
 margin:15px;
`
const Title = styled.h1`
font-size:60px;
`
const Des = styled.p`
margin-top:30px;
font-size:20px;
letter-spacing:3px;
`
const Button = styled.button`
margin:50px 0px;
font-size:20px;
padding:10px;
background-color:transparent;
cursor:pointer;
`

const InfoContainer = styled.div`
flex:1;
padding:50px;
`

const Slider = () => {

    const [slideIndex, setslideIndex] = useState(0);

    const handleClick = (direction) => {
        if (direction === "left") {
            setslideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else {
            setslideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }
    return (
        <div>
            <Container>
                <Arrow direction="left" onClick={() => handleClick("left")}>
                    <ArrowLeftOutlined />
                </Arrow>
                <Wrapper slideIndex={slideIndex}>
                    {sliderItems.map((item) => (
                        <Slide bg={item.bg} key={item.id}>
                            <ImgContainer>
                                <Image src={item.img} loading="lazy" alt="shooping" />
                            </ImgContainer>
                            <InfoContainer>
                                <Title>{item.title}</Title>
                                <Des>{item.desc}</Des>
                                <Link to={`/products/women`} >
                                    <Button>SHOW NOW</Button>
                                </Link>
                            </InfoContainer>
                        </Slide>
                    ))}

                </Wrapper>
                <Arrow direction="right" onClick={() => handleClick("right")}>
                    <ArrowRightOutlined />
                </Arrow>
            </Container>
        </div >
    )
}

export default Slider