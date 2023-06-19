import { api } from '@/lib/api'

interface LoginData {
  email: string
  password: string
}

export async function signIn(data: LoginData) {
  const response = await api.post('/login', data)
  return response.data
}
