export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <input placeholder="username" className="border p-2" />
      <input type="password" placeholder="password" className="border p-2" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </div>
  )
}
