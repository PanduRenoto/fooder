import Link from "next/link"
import { Ban, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IUser } from "@/app/types";
import { getCookies } from "@/lib/serverCookies";
import { BASE_API_URL } from "@/global";
import { get } from "@/lib/api-bridge";

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

const noAccessPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const search = searchParams.search ? searchParams.search.toString() : ``
    const user: IUser[] = await getUser(search)
    const role = (await getCookies("role"))?.toString().toLowerCase();
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container flex flex-col items-center justify-center gap-6 px-4 text-center">
                {/* Icon */}
                <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
                    <Ban className="h-12 w-12 text-red-600 dark:text-red-400" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Access Denied</h1>
                    <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
                        Sorry, you don't have permission to access this page. Please contact your administrator for assistance.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    {user.length > 0 && (
                        <Button variant="outline" asChild>
                            <Link href={`/${role}/dashboard`}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Link>
                        </Button>
                    )}
                    <Button asChild>
                        <Link href="/login">Login with Different Account</Link>
                    </Button>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Error Code: 403 Forbidden
            </div>
        </div>
    )
}

export default noAccessPage;