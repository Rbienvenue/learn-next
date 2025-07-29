import ItemList from "@/components/item/item-list";
import { prisma } from "@/prisma/db";


export default async function Items() {
    const items = await prisma.items.findMany();
    return <ItemList items={items}/>;
}