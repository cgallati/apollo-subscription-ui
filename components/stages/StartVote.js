import { Button, Layout, Text } from "@audi/audi-ui-react"
import styled from 'styled-components'

const BigButton = styled(Button)`
    width: 300px;
`

const StoriesContainer = styled(Layout)`
   height: 50vh;
`

export default function StartVote({ storyName, moveToVote}) {
    return(
        <StoriesContainer justify='center' align='center' direction='column'>
            <Text variant="order2" weight="bold" spaceStackEnd="xl">{storyName}</Text>
            <BigButton variant='primary' onClick={moveToVote}>Start Vote</BigButton>
        </StoriesContainer>
    )
}