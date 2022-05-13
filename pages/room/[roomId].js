import { useRouter } from 'next/router'
import Head from "next/head";
import styled from 'styled-components'
import {gql, useMutation, useQuery, useSubscription} from "@apollo/client";
import { useState } from "react"

import Header from "../../components/Header";
import StoriesList from "../../components/StoriesList"
import Participants from '../../components/Participants';
import Invite from '../../components/Invite';
import AddStoryModal from '../../components/AddStoryModal';
import AddStory from '../../components/stages/AddStory';
import StartVote from '../../components/stages/StartVote';
import Vote from '../../components/stages/Vote';
import Wait from '../../components/stages/Wait';
import Results from '../../components/stages/Results';

const stories = [
  {name:'EPIC-123', description: 'test', status:'Complete', points: '?'},
  {name:'EPIC-122', description: 'test', status:'In Progress', points: '1'},
  {name:'EPIC-121', description: 'test', status:'Begin Voting', points: '5'},
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
      users
    }
  }
`;

const roomStateSubscription = gql`
  subscription RoomUpdated($roomId: String) {
    roomUpdated(id: $roomId) {
      name
      users
    }
  }
`;

const ADD_STORY = 'ADD_STORY'
const START_VOTE = 'START_VOTE'
const VOTE = 'VOTE'
const WAIT = 'WAIT'
const RESULTS = 'RESULTS'

const Room = () => {
  const [stage, setStage] = useState(START_VOTE);
  const moveToVote = () => setStage(VOTE);
  const moveToWait = () => setStage(WAIT);
  const moveToResults = () => setStage(RESULTS);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const router = useRouter()
  const { roomId } = router.query
  const { data: initialData } = useQuery(roomStateQuery,{
    variables: { roomId },
  })
  const { data } = useSubscription(roomStateSubscription,
    { variables: { roomId } }
  );
  console.log('🚀 ~ file: [roomId].js ~ line 87 ~ Room ~ initialData', initialData);
  console.log('🚀 ~ file: [roomId].js ~ line 90 ~ Room ~ data', data);

  const roomName = data?.roomState?.name || initialData?.roomState?.name;
  const storyName = 'EPIC-122';
  const commonProps = {roomName, storyName}


  if(stories.length === 0) setStage(ADD_STORY);

  let StageComponent;

  if (stage === ADD_STORY) 
    StageComponent = <AddStory roomName={roomName} />;
  if (stage === START_VOTE) 
    // StageComponent = <StartVote {...commonProps} moveToVote={moveToVote} />;
    StageComponent = <Results {...commonProps} votes={votes} moveToVote={moveToVote} />;
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
        <Header username={'testUserName'}/>

        <RoomLayout>
          <div>
            {StageComponent}
            <StoriesList stories={stories} addStory={openModal} />
          </div>
          <div>
            <Participants participants={participants} />
            <Invite roomId={roomId} />
          </div>
        </RoomLayout>
        <AddStoryModal isOpen={isOpen} closeModal={closeModal} />
      </main>
    </div>
  )
}

export default Room
