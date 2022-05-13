import { Button, Layout, Text } from "@audi/audi-ui-react"
import styled from 'styled-components'

const StoriesContainer = styled(Layout)`
   height: 50vh;
`

const CardsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1.5rem;
`;

const Ballot = styled(Layout)`
    background: #ffaa00;
    width: 150px;
    height: 100px;
    border: 2px solid black;
    background-image: linear-gradient(white, white);
    background-size: 100% ${p=>p.percent}%;
    background-repeat: no-repeat;

    p{
        -webkit-text-stroke: 1px white;
    }
`


export default function Results({roomName, storyName, votes, moveToVote}) {
    const totalVotes = 5;

    return(
        <StoriesContainer justify='center' align='center' direction='column'>
            <Text variant="order1" weight="bold">{roomName} Room</Text>
            <Text variant="order2" weight="bold" spaceStackEnd="xl">{storyName}</Text>
            <CardsLayout>
                {votes.map((vote, index) =>
                    <Ballot key={index} justify='center' align='center' percent={100-(vote.votes/totalVotes)*100 || 0}>
                        <Text variant="display1">{vote.value}</Text>
                    </Ballot>
                )}
            </CardsLayout>
            <Button variant='primary' onclick={moveToVote} spaceStackStart='l'>Vote Again</Button>
        </StoriesContainer>
    )
}