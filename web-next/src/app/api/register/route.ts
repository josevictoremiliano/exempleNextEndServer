import { api } from '@/lib/api'

interface RegistrationData {
  name: string
  email: string
  password: string
}

export async function register(data: RegistrationData) {
  const response = await api.post('/register', data)
  return response.data
}
