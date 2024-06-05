import React, { useState, useEffect } from 'react'
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from "../components/ui/use-toast" // Ensure correct import path



const SignUp = () => {

  const [user, setuser] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [buttonDisabled, setbuttonDisabled] = useState(true)

  useEffect(() => {
    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setbuttonDisabled(false)
    }else{
      setbuttonDisabled(true)
    }
  }, [user.username, user.email, user.password])



  const router = useRouter()

  const [isloading, setloading] = useState(false)
  const { toast } = useToast()

  const onCreateAccount = async (e) => {
    e.preventDefault()
    setloading(true)
    try {
      const response = await axios.post("api/users/signup", user)
      console.log(response.data)
      if (response.data.status === 200) {
        setTimeout(() => {
          router.push("/login")
        }, 1500)
      } else if (response.data.status === 400) {
        toast({
          title: "Invalid Credentials",
          description: "User already exists",
          status: "error",
          duration: 5000,
        })
      }
    } catch (error) {
      console.log(error.message)
      toast({
        title: "Error",
        description: "Something went wrong.",
      })


    } finally {
      setloading(false)
    }
  }

  if (isloading) {
    // Optionally render a loading spinner or message here
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen w-screen'>
        <Card className="w-[450px]">
          <CardHeader className=' border-b mb-6'>
            <CardTitle className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl'>Create an account</CardTitle>
            <CardDescription>Enter your email below to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onCreateAccount}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input onChange={(e) => setuser({ ...user, username: e.target.value })} id="username" placeholder="Enter your username" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input onChange={(e) => setuser({ ...user, email: e.target.value })} id="email" placeholder="Enter your email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input onChange={(e) => setuser({ ...user, password: e.target.value })} type='password' id="password" placeholder="Enter your password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col justify-around">
            {buttonDisabled? <Button disabled className='w-full mt-3 hover:bg-slate-600'>Create Account</Button>:<Button onClick={onCreateAccount}   className='w-full mt-3 hover:bg-slate-600'>Create Account</Button>}
            
            <Link href={"/login"} className='pt-4'>Already have an account? sign in</Link>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default SignUp
