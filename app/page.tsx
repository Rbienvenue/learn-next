"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import React, { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"



export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
    async function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
      
      event.preventDefault()
      setIsLoading(true)
      const formdata = new FormData(event.target)
      const data = Object.fromEntries(formdata.entries())
      const passMatch = data.password === data.cPassword

      if(!passMatch){
        toast.warning("Passwords don't match")
        setIsLoading(false)
        return
      }
      
      const res = await fetch("api/auth/signup", {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        toast.error("signup failed")
        setIsLoading(false)
        return
      }
      setIsLoading(false)
      toast.success("signup successfull")
      router.push('/login')
      
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create account</CardTitle>
              <CardDescription className="text-center">Enter your information to create a new account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" name="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" name="lastName" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Create a password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input id="confirmPassword" name="cPassword" type="password" placeholder="Confirm your password" required />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="#" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">{isLoading? <Loader2 className="animate-spin" /> : 'Signup'}</Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>

        </form>
      </div>
    </div>
  )
}
