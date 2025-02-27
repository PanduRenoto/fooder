"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import Image from "next/image";
import MenuItem from "./menuItem";
import Logo from "../../public/image/logoFooder.jpg";
import { getCookie, removeCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { IUser } from "@/app/types";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/alert";

type MenuType = {
    id: string
    icon: ReactNode
    path: string
    label: string
}

type ManagerProp = {
    children: ReactNode
    id: string
    title: string
    menuList: MenuType[]
}

const Sidebar = ({ children, id, title, menuList }: ManagerProp) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [user, setUser] = useState<IUser | null>(null)
    const router = useRouter()

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev)
    }

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const TOKEN = getCookie("token")
                if (!TOKEN) return
                const url = `${BASE_API_URL}/user/me`
                const { data } = await get(url, TOKEN)
                if (data?.status) {
                    setUser(data.data as IUser)
                }
            } catch (error) {
                console.error("Error fetching user profile:", error)
            }
        }
        fetchUserProfile()
    }, [])

    const handleLogout = () => {
        removeCookie("token")
        removeCookie("id")
        removeCookie("name")
        removeCookie("role")
        router.replace(`/login`)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isDropdownOpen])

    if (!user) {
        return (
            <AlertInfo title="informasi">
                User not found
            </AlertInfo>
        )
    }

    return (
        <div className="w-full min-h-dvh bg-slate-50">
            {/* header */}
            <header className="flex justify-between items-center p-4 mb-0 bg-primary shadow-md">
                <div className="flex gap-2">
                    <button onClick={() => setIsShow(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </button>
                    <h1 className="font-bold text-xl text-white">
                        {title}
                    </h1>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <button onClick={toggleDropdown} className="flex items-center space-x-2 text-white">
                        <Image
                            width={32}
                            height={32}
                            src={`${BASE_IMAGE_PROFILE}/${user.profile_picture}`}
                            className="rounded-full size-8 overflow-hidden"
                            alt="userProfile"
                            unoptimized>
                        </Image>
                        <span className="font-bold">{user.name}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 top-full">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                            <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                        </div>
                    )}
                </div>
            </header>

            {/* content */}
            <div className="p-4">
                {children}
            </div>

            {/* sidebar */}
            <div className={`flex flex-col w-2/3 md:w-1/2 lg:w-1/4 h-full fixed top-0 right-full transition-transform z-50 bg-white border-r border-primary ${isShow ? `translate-x-full` : ``}`}>
                {/* close button */}
                <div className="ml-auto p-2">
                    <button onClick={() => setIsShow(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:text-primary transition duration-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                {/* logo section */}
                <div className="mb-3 w-full flex justify-center">
                    <div className="flex items-center space-x-2">
                        <Image src={Logo} alt="Logo" width={40} height={40} />
                        <h1 className="text-2xl font-bold text-primary">Fooder</h1>
                    </div>
                </div>
                {/* user section */}
                <div className="w-full mt-10 mb-6 bg-primary text-white p-3 flex gap-2 items-center">
                    <Image
                        width={40}
                        height={40}
                        src={`${BASE_IMAGE_PROFILE}/${user.profile_picture}`}
                        className="rounded-full size-8 overflow-hidden"
                        alt="userProfile"
                        unoptimized>
                    </Image>
                    <div className="text-sm font-semibold">{user.name}</div>
                </div>
                {/* menu section */}
                <div className="w-full p-2 overflow-y-auto">
                    <div className="px-5">
                        {
                            menuList.map((menu, index) => (
                                <MenuItem icon={menu.icon} label={menu.label} path={menu.path} active={menu.id === id} key={`keyMenu${index}`} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
