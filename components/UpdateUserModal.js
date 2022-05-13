import { Button, TextField, Text, Layout } from "@audi/audi-ui-react"
import styled from 'styled-components'
import { useState } from "react"
import ReactModal from 'react-modal';
import { audiLightTheme, AudiPlatformProvider } from '@audi/audi-ui-react'
// const isBrowser = !(typeof window === 'undefined')
// let Picker = import('emoji-picker-react').catch(() => 'canceling import on server')

const WideInput = styled(TextField)`
    width: 300px;
`


export default function UpdateUserModal({isOpen, closeModal, userName, setUserName}) {

    // const [chosenEmoji, setChosenEmoji] = useState(null);
    //
    // const onEmojiClick = (event, emojiObject) => {
    //     setChosenEmoji(emojiObject);
    // };

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
              <Text variant="order2" weight="bold" spaceStackEnd="xl">Who are you?</Text>
              <WideInput 
                  label="Name"
                  inputId='user-name-input'
                  minlength='2' 
                  spaceStackEnd="l" 
                  value={userName}
                  onChange={(e=>setUserName(e.target.value))}
                  required 
                />
                {/*{isBrowser && <Picker onEmojiClick={onEmojiClick}/>}*/}
                <Button variant="primary" onClick={closeModal}>Save</Button>
              </Layout>
            </AudiPlatformProvider>
        </ReactModal>
    )
}