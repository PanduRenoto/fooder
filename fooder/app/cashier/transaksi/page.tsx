"use client"

import { useState } from "react"
import { Check, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TransactionsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [date, setDate] = useState<Date>()
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
            </div>

            <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">{date ? date.toLocaleDateString() : "Pick a date"}</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                </Popover>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Payment Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>#12345</TableCell>
                            <TableCell>John Doe</TableCell>
                            <TableCell>$50.00</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700">
                                    Paid
                                </span>
                            </TableCell>
                            <TableCell>2024-02-17</TableCell>
                            <TableCell>
                                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[525px]">
                                        <DialogHeader>
                                            <DialogTitle>Order #12345 Details</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div className="grid gap-2">
                                                <div className="font-medium">Order Items</div>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Item</TableHead>
                                                            <TableHead>Quantity</TableHead>
                                                            <TableHead>Price</TableHead>
                                                            <TableHead>Total</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>Orange Splash</TableCell>
                                                            <TableCell>2</TableCell>
                                                            <TableCell>$20.00</TableCell>
                                                            <TableCell>$40.00</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Kulit Mutant</TableCell>
                                                            <TableCell>1</TableCell>
                                                            <TableCell>$10.00</TableCell>
                                                            <TableCell>$10.00</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Subtotal</span>
                                                <span>$50.00</span>
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm">
                                                    <X className="mr-2 h-4 w-4" />
                                                    Cancel Order
                                                </Button>
                                                <Button size="sm">
                                                    <Check className="mr-2 h-4 w-4" />
                                                    Confirm Payment
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

