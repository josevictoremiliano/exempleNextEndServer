'use strict'
'use client'

import { signIn } from '@/app/api/signin/route'
import { Mail, SquareAsterisk } from 'lucide-react'
import Logo from '@/assets/logo.svg'
import { useState } from 'react'
import Image from 'next/image'
import Alert from './alert'
import Link from 'next/link'

export function Login() {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')

  const handleLogin = async () => {
    const data = { email, password, token: '' }
    const response = await signIn(data)

    if (response.token) {
      setAlertMessage('Login realizado com sucesso')
      setAlertType('success')
      setAlertVisible(true)

      // salvar o token no cookie
      document.cookie = `token=${response.token}`

      // redirecionar para a página de login
      window.location.href = '/profile'
    } else {
      if (response.error) {
        // Tratamento para erros do servidor
        setAlertMessage(`Erro do servidor: ${response.error}`)
        setAlertType('warning')
      } else {
        // Tratamento para erros de senha ou email incorretos
        setAlertMessage('Email ou senha incorretos')
        setAlertType('error')
      }

      setAlertVisible(true)

      setAlertVisible(true)

      setTimeout(() => {
        setAlertVisible(false)
      }, 5000)
    }
  }

  return (
    <div className="container justify-center items-center inline-flex">
      <div className="container flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-zinc-900 p-24 shadow-sm rounded-lg opacity-70">
        <div className="logo lg:w-[600px] md:w-[250px] sm:w-[150px] items-center flex justify-center">
          <Image src={Logo} alt="Logo" width={250} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-center my-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Bem vindo de volta!
            </h1>
            <p className="text-gray-700 dark:text-gray-400">
              Entre com seu email e senha
            </p>
          </div>
          <div className="h-[25px] mb-6">
            {alertVisible && (
              <div className="alert">
                <Alert message={alertMessage} type={alertType} />
              </div>
            )}
          </div>
          <form
            action=""
            method="post"
            className="lg:w-[600px] md:w-[350px] sm:w-full"
          >
            <label
              htmlFor="input-group-1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <div className="flex mb-3">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <Mail />
              </span>
              <input
                type="text"
                id="input-group-1"
                onChange={(e) => setemail(e.target.value)}
                className="min-w-[200px] rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@name.com"
              />
            </div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Senha
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <SquareAsterisk />
              </span>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="***************"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900 dark:text-white"
                >
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleLogin}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-500"
              >
                Entrar
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <span className="font-normal text-zinc-100 dark:text-dark">
              Não tem conta? {''}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Cadastre-se
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
