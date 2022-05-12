import { Avatar, Layout, Text } from "@audi/audi-ui-react";
import styled from 'styled-components';

const WideTable = styled.table`
    width: 100%;

    th{
        text-align: start;
    }
`

const BigAvatar = styled(Avatar)`
    span {
        font-size: 2rem !important;
    }
`


export default function Participants({participants}) {
    return(
        <div>
            <Text variant="order2" weight="bold" spaceStackStart="l">Participants</Text>
            <WideTable>
                <colgroup>
                    <col span="1" style={{width: "70%"}}/>
                    <col span="1" style={{width: "30%"}}/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">
                            <Text weight="bold">Name</Text>
                        </th>
                        <th scope="col">
                            <Text weight="bold">Vote Status</Text>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {participants.map((participant, index)=>(
                    <tr key={index}>
                        <td>
                            <Layout>
                                <BigAvatar size="medium" label={participant.emoji} spaceInlineEnd='m' />
                                <div>
                                    <Text variant="order3">{participant.name}</Text> 
                                    <Text>{participant.type}</Text>
                                </div>
                            </Layout>
                        </td>
                        <td>
                            <Text>{participant.status}</Text> 
                        </td>
                    </tr>
                ))}
                </tbody>
            </WideTable>

        </div>

    )
}