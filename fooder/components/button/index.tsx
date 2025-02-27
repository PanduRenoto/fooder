import { ReactNode } from "react";

type Props = {
    children: ReactNode
    type: "button" | "submit" | "reset"
    onClick?: () => void
    className?: string
}

export const ButtonSuccess = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm bg-green-600 text-white border-2 border-green-600 rounded-md py-2 px-4 hover:bg-green-500 font-bold transition duration-300 ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const ButtonPrimary = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm bg-primary/90 text-white rounded-md py-2 px-4 hover:bg-primary font-bold ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const ButtonWarning = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm bg-yellow-500 text-white rounded-md py-2 px-4 hover:bg-yellow-600 font-bold ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const ButtonDanger = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm bg-red-600 text-white border-2 border-red-600 rounded-md py-2 px-4 hover:bg-red-500 font-bold transition duration-300 ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const ButtonInfo = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm bg-sky-600 text-white border-2 border-sky-600 rounded-md py-2 px-4 hover:bg-sky-500 font-bold transition duration-300 ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}