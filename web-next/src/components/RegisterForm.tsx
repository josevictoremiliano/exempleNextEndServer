import { register } from '@/app/api/register/route'
import { useState } from 'react'

export default function RegisterForm() {
  const [name, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleRegister = async () => {
    const data = { name, email, password }
    const response = await register(data)

    if (response.token) {
      alert('Usuário criado com sucesso!')

      // redirecionar para a página de login
      window.location.href = '/'
    } else {
      alert('Erro ao criar usuário')
    }
  }

  return (
    <div className="m-5 flex flex-col text-white gap-4">
      <label htmlFor="username" className="text-zinc-300">
        Username:
      </label>
      <input
        type="text"
        id="username"
        value={name}
        onChange={(e) => setUsername(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-1 text-black"
      />

      <label htmlFor="email" className="text-zinc-300">
        Email:
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-1 text-black"
      />

      <label htmlFor="password" className="text-zinc-300">
        Password:
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-1 text-black"
      />

      <label htmlFor="passwordConfirmation" className="text-zinc-300">
        Password Confirmation:
      </label>
      <input
        type="password"
        id="passwordConfirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-1 text-black"
      />

      <button
        onClick={handleRegister}
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none  text-black hover:bg-green-600"
      >
        Register
      </button>

      <p className="max-w-[140px] text-sm leading-snug">
        Já tem conta?{''}
        <a href="/">Login</a>
      </p>
    </div>
  )
}
