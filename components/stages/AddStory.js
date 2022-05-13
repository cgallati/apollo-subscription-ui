import { Button, Layout, Text, TextField } from "@audi/audi-ui-react"
import styled from 'styled-components'
import { useState } from "react"

const BigButton = styled(Button)`
    width: 300px;
`

const NoStoriesContainer = styled(Layout)`
    width: 100%;
    height: 100%;
`

const WideInput = styled(TextField)`
    width: 300px;
`

export default function NoStories({roomName}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
  
    return(
        <NoStoriesContainer justify='center' align='center' direction='column'>
          <Text variant="order1" weight="bold" spaceStackEnd="xl">{roomName} Room</Text>
          <WideInput 
                label="Story Name" 
                inputId='story-name-input' 
                minlength='2' 
                spaceStackEnd="l" 
                value={name}
                onChange={(e=>setName(e.target.value))}
                required 
            />
            <WideInput 
                label="Description" 
                inputId='story-description-input' 
                minlength='2' 
                spaceStackEnd="xxl" 
                value={description}
                onChange={(e=>setDescription(e.target.value))}
                required 
            />
          <BigButton variant='primary' onClick={()=>setShowVote(true)}>
              Add Story
            </BigButton>
        </NoStoriesContainer>
    )
}