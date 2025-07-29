"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation";
import { Items } from "@prisma/client";

export default  function ItemList({items}: { items: Items[] }) {
    const [showModel, setShowModel] = useState(false);
    const router = useRouter();

    function handleToggle() {
        setShowModel(!showModel);
    }
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            toast.success('Item added successfully!');
            router.refresh();
        }
        catch (error) {
            console.error('Error adding item:', error);
            toast.error('Failed to add item. Please try again.');
        }
    }

    async function handleDelete(id: string) {
        try {
            const response = await fetch(`/api/item/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            toast.success('Item deleted successfully!');
            router.refresh();
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('Failed to delete item. Please try again.');
        }
    }

    return (
        <div className="container min-h-screen w-screen p-4 flex justify-center flex-col">
            {
                showModel && (
                    <div className="shadow-md w-[40vw] text-center bg-light rounded-lg transition-all">
                        <h1 className="text-l px-[20px]">Add an item</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col p-4">
                            <label className="text-left text-sm">Item Name</label>
                            <input type="text" name="name" className="border border-gray-300 rounded p-2 mb-4" placeholder="Enter item name" />

                            <label className="text-left text-sm">Description</label>
                            <textarea name="description" className="border border-gray-300 rounded p-2 mb-4" placeholder="Enter item description"></textarea>

                            <div className="flex justify-end w-full mb-4">
                                <button className="cursor-pointer px-[5px] py-[2px] bg-gray-200 w-[90px]">
                                    Add item
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
            <button className="cursor-pointer px-[5px] py-[2px] bg-gray-200 w-[90px] justify-end" onClick={handleToggle}>create item</button>

            <div className="w-[80%]">
                <Table className="bordered rounded-lg shadow-xl bg-violet-200">
                    <TableCaption>list of current items.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Item</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Created at</TableHead>
                            <TableHead>updated at</TableHead>
                            <TableHead>Delete</TableHead>
                            <TableHead>Update</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.createdAt.toDateString()}</TableCell>
                                <TableCell>{item.updatedAt.toDateString()}</TableCell>
                                <TableCell><span className="bg-red-500 text-white hover:bg-red-600 rounded-sm font-bold-md py-2 px-4 cursor-pointer" onClick={()=> handleDelete(item.id)}>Delete</span></TableCell>
                                <TableCell><span className="bg-green-500 text-white hover:bg-green-600 rounded-sm font-bold-md py-2 px-4 cursor-pointer" onClick={()=> handleUpdate(item.id)}>Update</span></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}