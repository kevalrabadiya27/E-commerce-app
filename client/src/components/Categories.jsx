import { categories } from "../Data"
import CategoriItem from "./CategoriItem"
import styled from "styled-components"
import { mobile } from '../Responsive'

const Container = styled.div`
display:flex;
padding:20px;
justify-content:space-between;
${mobile({ padding: '0px', flexDirection: 'column', marginTop: '20px' })};
`

const Categories = () => {
    return (
        <>
            <Container>
                {categories.map(item => (
                    <CategoriItem item={item} key={item.id} />
                ))}
            </Container>
        </>
    )
}

export default Categories