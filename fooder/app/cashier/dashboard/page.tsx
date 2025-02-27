import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, DollarSign, ShoppingBag, Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IUser } from "@/app/types";
import { getCookies } from "@/lib/serverCookies";
import { BASE_API_URL } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/alert";
import Charts from "./chart";

const getUserProfile = async (): Promise<IUser | null> => {
    try {
        const TOKEN = (await getCookies("token")).toString();
        const url = `${BASE_API_URL}/user/me`;
        const { data } = await get(url, TOKEN);
        if (data?.status) {
            return data.data as IUser;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
};

const DashboardPage = async () => {
    const user = await getUserProfile()

    if (!user) {
        return (
            <AlertInfo title="informasi">
                User not found
            </AlertInfo>
        )
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user.role} {user.name}</h1>
                <p className="text-muted-foreground">Here's what's happening with your business today.</p>
            </div>
            {/* stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="stats-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-green-500 flex items-center gap-1">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="stats-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                            <ShoppingBag className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-green-500 flex items-center gap-1">+180.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="stats-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customers</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-green-500 flex items-center gap-1">+19% from last month</p>
                    </CardContent>
                </Card>
                <Card className="stats-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-green-500 flex items-center gap-1">+201 since last hour</p>
                    </CardContent>
                </Card>
            </div>
            <Charts />
            {/* Recent Orders */}
            <Card className="stats-card">
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="hover:bg-purple-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                <TableCell className="font-medium">#12345</TableCell>
                                <TableCell>John Doe</TableCell>
                                <TableCell>2x Orange Splash, 1x Kulit Mutant</TableCell>
                                <TableCell>$50.00</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-400">
                                        Delivered
                                    </span>
                                </TableCell>
                            </TableRow>
                            <TableRow className="hover:bg-purple-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                <TableCell className="font-medium">#12344</TableCell>
                                <TableCell>Jane Smith</TableCell>
                                <TableCell>1x Tumis Bendrat</TableCell>
                                <TableCell>$25.00</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400">
                                        Preparing
                                    </span>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default DashboardPage;
