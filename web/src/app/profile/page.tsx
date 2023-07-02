import { cookies } from "next/headers"
import { getUser } from "@/lib/auth"
import { api } from "@/lib/api"
import { name } from "assert"
import BtnFriendProfile from "@/components/peoples"

interface User {
  name: string
  email: string
}

export default async function ProfilePage() {
  const logout = "/api/logout"
  const token = cookies().get("token")?.value
  const { name, email } = getUser()

  if (!token) {
    return <h1>Not authenticated</h1>
  }

  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const users: User[] = response.data

  return (
    <div className="flex flex-col gap-10 p-8 bg-zinc-900 min-h-screen">
      <div className="  leading-relaxed bg-violet-700 rounded-md p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-100">Bem vindo {name}</h1>
        <p className="text-sm text-gray-400 mb-3">{email}</p>
        <a
          href={logout}
          className="bg-slate-200 p-1 px-4 rounded-md my-3 text-black hover:bg-slate-300"
        >
          Sair
        </a>
      </div>

      <div className="container">
        <div className="flex flex-col gap-10 ">
          <h1 className="text-2xl font-bold text-gray-100">
            Usuários cadastrados
          </h1>
          <div className="relative overflow-x-auto">
            <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="text-gray-100 px-6 py-3">Nome</th>
                  <th className="text-gray-100 px-6 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User) => {
                  return (
                    <tr
                      key={user.email}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user.name}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user.email}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex ">
          <div className="w-[15%] bg-red-800"></div>
          <div className="w-[70%]">
            <div className="justify-center flex-nowrap flex-col-2 md:flex md:flex-wrap container gap-4">
              {users.map((user: User) => {
                return (
                  <BtnFriendProfile
                    name={user.name}
                    email={user.email}
                    key={null}
                  />
                )
              })}
            </div>
          </div>
          <div className="w-[15%] bg-green-950 hidden md:block">nadaaqui</div>
        </div>
      </div>
    </div>
  )
}
