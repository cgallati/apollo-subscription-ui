import { Button, TextField, Text, Layout } from "@audi/audi-ui-react"
import styled from 'styled-components'
import { useState } from "react"
import ReactModal from 'react-modal';
import { audiLightTheme, AudiPlatformProvider } from '@audi/audi-ui-react'
import {gql, useMutation} from "@apollo/client";

const WideInput = styled(TextField)`
    width: 300px;
`

const createStoryMutation = gql`
  mutation Mutation($roomId: String, $name: String, $desc: String) {
  createRound(roomId: $roomId, name: $name, desc: $desc) {
    id
    name
    desc
    points
  }
}
`

export default function AddStoryModal({isOpen, closeModal, roomId}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createStory] = useMutation(createStoryMutation, {
      variables: {roomId}
  })

    const handleCreateStory = () => {
      createStory({variables: {name, desc: description}})
      setName( '')
      setDescription('')
      closeModal()
    }

    return(
        <ReactModal 
        isOpen={isOpen} 
        contentLabel={'Add Story'} 
        style={
          {
            content:{width:'400px', height:'450px', position:'revert'},
            overlay:{display:'flex', justifyContent:'center',alignItems:'center'}
          }
        }
        >
          <AudiPlatformProvider theme={audiLightTheme}>
            <Layout justify='end'>
              <Button onClick={closeModal}>X</Button>
            </Layout>
            <Layout direction='column' justify='center' align='center' spaceStackStart="xl">
              <Text variant="order2" weight="bold" spaceStackEnd="xl">Add a Story</Text>
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
                  label="Story Description" 
                  inputId='story-description-input' 
                  minlength='2' 
                  spaceStackEnd="xxl" 
                  value={description}
                  onChange={(e=>setDescription(e.target.value))}
                  required 
                />
                <Button variant="primary" onClick={handleCreateStory}>Add Story</Button>
              </Layout>
            </AudiPlatformProvider>
        </ReactModal>
    )
}