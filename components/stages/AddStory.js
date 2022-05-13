import { Button, Layout, Text, TextField } from "@audi/audi-ui-react"
import styled from 'styled-components'

const BigButton = styled(Button)`
    width: 175px;
    height: 175px;
`

const AddStoryContainer = styled(Layout)`
    width: 100%;
    padding: 3rem;
    background-image: url("/GreyLogo.svg");
    background-position: center;
    background-repeat: no-repeat;
`

export default function AddStory({openModal}) {
    return(
        <AddStoryContainer justify='start' align='start' direction='column'>
          <BigButton variant='primary' onClick={openModal}>
              start a vote +
            </BigButton>
        </AddStoryContainer>
    )
}