import { Button, Layout, Text, TextField } from "@audi/audi-ui-react"
import styled from 'styled-components'

const BigButton = styled(Button)`
    width: 300px;
`

const NoStoriesContainer = styled(Layout)`
    width: 100%;
    height: 50vh;
    `

export default function AddStory({roomName, openModal}) {
    return(
        <NoStoriesContainer justify='center' align='center' direction='column'>
          <Text variant="order1" weight="bold" spaceStackEnd="xl">{roomName} Room</Text>
          <BigButton variant='primary' onClick={openModal}>
              Add Story
            </BigButton>
        </NoStoriesContainer>
    )
}