import { useRouter } from 'next/router'
import Head from "next/head";
import styled from 'styled-components'
import { Layout } from "@audi/audi-ui-react";
import {gql, useMutation, useQuery, useSubscription} from "@apollo/client";

import Header from "../../components/Header";
import NoStories from "../../components/NoStories"
import StoriesList from "../../components/StoriesList"
import Participants from '../../components/Participants';
import Story from '../../components/Story';
import Invite from '../../components/Invite';

const stories = [
  {name:'EPIC-123', description: 'test', status:'In Progress', points: '?'},
  {name:'EPIC-122', description: 'test', status:'Complete', points: '1'},
  {name:'EPIC-121', description: 'test', status:'Complete', points: '5'},
]

const participants = [
  {name:'Justis', emoji:'🙂', type: 'Moderator', status:'In Progress'},
  {name:'Eric', emoji:'🙂', type: 'Participant', status:'In Progress'},
  {name:'Chad', emoji:'🙂', type: 'Participant', status:'Complete'},
]

const RoomLayout = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-template-rows: 1fr;
`;

const roomName = 'Global Team';

const roomStateQuery = gql`
  query RoomState($roomId: String) {
    roomState(id: $roomId) {
      id
      name
    }
  }
`;

const Room = () => {
  const router = useRouter()
  const { roomId } = router.query
  console.log('🚀 ~ file: [roomId].js ~ line 45 ~ Room ~ roomId', roomId);
  const { data } = useQuery(roomStateQuery,{
    variables: { roomId },
  })
  console.log('🚀 ~ file: [roomId].js ~ line 45 ~ Room ~ data', data);

  return (
    <div>
      <Head>
        <title>Poker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header username={'test'}/>

        <RoomLayout>
          <div>
            {
              stories.length === 0 ? 
              <NoStories roomName={roomName} /> : 
              <Story roomName={roomName} storyName={'EPIC-123'} />
            }
            <StoriesList stories={stories} />
          </div>
          <div>
            <Participants participants={participants} />
            <Invite roomId={roomId} />
          </div>
        </RoomLayout>
      </main>
    </div>
  )
}

export default Room
