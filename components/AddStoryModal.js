import { Button, TextField, Text, Layout } from "@audi/audi-ui-react"
import styled from 'styled-components'
import { useState } from "react"
import ReactModal from 'react-modal';
import { audiLightTheme, AudiPlatformProvider } from '@audi/audi-ui-react'

const WideInput = styled(TextField)`
    width: 300px;
`


export default function AddStoryModal({isOpen, closeModal}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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
                <Button variant="primary">Add Story</Button>
              </Layout>
            </AudiPlatformProvider>
        </ReactModal>
    )
}