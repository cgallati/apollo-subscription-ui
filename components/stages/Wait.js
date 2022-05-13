import { Button, Layout, Loader, Text } from "@audi/audi-ui-react"
import styled from 'styled-components'

const NoStoriesContainer = styled(Layout)`
    width: 100%;
    height: 100%;
`

export default function Wait({roomName, storyName, yetToVote, moveToResults}) {
    const yetToVoteNames = yetToVote.map(person=>person.name)

    return(
        <NoStoriesContainer justify='center' align='center' direction='column'>
            <Text variant="order1" weight="bold">{roomName} Room</Text>
            <Text variant="order2" weight="bold" spaceStackEnd="xxxl">{storyName}</Text>

            <Text variant="order2" weight="bold">Vote submitted</Text>
            <Text variant="order3" weight="bold" spaceStackEnd="l">
                Waiting on {yetToVoteNames.join(', ')}
            </Text>
            <Loader />

            {/* <Button variant='primary' onclick={()=>moveToResults()}>results</Button> */}

        </NoStoriesContainer>
    )
}