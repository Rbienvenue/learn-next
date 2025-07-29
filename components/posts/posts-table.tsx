import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

export default function PostsTable() {
    return <Table className="mt-4">
        <TableCaption>A list of your current posts</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Delete</TableHead>
                <TableHead>Update</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell>Post 1</TableCell>
                <TableCell>This is the description for post 1</TableCell>
                <TableCell>2023-10-01</TableCell>
                <TableCell>
                    <button className="text-red-500">Delete</button>
                </TableCell>
                <TableCell>
                    <button className="text-blue-500">Update</button>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
}