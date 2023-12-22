import { Remove, Add } from "@mui/icons-material"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import { mobile } from '../Responsive'
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { publicRequest } from "../RequestMethod"
import { addProduct, deleteProduct } from '../Redux/cartRedux'
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
`
const Wrapper = styled.div`
 padding:50px;
 display:flex;
 ${mobile({ padding: '10px', flexDirection: 'column', marginTop: '10px' })}
`
const ImgContainer = styled.div`
 flex:1;
`
const Image = styled.img`
 width:80%;
 height:90vh;
 object-fit:cover;
 ${mobile({ height: '40vh' })}
`
const InfoConatiner = styled.div`
 flex:1;
 padding:0px 50px;
 ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
  font-weight:200;
`
const Desc = styled.p`
 margin:20px 0px;
 font-size:17px;
`
const Price = styled.span`
   font-weight:100;
   font-size:40px;
`
const FilterContainer = styled.div`
   width:50%;
  display:flex;
  margin:30px 0px;
  justify-content:space-between;
  ${mobile({ width: '100%' })}
 `
const Filter = styled.div`
  display:flex;
  align-items:center;
`
const FilterTitle = styled.span`
  font-size:20px;
  font-weight:200;
`
const FilterColor = styled.div`
  width:20px;
  height:20px;
  border-radius:50%;
  background-color:${props => props.color};
  margin:0px 5px;
  cursor:pointer;
`
const FilterSize = styled.select`
  margin-left:10px;
  padding:8px;
`
const FilterSizeOption = styled.option`
 font-size:17px;
`
const AddContainer = styled.div`
 display:flex;
 align-items:center;
 width:50%;
 justify-content:space-between;
 ${mobile({ width: '100%' })}
`
const AmountContainer = styled.div`
  display:flex;
  align-items:center;
  font-weight:700;
`
const Amount = styled.span`
   width:30px;
   height:30px;
   border-radius:10px;
   border:2px solid teal;
   display:flex;
   align-items:center;
   justify-content:center;
   margin:0px 5px;
 `
const Button = styled.button`
  padding:13px;
  margin-left:15px;
  border:2px solid teal;
  background-color:white;
  cursor:pointer;
  border-radius:2px;
  font-weight:500;

  &:hover{
       background-color:#f8f4f4;
  }
`

const Product = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setproduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setcolor] = useState("");
  const [size, setsize] = useState("");
  const dispatch = useDispatch()

  // handle filtering
  const handleQuantity = (type) => {
    if (type == "dec") {
      quantity > 1 && setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1)
    }
  }

  // featch api after update id
  useEffect(() => {
    window.scrollTo(0, 0); //always renderpage up to top
    const getproduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id)
        setproduct(res.data)
      } catch (e) {
        console.log(e);
      }
    };
    getproduct()
  }, [id])

  const handleclick = () => {
    dispatch(
      addProduct({ ...product, quantity, color, size })
    )
  }

  return (
    <Container>
      <Announcement />
      <Navbar />
      {
        (!product._id) ? navigate("/") :
          <Wrapper>
            <ImgContainer>
              <Image src={product?.img} alt="productImage" />
            </ImgContainer>
            <InfoConatiner>
              <Title>{product?.title}</Title>
              <Desc>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Desc>
              <Price> $ {product?.price}</Price>
              <FilterContainer>
                <Filter>
                  <FilterTitle>Color</FilterTitle>
                  {product?.color?.map((c) => (
                    <FilterColor color={c} key={c} onClick={() => {
                      setcolor(c)
                      toast.success(`${c} color selected`)
                    } 
                    }/>
                  ))}
                </Filter>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize onChange={(e) => setsize(e.target.value)}>
                    {product?.size?.map((s) => (
                      <FilterSizeOption key={s}>{s}</FilterSizeOption>
                    ))}

                  </FilterSize>
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <Remove onClick={() => handleQuantity("dec")} style={{ cursor: "pointer" }} />
                  <Amount>{quantity}</Amount>
                  <Add style={{ cursor: "pointer" }} onClick={() => handleQuantity("inc")} />
                </AmountContainer>
                <Button onClick={handleclick}> ADD TO CART</Button>
                <Button onClick={() => navigate('/')}> BACK</Button>
              </AddContainer>
            </InfoConatiner>
          </Wrapper>
      }
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Product