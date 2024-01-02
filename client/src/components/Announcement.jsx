
import styled from "styled-components"


const Container = styled.div`
 height:35px;
 background-color:teal;
 color:white;
 width:100%;
 padding:3px;
 display:flex;
 align-item:center;
 justify-content:center;
 font-size:16px;
 font-weight:500;
 animation-name: breath-animation;
 animation-duration: 8s;
 animation-iteration-count: infinite;

 @keyframes breath-animation {
    0%{background-color:teal;opacity: 0.6}
    20% { background-color:rgb(37, 150, 190); opacity: 0.6}
    40% { background-color:rgb(135,62,35); opacity: 0.6; }
    60% { background-color:#4c7915; opacity: 0.6; }
    80% { background-color:#154c79; opacity: 0.6; }
    100%{background-color:teal;opacity: 0.6}

 @media(max-width: 380px) {
        width:100vw;
        font-size:15px;
    }
 }
`;

const Announcement = () => {
    return (
        <>
            <Container>
                Super Deal Free Shoping on Order Over $30
                <img src="https://cdn-icons-png.flaticon.com/128/331/331953.png" width={'30px'} height={'15px'}/>
            </Container>
        </>
    )
} 


export default Announcement;