import { Button,Layout, Text } from "@audi/audi-ui-react";
import styled from 'styled-components';
import useCopy from "use-copy";

const GreyBackground = styled(Text)`
    background-color: #cccccc;
    padding: 1rem;
`

const CopyContainer = styled(Layout)`
    padding: 1rem;
`

export default function Invite({roomId}) {
    const [copied, copy, setCopied] = useCopy(`http://localhost:3000/room/${roomId}`);
    const copyText = () => {
        copy();
        setTimeout(() => setCopied(false), 3000);
      };
    return(
        <div>
            <Text variant="order2" weight="bold" spaceStackStart="xxl" spaceStackEnd="m">Invite</Text>
            <CopyContainer direction='column' align='center'>
                <GreyBackground spaceStackEnd="m">http://localhost:3000/room/{roomId}</GreyBackground>
                <Button variant='primary' size="small" onClick={copyText}>
                    {copied ?'Copied!':'Copy'}
                </Button>
            </CopyContainer>
        </div>
    )

}