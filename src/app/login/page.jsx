
import React from 'react'
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


const Login = () => {
  return (
    <>
      <div className='flex justify-center items-center h-screen w-screen'>
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className='text-xl'>Sign In</CardTitle>
            <CardDescription>Enter your email below for sign in</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input type='password' id="password" placeholder="Enter your password" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Cpassword">Confirm Password</Label>
                  <Input type='password' id="Cpassword" placeholder="Enter your password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-around">

            <Button className='w-full mt-3 hover:bg-slate-600'>Sign In</Button>
          </CardFooter>
        </Card>
      </div>

    </>

  )
}

export default Login
