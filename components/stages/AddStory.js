import { Button, Layout, Text, TextField } from "@audi/audi-ui-react"
import styled from 'styled-components'

const BigButton = styled(Button)`
    width: 175px;
    height: 175px;
`

const NoStoriesContainer = styled(Layout)`
    width: 100%;
    height: 45vh;
    padding: 3rem;
`

export default function AddStory({openModal}) {
    return(
        <NoStoriesContainer justify='start' align='start' direction='column'>
          <BigButton variant='primary' onClick={openModal}>
              start a vote +
            </BigButton>
        </NoStoriesContainer>
    )
}