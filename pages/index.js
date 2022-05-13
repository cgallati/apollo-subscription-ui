import Head from "next/head";
import { Button, FormGroup, Layout, RadioButton, Text, TextField } from '@audi/audi-ui-react'
import Header from "../components/Header";
import styled from 'styled-components';
import {gql, useMutation, useQuery, useSubscription} from "@apollo/client";
import { useState } from "react"
import { useRouter } from "next/router";

const createRoomMutation = gql`
    mutation CreateRoom($name: String) {
        createRoom(name: $name){
            id
            name
        }
    }
`

const WideInput = styled(TextField)`
    width: 300px;
`

const WelcomeContainer = styled(Layout)`
    margin-top: 10rem;
`

const BigButton = styled(Button)`
    width:300px;
`

export default function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  const [createRoom, { data }] = useMutation(createRoomMutation);

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

            <WideInput 
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

            <BigButton variant="primary" onClick={
              () => createRoom({ variables: { name: roomName } })
            }>
              Create Room
            </BigButton>
        </WelcomeContainer>
      </main>
    </div>
  )
}