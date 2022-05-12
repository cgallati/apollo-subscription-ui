import { Layout, Text } from "@audi/audi-ui-react"
import Image from "next/image";
import styled from 'styled-components'

const HeaderContainer = styled.nav`
    padding: 1.5rem;
    border-bottom: solid 2px black;
`

export default function Header({username}) {
    return(
        <HeaderContainer>
            <Layout align='end' justify='between'>
                <Image src="/audi.svg" alt="Audi Logo" width='69' height='24' />
                <Text variant="order3">{username}</Text>
            </Layout>
        </HeaderContainer>

    )
}