import { Button, Layout, Text } from "@audi/audi-ui-react"
import styled from 'styled-components'

const StoriesContainer = styled(Layout)`
   height: 50vh;
`

const CardsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2rem;
`;

const ballots = [
    '1/2',
    '1',
    '2',
    '3',
    '5',
    '8',
    '13',
    '???',
]

const vote = (ballot, moveToWait) => {
    moveToWait();
}

export default function Vote({roomName, storyName, moveToWait}) {
    return(
        <StoriesContainer justify='center' align='center' direction='column'>
            <Text variant="order1" weight="bold">{roomName} Room</Text>
            <Text variant="order2" weight="bold" spaceStackEnd="xl">{storyName}</Text>
            <CardsLayout>
                {ballots.map((ballot, index) =>
                    <Button variant="primary" key={index} onClick={()=>vote(ballot, moveToWait)}>
                        {ballot}
                    </Button>
                )}
            </CardsLayout>
        </StoriesContainer>
    )
}