import Head from "next/head";
import { Button, Layout, Text } from '@audi/audi-ui-react'
import styled from 'styled-components';
import { useRouter } from "next/router";

const TextContainer = styled.div`
    width: 800px;
    text-align: center;
`

const WelcomeContainer = styled(Layout)`
    margin-top: 10rem;
`

const BigButton = styled(Button)`
    width:300px;
`

export default function CreateRoom() {
    const router = useRouter()

  return (
    <div>
      <Head>
        <title>Create Poker Room</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <WelcomeContainer justify='center' align='center' direction='column' >
          <TextContainer>
              <Text variant="display1" weight="bold" spaceStackEnd="l">Plan like you play</Text>
              <Text variant="order3" spaceStackEnd="xxxl">
                With Audi's Planning Poker, sprint planning has never been more &nbsp;
                <s>playful</s> purposeful.
              </Text>
          </TextContainer>

            <BigButton variant="primary" onClick={
              () => router.push("create-room")
            }>
              Create Room
            </BigButton>
        </WelcomeContainer>
      </main>
    </div>
  )
}