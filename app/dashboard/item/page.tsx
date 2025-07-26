"use client";

import { toast } from "sonner";

export default function Item() {

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try{
            const formData = new FormData(event.currentTarget);
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
        }
         catch(error) {
            console.error('Error adding item:', error);
            toast.error('Failed to add item. Please try again.'); 
        }
    }
    return (
        <div className="container min-h-screen mx-auto p-4 flex justify-center flex-col">
            <div className="shadow-md w-[40vw] text-center bg-light rounded-lg">
                <h1 className="text-l px-[20px]">Add an item</h1>
                <form onSubmit={handleSubmit} className="flex flex-col p-4">
                    <label className="text-left text-sm">Item Name</label>
                    <input type="text" name="name" className="border border-gray-300 rounded p-2 mb-4" placeholder="Enter item name" />

                    <label className="text-left text-sm">Description</label>
                    <textarea name="decription" className="border border-gray-300 rounded p-2 mb-4" placeholder="Enter item description"></textarea>

                    <button type="submit" className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">Add Item</button>
                </form>
            </div>
        </div>
    )
}