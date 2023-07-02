"use client"
import { Grip } from "lucide-react"
import Image from "next/image"
import Dropdown from "./buttons/dropdowns"

interface IPeopleProps {
  name?: string
  email?: string
  avatar?: string
}

export default function BtnFriendProfile({
  name,
  email,
  avatar,
}: IPeopleProps) {
  // avatar ou imagem padrão

  const avatarDefault =
    "https://img.freepik.com/fotos-gratis/sorrindo-mulher-jovem-segurando-buque-flor-em-mao_23-2148066878.jpg?w=740&t=st=1688080708~exp=1688081308~hmac=17900dff070f1cb749bdb3fa805d68a2009851610568b4550ff0fecbcf93f52e"

  function changeAvatar() {
    if (avatar) {
      return avatar
    } else {
      return avatarDefault
    }
  }

  return (
    <div className="bg-[rgba(255,255,255,0.50)] rounded-xl pt-[11px] pr-[41px] pb-[11px] pl-[11px] flex flex-row items-center justify-between shrink-0 w-[230px] relative overflow-hidden">
      <div className="flex flex-row gap-2.5 items-center justify-between shrink-0 w-[146.97px] h-8 relative">
        <div className="rounded-2xl flex flex-row gap-0 items-center shrink-0 w-8 h-8 relative">
          <Image
            alt="avatar"
            className="rounded-2xl self-stretch flex-1 relative overflow-hidden"
            src={changeAvatar()}
            width={32}
            height={32}
          />
        </div>

        <div className="flex flex-col gap-0 items-start justify-center shrink-0 relative">
          <div className="text-gray-900 text-left relative flex items-center justify-start">
            {name}
          </div>

          <div className="text-gray-500 text-left relative flex items-center justify-start truncate w-24">
            {email}
          </div>
        </div>
        <button
          id="dropdownHoverButton"
          data-dropdown-toggle="dropdownHover"
          data-dropdown-trigger="hover"
          className="text-white hover:text-violet-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          <Grip className="shrink-0 relative overflow-visible" />
        </button>
      </div>
    </div>
  )
}
