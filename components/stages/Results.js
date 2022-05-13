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
    background: #b3b3b3;
    width: 150px;
    height: 100px;
    background-image: linear-gradient(#e5e5e5, #e5e5e5);
    background-size: 100% ${p=>p.percent}%;
    background-repeat: no-repeat;
`

const GreyedOutBallot = styled(Ballot)`
    opacity: 50%;
`


export default function Results({ storyName, votes, moveToStartVote}) {
    const totalVotes = 5;

    return(
        <StoriesContainer justify='center' align='center' direction='column'>
            <Text variant="order2" weight="bold" spaceStackEnd="xl">{storyName}</Text>
            <CardsLayout>
                {votes.map((vote, index) =>
                    vote.votes === 0 ? 
                    <GreyedOutBallot  key={index} justify='center' align='center' percent={0}>
                        <Text variant="display2">{vote.value}</Text>
                    </GreyedOutBallot>:
                    <Ballot key={index} justify='center' align='center' percent={100-(vote.votes/totalVotes)*100 || 0}>
                        <Text variant="display2">{vote.value}</Text>
                    </Ballot>
                )}
            </CardsLayout>
            <Button variant='primary' onclick={moveToStartVote} spaceStackStart='l' stretch>start another vote +</Button>
        </StoriesContainer>
    )
}