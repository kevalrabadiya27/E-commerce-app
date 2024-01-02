import Announcement from './Announcement'
import styled from 'styled-components'
import { mobile } from '../Responsive'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url("https://images.unsplash.com/photo-1556742212-5b321f3c261b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
 padding:20px;
 width:35%;
 border-radius:10px;
 background-color:white;
 -webkit-box-shadow: 12px 12px 24px #9499a8, -12px -12px -24px #ffffff;
 box-shadow: 14px 14px 24px #7a7c83;
 ${mobile({ width: '75%' })}
`
const Title = styled.h1`
 font-size:24px;
 font-weight:300;
`
const OfferName = styled.div`
 height:42px;
 background-color:teal;
 color:white;
 width:100%;
 padding:3px;
 margin:5px;
 display:flex;
 align-item:center;
 justify-content:center;
 font-size:16px;
 font-weight:500;
 ${mobile({marginTop:'15px',height:'30px',fontSize:'12px'})}
`
function Offer() {
    return(
        <>
    <Container>
    <Wrapper>
    <center><h1>OFFERS</h1></center>
        <OfferName>1 . Super Deal Free Shoping on Order Over $30
        <img src="https://cdn-icons-png.flaticon.com/128/331/331953.png" width={'8%'} height={'100%'}/>
        </OfferName>
        <OfferName>2 . One discount code for an extra 10% off generates £50,000</OfferName>
        <OfferName>3 . Find out how this Shopify store got 17% of monthly sales in six hours thanks to a clever discount promo:</OfferName>
        <OfferName>4 . Here’s a first-order discount code offer in a welcome popup from Blume that converts 5% of visitors:</OfferName>
    </Wrapper>
    </Container>
        </>
    )
}

export default Offer;