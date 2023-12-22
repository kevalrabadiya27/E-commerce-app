import styled from "styled-components"
import Announcement from "../components/Announcement"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Add, ArrowBackSharp, BackpackOutlined, Remove } from "@mui/icons-material"
import { mobile } from '../Responsive'
import { useSelector } from "react-redux"
import StripeCheckout from 'react-stripe-checkout'
import { useEffect, useState } from "react"
import { userRequest } from "../RequestMethod";
// const KEY = process.env.REACT_APP_STRIPE;
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import Loader from "../components/Loader"

const Conatainer = styled.div`
`
const Wrapper = styled.div` 
  padding:20px;
  ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
  font-weight:300;
  text-align:center;
  ${mobile({ fontSize: '28px', marginTop: '10px' })}
`
const Top = styled.h1`
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:20px;
`
const TopButtom = styled.button`
 padding:10px;
 font-weight:600;
 cursor:pointer;
 border:${props => props.type === "filled" && "none"};
 background-color:${props => props.type === "filled" ? "black" : "transparent"};
 color:${props => props.type === "filled" && "white"};
 ${mobile({ margin: '8px', padding: '4px' })}
`
const TopTexts = styled.div`
${mobile({ display: 'none' })}
`
const TopText = styled.span`
 text-decoration:underline;
 font-size:19px;
 font-weight:400;
 cursor:pointer;
 margin:0px 10px;
`
const Bottom = styled.h1`
  display:flex;
  justify-content:space-between;
 font-weight:400;
 font-size:20px;
 ${mobile({ flexDirection: 'column' })}
`
const Product = styled.div`
  display:flex;
  justify-content:space-between;
  ${mobile({ flexDirection: 'column' })}
`
const ProductDetails = styled.div`
  flex:2;
  display:flex;
`
const Image = styled.img`
 width:230px;
 margin-top:10px;
 border-radius:10px;
 object-fit:cover;
 ${mobile({ width: '40vw' })}
`
const Details = styled.div`
  padding:20px;
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
  ${mobile({ fontSize: '15px' })}
`
const ProductName = styled.span`
`
const ProductId = styled.span`
  ${mobile({ display: 'none' })}
`
const ProductColor = styled.div`
  width:20px;
  height:20px;
  border-radius:50%;
  background-color:${props => props.color}
`
const ProductSize = styled.span` 
`
const PriceDetails = styled.div`
 flex:1;
 display:flex;
 align-items:center;
 justify-content:center;
 flex-direction:column;
`
const ProductAmountContainer = styled.div`
 display:flex;
 align-items:center;
 margin-bottom:18px;
`
const ProductAmount = styled.div`
  font-size:25px;
  margin:7px;
  ${mobile({ margin: '3px 10px' })}
`
const ProductPrice = styled.div`
  font-size:35px;
  font-weight:200;
  ${mobile({ margin: '2px ' })}
`
const Hr = styled.hr`
  background-color:#eee;
  border:none;
  height:3px;
  margin:10px;
`
const Info = styled.div`
  flex:3;
`
const Summary = styled.div`
 flex:1;
 border:0.5px solid lightgray;
 border-radius:10px;
 padding:20px;
 height:50vh;
`
const SummaryTitle = styled.h1`
  font-size:30px;
  font-weight:100;
`
const SummaryItem = styled.div`
  margin:30px 0px;
  display:flex;
  justify-content:space-between;
  font-weight:${props => props.type === "total" && "600"};
  font-size:${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`
`
const SummaryItemPrice = styled.span`
`
const Button = styled.button`
 width:100%;
 padding:10px;
 font-size:17px;
 cursor:pointer;
 background-color:black;
 color:white;
 font-weight:500;
`
const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const [StripeToken, setStripeToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  const onToken = (token) => {
    setStripeToken(token);
  };
  // payment checkout
  useEffect(() => {
    const makerequset = async () => {
      setIsLoading(true)
      try {
        const res = await userRequest.post("/checkout/payment",
          {
            tokenId: StripeToken.id,
            amount: cart.total * 100,
          });
        navigate("/Sucess", { data: res.data })
      } catch (err) { }
      finally {
        setIsLoading(false);
      }
    }
    StripeToken && cart.total >= 1 && makerequset();
  }, [StripeToken, cart.total, navigate])

  const checkAuth = () => {
    if (!localStorage.getItem("username")) {
      toast.error("login required..")
      navigate("/login")
    } else {
      toast.success("Checkout prepare..")
    }
  }
  return (
    <Conatainer>
      <Announcement />
      <Navbar />
      {
        isLoading ? <Loader /> :
          <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
              <Link to='../'>
                <TopButtom type="filled">CONTINUE SHOPPING</TopButtom>
              </Link>
            </Top>
            <Bottom>
              <Info>
                {cart.products?.map((product) => (
                  <Product>
                    <Hr />
                    <ProductDetails>
                      <Image src={product.img} alt="cartimage" />
                      <Details>
                        <ProductName><b>Product:</b>{product?.title}</ProductName>
                        <ProductId><b>ID:</b>{product?._id}</ProductId>
                        <ProductColor color={product?.color} />
                        <ProductSize><b>Size:</b>{product?.size}</ProductSize>
                        <Hr />
                      </Details>
                    </ProductDetails>
                    <PriceDetails>
                      <ProductAmountContainer>
                        <ProductAmount> Quantity: {product.quantity}</ProductAmount>
                      </ProductAmountContainer>
                      <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                    </PriceDetails>
                  </Product>
                ))
                }
                <Hr />
              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                </SummaryItem>

                {
                  (localStorage.getItem("username")) ?
                    <StripeCheckout
                      name="Xcart"
                      image="https://avatars.githubusercontent.com/u/1486366?v=4"
                      billingAddress
                      shippingAddress
                      description={`Your total is $${cart.total}`}
                      amount={cart.total * 100}
                      token={onToken}
                      stripeKey='pk_test_51M6DOuSILQCFtabDf7Y7sPHR1uXyeyBccih2k4EKl3SOCSlBcxQvjHqoqHBXsBaYYJqHKlTY7Ow8BI6HzI3GBHLE00iKxuW9cD'
                    >
                      <Button onClick={checkAuth}>CHECKOUT NOW</Button>
                    </StripeCheckout>
                    : <Button onClick={checkAuth}>CHECKOUT NOW</Button>
                }
              </Summary>
            </Bottom>
          </Wrapper>
      }
      <Footer />
    </Conatainer>
  )
}

export default Cart