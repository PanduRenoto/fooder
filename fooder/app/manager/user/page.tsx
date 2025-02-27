import { IUser } from "@/app/types";
import { getCookies } from "@/lib/serverCookies";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image";
import SearchUser from "./search";
import AddUser from "./addUser";
import EditUser from "./editUser";
import DeleteUser from "./deleteUser";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const getUser = async (search: string): Promise<IUser[]> => {
    try {
        const TOKEN = (await getCookies("token")).toString()
        const url = `${BASE_API_URL}/user?search=${search}`
        const { data } = await get(url, TOKEN)
        let result: IUser[] = []
        if (data?.status) result = [...data.data]
        return result
    } catch (error) {
        console.log(error)
        return []
    }
}

const UserPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const search = searchParams.search ? searchParams.search.toString() : ``
    const user: IUser[] = await getUser(search)
    const role = (rol: string): React.ReactNode => {
        if (rol === "CASHIER") {
            return <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Cashier</span>
        }
        if (rol === "MANAGER") {
            return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">Manager</span>
        }
    }
    return (
        <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
            <h1 className="text-2xl font-bold tracking-tight mb-1">User Management</h1>
            <p className="text-sm text-gray-500 mb-4">
                This page displays user data, including Cashier and Manager roles. Users can view details, search, and manage data by adding, editing, or deleting users.
            </p>
            <div className="flex justify-between items-center mb-4">
                {/* search bar */}
                <div className="flex items-center w-full max-w-md flex-grow border-2 rounded-md">
                    <SearchUser url={`/manager/user`} search={search} />
                </div>
                <div className="mr-8">
                    <AddUser />
                </div>
            </div>
            {
                user.length == 0 ?
                    <AlertInfo title="informasi">
                        No data Available
                    </AlertInfo>
                    :
                    <>
                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px] text-primary">Profile</TableHead>
                                        <TableHead className="text-primary">Name</TableHead>
                                        <TableHead className="text-primary">Email</TableHead>
                                        <TableHead className="text-primary">Role</TableHead>
                                        <TableHead className="w-[100px] text-primary">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {user.map((data, index) => (
                                        <TableRow key={`keyPrestasi${index}`} >
                                            <TableCell>
                                                <Image width={60} height={60} src={`${BASE_IMAGE_PROFILE}/${data.profile_picture}`} className="rounded-full size-11 overflow-hidden" alt="preview" unoptimized />
                                            </TableCell>
                                            <TableCell>{data.name}</TableCell>
                                            <TableCell>{data.email}</TableCell>
                                            <TableCell>{role(data.role)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <EditUser selectedUser={data} />
                                                    <DeleteUser selectedUser={data} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </>
            }
        </div >
    )
}

export default UserPage;
