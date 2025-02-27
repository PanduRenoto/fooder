"use client";

import { IUser } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { put } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ButtonSuccess, ButtonDanger, ButtonInfo, ButtonWarning } from "@/components/button";
import { InputGroupComponent } from "@/components/inputComponent";
import Modal from "@/components/modal";
import Select from "@/components/select";
import FileInput from "@/components/fileInput";
import { Pencil } from "lucide-react";

const EditUser = ({ selectedUser }: { selectedUser: IUser }) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>({ ...selectedUser })
    const router = useRouter()
    const TOKEN = getCookie("token") || ""
    const [file, setFile] = useState<File | null>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const [isEditPassword, setIsEditPassword] = useState(false)
    const openModal = () => {
        setUser({ ...selectedUser })
        setIsShow(true)
        if (formRef.current) formRef.current.reset()
    }
    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/user/${selectedUser.id}`
            const { name, email, password, role } = user
            const payload = new FormData()
            payload.append("name", name || "")
            payload.append("email", email || "")
            payload.append("password", password || "")
            payload.append("role", role || "")
            if (file instanceof File) payload.append("profile_picture", file)
            const { data } = await put(url, payload, TOKEN)
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, { hideProgressBar: true, containerId: `toastUser`, type: `success` })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(data?.message, { hideProgressBar: true, containerId: `toastUser`, type: `warning` })
            }
        } catch (error) {
            console.log(error)
            toast(`Something Wrong`, { hideProgressBar: true, containerId: `toastUser`, type: `error` })
        }
    }
    return (
        <div>
            <ToastContainer containerId={`toastUser`} />
            <ButtonInfo type="button" onClick={() => openModal()}>
                <Pencil className="h-4 w-4" />
            </ButtonInfo>
            <Modal isShow={isShow} onClose={state => setIsShow(state)}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl">Update User</strong>
                                <small className="text-slate-400 text-sm">Managers can update both Cashier and Manager roles on this page.</small>
                            </div>
                            <div className="ml-auto">
                                <button type="button" className="text-slate-400" onClick={() => setIsShow(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* modal body */}
                    <div className="p-5">
                        <InputGroupComponent id={`name`} type="text" value={user.name} onChange={val => setUser({ ...user, name: val })} required={true} label="Name" onKeyUp={() => { }} />
                        <InputGroupComponent id={`email`} type="email" value={user.email} onChange={val => setUser({ ...user, email: val })} required={true} label="Email" onKeyUp={() => { }} />
                        <Select id={`role`} value={user.role} label="Role User" required={true} onChange={val => setUser({ ...user, role: val })}>
                            <option value="">--- Select Role ---</option>
                            <option value="CASHIER">Cashier</option>
                            <option value="MANAGER">Manager</option>
                        </Select>
                        <FileInput acceptTypes={["application/pdf", "image/png", "image/jpeg", "image/jpg"]} id="profile_picture" label="Upload picture (Max 2MB, PDF/JPG/JPEG/PNG)" onChange={f => setFile(f)} required={false} />
                        {!isEditPassword && (
                            <ButtonWarning type="button" onClick={() => setIsEditPassword(!isEditPassword)}>
                                Ubah Password Default
                            </ButtonWarning>
                        )}
                        {isEditPassword && (
                            <InputGroupComponent id="password" type="password" value={user.password} onChange={val => setUser({ ...user, password: val })} required={true} label="Password Default" onKeyUp={() => { }} />
                        )}
                    </div>
                    {/* modal footer */}
                    <div className="w-full p-5 flex rounded-b-2xl shadow">
                        <div className="flex ml-auto gap-2">
                            <ButtonDanger type="button" onClick={() => setIsShow(false)}>
                                Cancel
                            </ButtonDanger>
                            <ButtonSuccess type="submit">
                                Save
                            </ButtonSuccess>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default EditUser;