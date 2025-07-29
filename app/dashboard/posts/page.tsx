"use client";
import { DialogDemo } from "@/components/posts/create-post-dialog";
import PostsTable from "@/components/posts/posts-table";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {

    const router = useRouter()
    const [loading, setLoading] = useState(false);
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const post = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        )
        if (!post.ok) {
            setLoading(false);
            console.error('Failed to create post');
            toast.error('Failed to create post. Please try again.');
            return;
        }

        setLoading(false);
        toast.success('Post created successfully!');
        router.refresh();
    }
    return (
        <div className="flex flex-col align-center w-full  h-screen">
            <div className="mt-4">
                <Dialog>

                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={() => handleSubmit}></form>
                        <DialogHeader>
                            <DialogTitle className="text-center">Add post</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name-1">Title</Label>
                                <Input id="name-1" name="title" defaultValue="" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Description</Label>
                                <Input id="username-1" name="description" defaultValue="" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">{loading ? (<Loader2 className="animate-spiner" />) : "Add post"}</Button>
                        </DialogFooter>
                        <form />
                    </DialogContent>
                    <DialogTrigger asChild>
                        <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                </Dialog>


            </div>
            <PostsTable />
        </div>
    )
}