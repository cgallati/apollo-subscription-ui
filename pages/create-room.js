import Head from "next/head";
import { Button, FormGroup, Layout, RadioButton, Text, TextField } from '@audi/audi-ui-react'
import Header from "../components/Header";
import styled from 'styled-components';
import {gql, useMutation, useQuery, useSubscription} from "@apollo/client";
import { useState } from "react"
import { useRouter } from "next/router";


// const sub = gql`
//   subscription CounterChanged {
//     roomUpdated 
//   }
// `;

// const roomStateQuery = gql`
//     query GetCurrentVal {
//         roomState
//     }
// `

// const updateNameMutation = gql`
//     mutation createRoom {
//         {
//             id
//         }
//     }
// `


const createRoomMutation = gql`
    mutation CreateRoom($name: String) {
        createRoom(name: $name){
            id
            name
        }
    }
`


const WelcomeContainer = styled(Layout)`
    margin-top: 10rem;
`

const BigButton = styled(Button)`
    width:300px;
`

export default function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  console.log('🚀 ~ file: create-room.js ~ line 50 ~ CreateRoom ~ roomName', roomName);
  const [createRoom, { data }] = useMutation(createRoomMutation);
  console.log('🚀 ~ file: create-room.js ~ line 51 ~ CreateRoom ~ data.createRoom.id', data?.createRoom?.id);
  console.log('🚀 ~ file: create-room.js ~ line 51 ~ CreateRoom ~ data.createRoom.name', data?.createRoom?.name);

  const router = useRouter()

  if(data) router.push("room/" + data.createRoom.id)

  return (
    <div>
      <Head>
        <title>Create Poker Room</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header username={'test'}/>
        <WelcomeContainer justify='center' align='center' direction='column' >
            <Text variant="order1" weight="bold" spaceStackEnd="xxl">Create Room</Text>

            <TextField 
              label="Room Name" 
              inputId='room-name-input' 
              minlength='2' 
              spaceStackEnd="xxl" 
              value={roomName}
              onChange={(e=>setRoomName(e.target.value))}
              required 
            />

            {/* <FormGroup label='Sorting System' spaceStackEnd="xxl" required>
                <RadioButton inputId="radio-button-Fibonacci" name="basic" spaceStackEnd="l">
                    Fibonacci
                </RadioButton>
                <RadioButton inputId="radio-button-tshirt" name="basic" spaceStackEnd="l">
                    T-Shirt
                </RadioButton>
                <RadioButton inputId="radio-button-complexity" name="basic">
                    Complexity
                </RadioButton>
            </FormGroup> */}

            <BigButton variant="primary" onClick={() => createRoom(roomName)}>
              Create Room
            </BigButton>
        </WelcomeContainer>
      </main>
    </div>
  )
}