import { Button, Layout, Text } from "@audi/audi-ui-react"
import styled from 'styled-components'

const BigButton = styled(Button)`
    width: 300px;
`

const StoriesContainer = styled(Layout)`
   height: 50vh;
`



export default function StartVote({roomName, storyName, moveToVote, startVote}) {
    return(
        <StoriesContainer justify='center' align='center' direction='column'>
            <Text variant="order1" weight="bold">{roomName} Room</Text>
            <Text variant="order2" weight="bold" spaceStackEnd="xl">{storyName}</Text>
            <BigButton variant='primary' onClick={() => {
                startVote()
                moveToVote()
            }}>Start Vote</BigButton>
        </StoriesContainer>
    )
}