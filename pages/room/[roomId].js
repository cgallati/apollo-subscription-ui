import Head from "next/head";
import styled from 'styled-components'
import {gql, useMutation, useQuery, useSubscription} from "@apollo/client";
import {useEffect, useState} from "react"
import { Divider,Layout, Text } from "@audi/audi-ui-react";
import Image from "next/image";

import Header from "../../components/Header";
import AddStoryModal from "../../components/AddStoryModal";

import VoteLog from "../../components/VoteLog"
import Participants from '../../components/Participants';
import Invite from '../../components/Invite';
import AddStory from '../../components/stages/AddStory';
import StartVote from '../../components/stages/StartVote';
import Vote from '../../components/stages/Vote';
import Wait from '../../components/stages/Wait';
import Results from '../../components/stages/Results';
import UpdateUserModal from "../../components/UpdateUserModal";
import {useLocalStorage} from "../../hooks/useLocalStorage";

const RoomName = styled(Text)`
  text-align: center;
`

const SideBar = styled.div`
  padding: 1rem;
  background-color: white;
`

const RoomLayout = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-template-rows: 1fr;
  background-color: #f2f2f2;
  height: 89.5vh;
`;

const getRandomEmoji = () => {
  const EMOJIS = ['ð','ðĨģ','ð','ð','ð§','ðĨš','ðš','ð','ðĪŠ','ð']
  const index = Math.floor(Math.random() * EMOJIS.length)
  return EMOJIS[index]
}

const yetToVote = [
  {name:'Justis', emoji:'ð', type: 'Moderator', status:'In Progress'},
  {name:'Eric', emoji:'ð', type: 'Participant', status:'In Progress'},
];

const votes = [
  {value:'1/2', votes:0},
  {value:'1', votes:0},
  {value:'2', votes:1},
  {value:'3', votes:0},
  {value:'5', votes:3},
  {value:'8', votes:0},
  {value:'13', votes:1},
  {value:'???', votes:0},
];

const roomStateQuery = gql`
  query RoomState($roomId: String) {
    roomState(id: $roomId) {
      name
      users {
        name
        emoji
      }
      rounds {
        name
        desc
        id
        points
      }
      currentRoundId
    }
  }
`;

const roomStateSubscription = gql`
  subscription RoomUpdated($roomId: String) {
    roomUpdated(id: $roomId) {
      name
      users {
        name
        emoji
      }
      rounds {
        name
        desc
        id
        points
      }
      currentRoundId
    }
  }
`;

const createUserMutation = gql`
  mutation CreateUser($roomId: String, $userName: String, $emoji: String) {
    createUser(roomId: $roomId, name: $userName, emoji: $emoji) {
      name
      emoji
      vote
    }
  }
`

const startVoteMutation = gql`
mutation StartRound($roomId: String, $id: String) {
  startRound(roomId: $roomId, id: $id) 
}
`

const ADD_STORY = 'ADD_STORY'
const START_VOTE = 'START_VOTE'
const VOTE = 'VOTE'
const WAIT = 'WAIT'
const RESULTS = 'RESULTS'

const Room = ({roomId}) => {
  const [userName, setUserName] = useLocalStorage("name", "");

  const { data: initialData } = useQuery(roomStateQuery,{
    variables: { roomId },
  })
  const { data } = useSubscription(roomStateSubscription,
      { variables: { roomId } }
  );
  const [createUser] = useMutation(createUserMutation, {
    variables: {roomId}
  });
  const [startVote] = useMutation(startVoteMutation, {
    variables: {roomId}
  });
  console.log('ð ~ file: [roomId].js ~ line 87 ~ Room ~ initialData', initialData);
  console.log('ð ~ file: [roomId].js ~ line 90 ~ Room ~ data', data);

  const roomName = data?.roomUpdated?.name || initialData?.roomState?.name;
  const users = data?.roomUpdated?.users ||  initialData?.roomState?.users
  const stories = data?.roomUpdated?.rounds ||  initialData?.roomState?.rounds || []

  // Add story modal state
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // page state
  const [stage, setStage] = useState(START_VOTE);
  const moveToStartVote = () => setStage(START_VOTE);
  const moveToVote = () => setStage(VOTE);
  const moveToWait = () => setStage(WAIT);
  const moveToResults = () => setStage(RESULTS);

  // Update user modal state
  const [isOpenUpdateUser, setIsOpenUpdateUser] = useState(false);
  const openModalUpdateUser = () => setIsOpenUpdateUser(true);
  const closeModalUpdateUser = () => {
    if (!users?.find(user => user.name === userName)) {
      createUser({variables: {userName, emoji: getRandomEmoji()}})
    }
    setIsOpenUpdateUser(false);
  }

  useEffect(() => {
    if (!userName) {
      openModalUpdateUser()
    }
  }, [userName])



  const storyName = 'EPIC-122';

  if(stage !== ADD_STORY && stories?.length === 0) setStage(ADD_STORY);

  let StageComponent;

  if (stage === ADD_STORY) 
    StageComponent = <AddStory openModal={openModal} />;
  if (stage === START_VOTE) 
    StageComponent = <StartVote storyName={storyName} moveToVote={moveToVote} startVote={startVote} />;
  if (stage === VOTE) 
    StageComponent = <Vote storyName={storyName} moveToWait={moveToWait} />;
  if (stage === WAIT) {
    StageComponent = <Wait storyName={storyName} yetToVote={yetToVote} moveToResults={moveToResults} />;
  }
  if (stage === RESULTS) 
    StageComponent = <Results 
      storyName={storyName}
      votes={votes} 
      moveToVote={moveToVote}
    />;

  return (
    <div>
      <Head>
        <title>Poker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header username={userName} showUsername={!isOpenUpdateUser}/>

        <RoomLayout>
          <Layout direction='column'>
            {StageComponent}
            <VoteLog stories={stories} />
          </Layout>
          <SideBar>
            <RoomName variant="order1" weight="bold" spaceStackStart="l" spaceStackEnd="l">{roomName}</RoomName>
            <Divider />
            <Participants participants={users} />
            <Invite roomId={roomId} />
          </SideBar>
        </RoomLayout>
        <UpdateUserModal isOpen={isOpenUpdateUser} closeModal={closeModalUpdateUser} userName={userName} setUserName={setUserName} />
        <AddStoryModal isOpen={isOpen} closeModal={closeModal} roomId={roomId} moveToStartVote={moveToStartVote} />
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {roomId: context.query.roomId},
  }
}

export default Room
