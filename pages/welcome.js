import Head from "next/head";
import { Button, Layout, Text } from '@audi/audi-ui-react'
import styled from 'styled-components';

import Header from "../components/Header";

const WelcomeContainer = styled(Layout)`
    margin-top: 10rem;
`

const BigButton = styled(Button)`
    width:300px;
`

export default function Welcome() {
  return (
    <div>
      <Head>
        <title>Poker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header username={'test'}/>
        <WelcomeContainer justify='center' align='center' direction='column' >
            <Text variant="order1" weight="bold" spaceStackEnd="m">Compelling Heading</Text>
            <Text variant="copy1" spaceStackEnd="xxl">
                With Planet, some more words on the value of this thing - collaborating has never been easier.
            </Text>
            <BigButton variant="primary">Create Room</BigButton>
        </WelcomeContainer>
      </main>
    </div>
  )
}