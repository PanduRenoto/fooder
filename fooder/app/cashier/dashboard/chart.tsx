"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const monthlyData = [
    { name: "Jan", total: 1800 },
    { name: "Feb", total: 2200 },
    { name: "Mar", total: 2800 },
    { name: "Apr", total: 2400 },
    { name: "May", total: 3200 },
    { name: "Jun", total: 3800 },
    { name: "Jul", total: 4200 },
    { name: "Aug", total: 4800 },
    { name: "Sep", total: 5200 },
    { name: "Oct", total: 4900 },
    { name: "Nov", total: 5800 },
    { name: "Dec", total: 6200 },
]

const favoriteMenuData = [
    { name: "Orange Splash", value: 30, color: "#f97316" },
    { name: "Kulit Mutant Crispy", value: 25, color: "#eab308" },
    { name: "Tumis Bendrat", value: 20, color: "#22c55e" },
]

const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, value, index } = props
    const RADIAN = Math.PI / 180
    const radius = outerRadius + 30
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            x={x}
            y={y}
            fill="#000"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            className="text-sm font-medium"
        >
            {value}
        </text>
    )
}

const renderColorfulLegendText = (value: string) => {
    return <span className="text-sm">{value}</span>
}

export default function Charts() {
    return (
        <div className="space-y-6">
            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="stats-card">
                    <CardHeader>
                        <CardTitle>Monthly Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: "rgba(255, 255, 255, 0.8)",
                                        border: "none",
                                        borderRadius: "4px",
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    }}
                                    labelStyle={{ fontWeight: "bold" }}
                                />
                                <Bar dataKey="total" radius={[4, 4, 0, 0]} className="fill-primary">
                                    {monthlyData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            className="fill-primary hover:fill-primary/80 transition-colors cursor-pointer"
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pie Chart - Label</CardTitle>
                        <p className="text-sm text-muted-foreground">January - June 2024</p>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                        <div className="w-[400px] h-[400px]">
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={favoriteMenuData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={true}
                                    label={renderCustomizedLabel}
                                    outerRadius={130}
                                    dataKey="value"
                                >
                                    {favoriteMenuData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Legend
                                    layout="vertical"
                                    align="left"
                                    verticalAlign="bottom"
                                    formatter={renderColorfulLegendText}
                                    iconType="circle"
                                    iconSize={8}
                                    wrapperStyle={{
                                        paddingTop: "20px",
                                        marginLeft: "-100px",
                                    }}
                                />
                            </PieChart>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

