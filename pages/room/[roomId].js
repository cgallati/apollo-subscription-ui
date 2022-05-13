import Head from "next/head";
import styled from 'styled-components'
import {gql, useMutation, useQuery, useSubscription} from "@apollo/client";
import {useEffect, useState} from "react"

import Header from "../../components/Header";
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

const stories = [
  {name:'EPIC-123', description: 'test', status:'In Progress', points: '???'},
  {name:'EPIC-122', description: 'test', status:'Complete', points: '1'},
  {name:'EPIC-121', description: '', status:'Complete', points: '5'},
];

const participants = [
  {name:'Justis', emoji:'🙂', type: 'Moderator', status:'In Progress'},
  {name:'Eric', emoji:'🙂', type: 'Participant', status:'In Progress'},
  {name:'Chad', emoji:'🙂', type: 'Participant', status:'Complete'},
];

const yetToVote = [
  {name:'Justis', emoji:'🙂', type: 'Moderator', status:'In Progress'},
  {name:'Eric', emoji:'🙂', type: 'Participant', status:'In Progress'},
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

const RoomLayout = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-template-rows: 1fr;
`;


const roomStateQuery = gql`
  query RoomState($roomId: String) {
    roomState(id: $roomId) {
      name
      users {
        name
        emoji
      }
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
  console.log('🚀 ~ file: [roomId].js ~ line 87 ~ Room ~ initialData', initialData);
  console.log('🚀 ~ file: [roomId].js ~ line 90 ~ Room ~ data', data);

  const roomName = data?.roomUpdated?.name || initialData?.roomState?.name;
  const users = data?.roomUpdated?.users ||  initialData?.roomState?.users

  const [stage, setStage] = useState(START_VOTE);
  const moveToVote = () => setStage(VOTE);
  const moveToWait = () => setStage(WAIT);
  const moveToResults = () => setStage(RESULTS);

  // Add story modal state
  const [isOpenAddStory, setIsOpenAddStory] = useState(false);
  const openModalAddStory = () => setIsOpenAddStory(true);
  const closeModalAddStory = () => setIsOpenAddStory(false);

  // Update user modal state
  const [isOpenUpdateUser, setIsOpenUpdateUser] = useState(false);
  const openModalUpdateUser = () => setIsOpenUpdateUser(true);
  const closeModalUpdateUser = () => {
    if (!users.find(user => user.name === userName)) {
      createUser({variables: {userName, emoji: '🥳'}})
    }
    setIsOpenUpdateUser(false);
  }

  useEffect(() => {
    if (!userName) {
      openModalUpdateUser()
    }
  }, [userName])



  const storyName = 'EPIC-122';
  const commonProps = {roomName, storyName}

  if(stage !== ADD_STORY && stories.length === 0) setStage(ADD_STORY);

  let StageComponent;

  if (stage === ADD_STORY) 
    StageComponent = <AddStory roomName={roomName} />;
  if (stage === START_VOTE) 
    StageComponent = <StartVote {...commonProps} moveToVote={moveToVote} />;
    // StageComponent = <Results {...commonProps} votes={votes} moveToVote={moveToVote} />;
  if (stage === VOTE) 
    StageComponent = <Vote {...commonProps} moveToWait={moveToWait} />;
  if (stage === WAIT) {
    StageComponent = <Wait {...commonProps} yetToVote={yetToVote} moveToResults={moveToResults} />;
  }
  if (stage === RESULTS) 
    StageComponent = <Results 
      {...commonProps}
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
          <div>
            {StageComponent}
            <VoteLog stories={stories} />
          </div>
          <div>
            <Participants participants={users} />
            <Invite roomId={roomId} />
          </div>
        </RoomLayout>
        <UpdateUserModal isOpen={isOpenUpdateUser} closeModal={closeModalUpdateUser} userName={userName} setUserName={setUserName} />
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
