import { Avatar, Table, TableHeader,TableRow, TableColumnHeadingCell, TableBody, TableCell, Text, Button, Divider, Layout } from "@audi/audi-ui-react"
import styled from 'styled-components'

export default function VoteLog({stories, addStory}) {
    return(
<div>
<Table caption="Vote Log">
  <colgroup>
    <col span="1"/>
    <col span="1"/>
    <col span="1" style={{width: "50%"}}/>
    <col span="1"/>
  </colgroup>
  <TableHeader>
    <TableRow>
      <TableColumnHeadingCell>
        <Text
          variant="copy1"
          weight="bold"
        >
          Name
        </Text>
      </TableColumnHeadingCell>
      <TableColumnHeadingCell>
        <Text
          variant="copy1"
          weight="bold"
        >
          Description
        </Text>
      </TableColumnHeadingCell>
      <TableColumnHeadingCell>
        <Text
          variant="copy1"
          weight="bold"
        >
          Status
        </Text>
      </TableColumnHeadingCell>
      <TableColumnHeadingCell>
        <Text         
          variant="copy1"
          weight="bold"
        >
          Points
        </Text>
      </TableColumnHeadingCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {stories.map((story, index)=> (
    <TableRow key={index}>
      <TableCell columnHeading="Column Heading 1">
        <Text variant="copy1">
          {story.name}
        </Text>
      </TableCell>
      <TableCell columnHeading="Column Heading 2">
            <Text variant="copy1">{story.description}</Text>
      </TableCell>
      <TableCell columnHeading="Column Heading 3">
        <Text variant="copy1">
           {story.status}
        </Text>
      </TableCell>
      <TableCell columnHeading="Column Heading 4">
        <Avatar size="medium" label={story.status === 'In Progress' ? '?' : story.points} />
      </TableCell>
    </TableRow>    
    ))}
  </TableBody>
</Table>
</div>
    )
}