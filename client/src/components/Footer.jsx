import { Email, Facebook, Instagram, Phone, Pinterest, Room, Twitter } from "@mui/icons-material"
import styled from "styled-components"
import { mobile } from '../Responsive'
import { Link } from "react-router-dom"

const Container = styled.div`
  display:flex;
  ${mobile({ flexDirection: 'column', backgroundColor: '#eee' })}

`
const Left = styled.div`
flex:1;
display:flex;
flex-direction:column;
padding:20px;
`
const Logo = styled.h1` 
`
const Desc = styled.p`
 margin:20px 0px;
 font-size:17px;
 letter-spacing:2px;
`
const SocialContainer = styled.div`
 display:flex;
`
const SocialIcon = styled.h1`
  width:40px;
  height:40px;
  border-radius:50%;
  color:white;
  background-color:#${props => props.color};
  display:flex;
  align-items:center; 
  justify-content:center;
  margin-right:20px;

  &:hover{
    background-color:black;
    transform:scale(1.1);
    cursor:pointer;
}

`
const Center = styled.div`
flex:1;
padding:20px;
${'' /* ${mobile({ display: 'none' })} */}
`
const Title = styled.h3`
margin-bottom:30px;
font-size:20px;
`
const List = styled.ul`
 margin:0;
 padding:0;
 list-style:none;
 display:flex;
 flex-wrap:wrap;
`
const ListItem = styled.li`
  width:50%;
  margin-bottom:10px;
  font-size:18px;
`
const Right = styled.div`
flex:1;
padding:20px;
`

const ContactItem = styled.div`
  margin-bottom:25px;
  display:flex;
  align-items:center;
`
const PaymentImage = styled.div``
const Image = styled.img`
 width:200px;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>xCart</Logo>
                <Desc>There are many variations of passges of lorem insum avilable , but the majority have suffered alteration in some form , by injected humour , orrandomised words which don't even slightly believable.</Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="E60023">
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>

                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Women Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    {/* <ListItem>Order Tracking</ListItem> */}
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ margin: "5px" }} /> 622 Dixie path , South Tobinchester 98336
                </ContactItem>
                <ContactItem>
                    <Phone style={{ margin: "5px" }} /> +1 235 74 98463
                </ContactItem>
                <ContactItem>
                    <Email style={{ margin: "5px" }} />kevaltest27@gmail.com
                </ContactItem>
                <PaymentImage>
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZa9stluxuArfKQHtToXyOJoDSyNgmHsLOrA&usqp=CAU" />
                </PaymentImage>
            </Right>
        </Container >
    )
}

export default Footer