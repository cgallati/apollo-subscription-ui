import { Button, Layout, Text } from "@audi/audi-ui-react"
import styled from 'styled-components'

const BigButton = styled(Button)`
    width: 300px;
`

const NoStoriesContainer = styled(Layout)`
    width: 100%;
    height: 100%;
`

export default function NoStories(roomName) {
    return(
        <NoStoriesContainer justify='center' align='center' direction='column'>
          <Text variant="order1" weight="bold" spaceStackEnd="xl">{roomName} Room</Text>
          <BigButton variant='primary' onClick={()=>setShowVote(true)}>
              Add Stories
            </BigButton>
        </NoStoriesContainer>
    )
}