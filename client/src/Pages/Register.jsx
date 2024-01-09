import styled from "styled-components"
import { mobile } from '../Responsive'
import {Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Loader from "../components/Loader"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-photo/happy-long-haired-woman-smiling-after-shopping-portrait-pleased-white-girl-with-paper-bags_197531-8240.jpg?size=626&ext=jpg&ga=GA1.2.1265651161.1660969785")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
 padding:20px;
 width:40%;
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
  flex-wrap:wrap;

`
const Input = styled.input`
 flex:1;
 min-width:40%;
 padding:10px;
 font-size:17px;
 margin:20px 10px 0px 0px;
`
const Agreement = styled.span`
 font-size:16px;    
 margin:20px 0px
`
const Button1 = styled.button`
  width:50%;
  border:5px;
  padding:10px;
  background-color:teal;
  color:white;
  cursor:pointer;
  ${'' /* padding:5px; */}
`
const Button2 = styled.button`
  width:40%;
  border:5px;
  padding:10px;
  margin-left:10px;
  background-color:red;
  color:white;
  cursor:pointer;
  padding:7px;
`

const Register = () => {
  const navigate = useNavigate();
  const[isLoading,setIsLoading] = useState(false)
  const [credintial, setcredintial] = useState({
    name: "",
    username: "",
    gmail: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setIsLoading(true)
      if ((!credintial.gmail) || (!credintial.name) || (!credintial.password) || (!credintial.username)) {
        toast.error("All field are mandatory")
      }
    }catch(e){
      toast.error(e)
    }finally{
      setIsLoading(false)
    }
    const response = await fetch("https://e-commerce-api-99id.onrender.com/api/auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credintial.name, email: credintial.gmail, password: credintial.password, username: credintial.username })
    });
    const ans = await response.json()
    if (!ans.sucess) {
      toast.error("something wrong check your details")
    } else {
      localStorage.setItem("username", ans.newUser.username);
      toast.success("Registation Sucessfully!")
      navigate("/");
    }
  }

  const handleChange = (e) => {
    setcredintial({ 
      ...credintial,
      [e.target.name]: e.target.value 
    });
  }
  return (
    <>
      <Container>
    {isLoading?<Loader/>:
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form onSubmit={handleSubmit}>
            <Input placeholder="Name" name="name" onChange={handleChange} value={credintial.name} />
            <Input placeholder="Username" name="username" onChange={handleChange} value={credintial.username} />
            <Input placeholder="Gmail" name="gmail" onChange={handleChange} value={credintial.gmail} />
            <Input placeholder="Password" type="password" name="password" onChange={handleChange} value={credintial.password} />
            <Agreement> By creating an account,I consent to the processing of my personal data in accordance the <b>PRIVACY POLICY</b></Agreement>
            <Button1>SIGNUP</Button1>
            <Button2>
            <Link to='/Login'>
            <Button2>LOGIN</Button2>
          </Link>
          </Button2>
          </Form>
        </Wrapper>
    }
      </Container>
    </>
  )
}

export default Register