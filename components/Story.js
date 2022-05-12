import { Button, Layout, Text } from "@audi/audi-ui-react"
import styled from 'styled-components'
import { useState } from "react"

const BigButton = styled(Button)`
    width: 300px;
`

const StoriesContainer = styled(Layout)`
   height: 50vh;
`

const CardsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 2rem;
`;


export default function Story({roomName, storyName}) {
    const [startVoting, setStartVoting] = useState(false);

    return(
        <StoriesContainer justify='center' align='center' direction='column'>
            <Text variant="order1" weight="bold">{roomName} Room</Text>
            <Text variant="order2" weight="bold" spaceStackEnd="xl">{storyName}</Text>
            {startVoting ? 
            <CardsLayout>
                <Button variant="primary">1/2</Button>
                <Button variant="primary">1</Button>
                <Button variant="primary">2</Button>
                <Button variant="primary">3</Button>
                <Button variant="primary">5</Button>
                <Button variant="primary">5</Button>
                <Button variant="primary">8</Button>
                <Button variant="primary">13</Button>
                <Button variant="primary">???</Button>
            </CardsLayout>
          :
            <BigButton variant='primary' onClick={()=>setStartVoting(true)}>Start Vote</BigButton>
          }
        </StoriesContainer>
    )
}