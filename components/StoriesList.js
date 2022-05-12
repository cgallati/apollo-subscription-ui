import { Table, TableHeader,TableRow, TableColumnHeadingCell, TableBody, TableCell, Text, Button } from "@audi/audi-ui-react"

export default function StoriesList({stories}) {
    return(
<div>
<Table caption="Stories">
  <TableHeader>
    <TableRow>
      <TableColumnHeadingCell>
        <Text
          as="span"
          variant="copy1"
          weight="bold"
        >
          Name
        </Text>
      </TableColumnHeadingCell>
      <TableColumnHeadingCell>
        <Text
          as="span"
          variant="copy1"
          weight="bold"
        >
          Description
        </Text>
      </TableColumnHeadingCell>
      <TableColumnHeadingCell>
        <Text
          as="span"
          variant="copy1"
          weight="bold"
        >
          Status
        </Text>
      </TableColumnHeadingCell>
      <TableColumnHeadingCell>
        <Text
          as="span"
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
        <Text
          as="span"
          variant="copy1"
        >
          {story.name}
        </Text>
      </TableCell>
      <TableCell columnHeading="Column Heading 2">
        <Text
          as="span"
          variant="copy1"
        >
           {story.description}
        </Text>
      </TableCell>
      <TableCell columnHeading="Column Heading 3">
        <Text
          as="span"
          variant="copy1"
        >
           {story.status}
        </Text>
      </TableCell>
      <TableCell columnHeading="Column Heading 4">
        <Text
          as="span"
          variant="copy1"
        >
           {story.points}
        </Text>
      </TableCell>
    </TableRow>    
    ))}
  </TableBody>
</Table>
<Button variant='secondary' stretch spaceStackStart="s">add a story +</Button>
</div>
    )
}