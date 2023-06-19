'use strict'
'use client'

import { signIn } from '@/app/api/signin/route'
import { useState } from 'react'

export function Login() {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const data = { email, password, token: '' }
    const response = await signIn(data)

    if (response.token) {
      alert('Login realizado com sucesso!')

      // salvar o token no cookie
      document.cookie = `token=${response.token}`

      // redirecionar para a página de login
      window.location.href = '/profile'
    } else {
      alert('Erro ao realizar login')
    }
  }

  return (
    <div className="m-5 flex flex-col text-white gap-4 text-center">
      <div>
        <h1 className="text-2xl font-bold">Bem vindo novamente</h1>
        <p className="text-sm leading-snug">Faça login para continuar</p>
      </div>

      <hr className="border-gray-600" />

      <div className="flex flex-col text-start">
        <label htmlFor="email" className="text-zinc-300 text-sm leading-snug">
          email:
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-1 text-black"
        />
      </div>

      <div className="flex flex-col text-start">
        <label
          htmlFor="password"
          className="text-zinc-300 text-sm leading-snug"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-1 text-black"
        />
      </div>

      <button
        onClick={handleLogin}
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none  text-black hover:bg-green-600"
      >
        Login
      </button>

      <p className="text-sm leading-snug">
        Ainda não tem conta? {''}
        <a href="/register">Cadastre-se</a>
      </p>
    </div>
  )
}
