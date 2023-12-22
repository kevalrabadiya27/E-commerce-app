import { LoginOutlined, Search, ShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'
import Badge from '@mui/material/Badge';
import styled from 'styled-components'
import { mobile } from '../Responsive'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { deleteProductCart } from '../Redux/cartRedux';
import { Avatar } from '@mui/material';

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
`

const Center = styled.div`
flex:1;
text-align:center;
`
const Logo = styled.h1`
font-weight:bold;
${mobile({ fontSize: '22px', margin: '7px 18px' })}
`
const Right = styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:flex-end;
${mobile({ flex: 2, justifyContent: 'center', marginLeft: '-16px' })}
`
const MenuItem = styled.div`
font-size:14px;
cursor:pointer;
margin-left:25px;
${mobile({ fontSize: '11px', marginLeft: '5px' })}
`;

const Searchcontainer = styled.div`
border: 0.5px solid lightgray;
display: flex;
align - item: center;
margin - left: 25px;
padding: 5px;
${mobile({ marginLeft: '7px', })}
`
const Input = styled.input`
width: 150px;
font - size: 17px;
border: none;
outline: none;
${mobile({ width: '50px ' })}
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
                    <Searchcontainer>
                        <Input placeholder='Search' disabled />
                        <Search style={{ color: "gray", fontSize: '33px' }} />
                    </Searchcontainer>
                </Left>
                <Center><Logo>xCart</Logo></Center>
                <Right>
                    {(
                        !localStorage.getItem("username") ?
                            <><Link to='/register' style={{ textDecoration: 'none' }}>
                                <MenuItem>SIGN UP</MenuItem>
                            </Link>
                                <Link to='/login' style={{ textDecoration: 'none' }}>
                                    <MenuItem>SIGN IN</MenuItem>
                                </Link>
                                <Link to='/Cart' style={{ textDecoration: 'none' }}>
                                    <MenuItem>
                                        <Badge badgeContent={qunatity} color="secondary">
                                            <ShoppingCartOutlined />
                                        </Badge>
                                    </MenuItem>
                                </Link></>
                            :
                            <>
                                <Link to='/Cart' style={{ textDecoration: 'none' }}>
                                    <MenuItem>
                                        <Badge badgeContent={qunatity} color="secondary">
                                            <ShoppingCartOutlined />
                                        </Badge> CART
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