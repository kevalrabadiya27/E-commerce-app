import { DashboardCustomizeOutlined, LocalOfferOutlined, LoginOutlined, Search, ShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'
import Badge from '@mui/material/Badge';
import styled from 'styled-components'
import { mobile } from '../Responsive'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { deleteProductCart } from '../Redux/cartRedux';
import Offer from './Offer';

const Container = styled.div`
   height:60px;
   ${mobile({ height: '50px' })}
`
const Wrapper = styled.div`
 padding:10px 20px;
 display:flex;
 align-item:center;
 justify-content:space-between;
 ${mobile({ padding: '10px 0px' })}
`
const Left = styled.div`
flex:1;
display:flex;
align-item:center;
${mobile({ marginLeft: '7px', })}
`

const Center = styled.div`
flex:1;
text-align:center;
`
const Logo = styled.h1`
font-weight:bold;
${mobile({ fontSize: '24px', margin: '7px 30px' })}
`
const Right = styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:flex-end;
${mobile({ flex: 2, justifyContent: 'center', marginLeft: '18px' })}
`
const MenuItem = styled.div`
font-size:17px;
cursor:pointer;
margin-left:25px;
${mobile({ fontSize: '15px', marginLeft: '20px'})}
`;

const Input = styled.input`
width: 150px;
font-size: 17px;
border: none;
outline: none;
margin-left:11px;
font-weight:bolder;
${mobile({ width: '50px ',marginLeft:'7px' ,display:'none'})}
`
const Image  = styled.img`
 width:8%;
 height:100%;
 ${mobile({ width: '50%', height:'100%' })};
`

const Navbar = () => {

    const qunatity = useSelector(state => state.cart.quantity)
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(deleteProductCart()); // delete cart item
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        toast.success("Logout sucessfully! ")
        Navigate("/");
    }
    return (
        <Container>
            <Wrapper>
                <Left>
                        <Image src='https://cdn-icons-png.flaticon.com/128/321/321238.png'/>
                        <Input placeholder='IND'/>
                </Left>
                <Center><Logo>xCart</Logo></Center>
                <Right>
                    {(
                        !localStorage.getItem("username") ?
                            <>
                            <Link to='/Offer' style={{ textDecoration: 'none' }}>
                                    <MenuItem>
                                        <Badge badgeContent={1} color="success">
                                            <LocalOfferOutlined />
                                        </Badge>
                                    </MenuItem>
                            </Link>
                            <Link to='/Cart' style={{ textDecoration: 'none' }}>
                                    <MenuItem>
                                        <Badge badgeContent={qunatity} color="secondary">
                                            <ShoppingCartOutlined />
                                        </Badge>
                                    </MenuItem>
                             </Link>
                            <Link to='/login' style={{ textDecoration: 'none' }}>
                                    <MenuItem>LOGIN</MenuItem>
                            </Link>
                                </>
                            :
                            <>
                            <Link to='/Cart' style={{ textDecoration: 'none' }}>
                                    <MenuItem>
                                        <Badge badgeContent={1} color="secondary">
                                            <LocalOfferOutlined />
                                        </Badge>
                                    </MenuItem>
                                </Link>
                                <Link to='/Cart' style={{ textDecoration: 'none' }}>
                                    <MenuItem>
                                        <Badge badgeContent={qunatity} color="secondary">
                                            <ShoppingCartOutlined />
                                        </Badge> 
                                    </MenuItem>
                                </Link>
                                <MenuItem>
                                    <Badge color="secondary" onClick={handleLogout}>
                                        <LoginOutlined />LOGOUT
                                    </Badge>
                                </MenuItem>
                            </>
                    )}

                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar