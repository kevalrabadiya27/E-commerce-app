import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { mobile } from '../Responsive'
// import { login } from "../Redux/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-photo/beautiful-shopping-woman-smiling-wearing-hat-isolated-green-background_231208-4930.jpg?size=626&ext=jpg&ga=GA1.2.1265651161.1660969785")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
 padding:20px;
 width:25%;
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
const Form = styled.form`
  display:flex;
  flex-direction:column;
`
const Input = styled.input`
 flex:1;
 min-width:40%;
 padding:10px;
 font-size:17px;
 margin:10px 0px;
`
const Button = styled.button`
  width:50%;
  margin:8px 0px;
  border:none;
  padding:15px 20px;
  background-color:teal;
  color:white;
  cursor:pointer;
  border-radius:5px;
  &:disabled {
    color: white;
    cursor: not-allowed;
  }
`
const Links = styled.a`
  margin:10px 0px;
  font-size:14px;
  text-decoration:underline;
  cursor:pointer;
`
const Login = () => {

  let navigate = useNavigate();
  const [credintial, setcredintial] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

      const response = await fetch("https://e-commerce-api-99id.onrender.com/api/auth/login", {    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // set username & password
      body: JSON.stringify({ username: credintial.username, password: credintial.password })
    });   
    const res = await response.json();
    if (!res.sucess) {
      toast.error("Wrong crendentiast");
    } 
    try {
      
    } catch (error) {
      if (res.sucess) {
        // remove all item after click logout
        localStorage.setItem("username", credintial.username);
        localStorage.setItem("token", res.accesstoken);
        localStorage.setItem("isAdmin", res.isAdmin);
        toast.success("login Sucessfully");
        if (res.isAdmin) {
          navigate('/dashboard')
        } else {
          navigate('/');
        }
      }
      else{
        toast.error("Invalid user..")
      }
    }
      
    }
  const handlechange = (e) => {
    setcredintial({ ...credintial, [e.target.name]: e.target.value });
  }
  // using redux
  // const handleclick = (e) => {
  //   e.preventDefault();
  //   login(dispatch, { username, password })
  // }
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="username" name="username"
            type='Username' value={credintial.username}
            onChange={handlechange} />
          <Input placeholder="password" name="password"
            type='password' value={credintial.password}
            onChange={handlechange} />
          <Button disabled={(!credintial.username) || (!credintial.password)}>LOGIN</Button>
          <Link to='/register'>
            <Links>CREATE A NEW ACCOUNT</Links>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login