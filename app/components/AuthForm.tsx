import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface AuthFormProps {
  onLogin: () => void
}

export default function AuthForm({ onLogin }: AuthFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (username === 'admin' && password === 'password') {
      onLogin()
    } else {
      alert('Credenciales incorrectas')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <form onSubmit={handleSubmit} className="bg-card text-card-foreground shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Iniciar sesión</h2>
        <div className="mb-4">
          <Label htmlFor="username">Usuario</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            required
            className="bg-background text-foreground"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
            className="bg-background text-foreground"
          />
        </div>
        <Button type="submit" className="w-full">Iniciar sesión</Button>
      </form>
    </div>
  )
}