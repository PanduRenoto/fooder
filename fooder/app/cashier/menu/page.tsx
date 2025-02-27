import { IMenu } from "@/app/types";
import { getCookies } from "@/lib/serverCookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image";
import SearchMenu from "./search";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const getMenu = async (search: string): Promise<IMenu[]> => {
    try {
        const TOKEN = (await getCookies("token")).toString()
        const url = `${BASE_API_URL}/menu?search=${search}`
        const { data } = await get(url, TOKEN)
        let result: IMenu[] = []
        if (data?.status) result = [...data.data]
        return result
    } catch (error) {
        console.log(error)
        return []
    }
}

const MenuPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const search = searchParams.search ? searchParams.search.toString() : ``
    const menu: IMenu[] = await getMenu(search)
    const category = (cat: string): React.ReactNode => {
        if (cat === "FOOD") {
            return <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Food</span>
        }
        if (cat === "SNACK") {
            return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">Snack</span>
        }
        if (cat === "DRINK") {
            return <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">Drink</span>
        }
    }
    return (
        <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
            <h4 className="text-2xl font-bold tracking-tight mb-1">Menu Data</h4>
            <p className="text-sm text-gray-500 mb-4">
                This page displays menu data, allowing menus to view details, search, and manage menu items by adding, editing, or deleting them.
            </p>
            <div className="flex justify-between items-center mb-4">
                {/* search bar */}
                <div className="flex items-center w-full max-w-md flex-grow border-2 rounded-md">
                    <SearchMenu url={`/cashier/menu`} search={search} />
                </div>
            </div>
            {
                menu.length == 0 ?
                    <AlertInfo title="informasi">
                        No data Available
                    </AlertInfo>
                    :
                    <>
                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px] text-primary">Picture</TableHead>
                                        <TableHead className="text-primary">Name</TableHead>
                                        <TableHead className="text-primary">Price</TableHead>
                                        <TableHead className="text-primary hidden md:table-cell">Description</TableHead>
                                        <TableHead className="text-primary">Category</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {menu.map((data, index) => (
                                        <TableRow key={`keyPrestasi${index}`}>
                                            <TableCell>
                                                <Image width={60} height={60} src={`${BASE_IMAGE_MENU}/${data.picture}`} className="rounded-sm overflow-hidden" alt="preview" unoptimized />
                                            </TableCell>
                                            <TableCell>{data.name}</TableCell>
                                            <TableCell>{data.price}</TableCell>
                                            <TableCell>{data.description}</TableCell>
                                            <TableCell>{category(data.category)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </>
            }
        </div>
    )
}

export default MenuPage;