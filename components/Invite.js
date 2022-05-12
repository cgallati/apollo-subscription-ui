import { Button,Layout, Text } from "@audi/audi-ui-react";
import styled from 'styled-components';

const GreyBackground = styled(Text)`
    background-color: #cccccc;
    padding: 1rem;
`

const CopyContainer = styled(Layout)`
    padding: 1rem;
`

export default function Invite({roomId}) {

    return(
        <div>
            <Text variant="order2" weight="bold" spaceStackStart="xxl" spaceStackEnd="m">Invite</Text>
            <CopyContainer direction='column' align='center'>
                <GreyBackground spaceStackEnd="m">http://localhost:3000/room/{roomId}</GreyBackground>
                <Button variant='primary' size="small">Copy</Button>
            </CopyContainer>
        </div>
    )

}