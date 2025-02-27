"use client";

import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { Search } from "lucide-react";

type Props = {
    url: string,
    search: string
}

const SearchMenu = ({ url, search }: Props) => {
    const [keyword, setKeyword] = useState<string>(search)
    const router = useRouter()

    const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        router.push(`${url}?search=${keyword}`)
    }

    return (
        <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input type="text" id="keyword" value={keyword} onChange={e => setKeyword(e.target.value)} className={`text-sm w-full rounded-md p-2 bg-slate-50 focus:outline-primary pl-8`} placeholder="Search" onKeyUp={handleSearch} />
        </div>
    )
}

export default SearchMenu;