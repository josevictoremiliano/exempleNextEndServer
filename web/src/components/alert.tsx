import { AlertCircle } from 'lucide-react'

interface AlertProps {
  message: string
  type: string
}

export default function Alert({ message, type }: AlertProps) {
  const alertType = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div
      className={`rounded-md flex items-center justify-center w-full h-12 ${alertType()}`}
    >
      <AlertCircle className="w-6 h-6 mr-2 text-white" />
      <span className="text-white">{message}</span>
    </div>
  )
}
