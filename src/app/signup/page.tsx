import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from "../components/ui/use-toast";
import Loading from '../loading';

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user.username, user.email, user.password]);

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const onCreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data); // Log the response to debug
      if (response.data.success) {
        toast({
          title: "Account Created",
          description: "Your account has been created successfully.",
          status: "success",
          duration: 5000,
        });
        router.push("/login");
      } else {
        toast({
          title: "Error",
          description: response.data.message || "An error occurred.",
          status: "error",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error during account creation:", error.message);
      toast({
        title: "Error",
        description: "Something went wrong.",
        status: "error",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <Card className="w-[450px]">
        <CardHeader className='border-b mb-6'>
          <CardTitle className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl'>Create an account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onCreateAccount}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input onChange={(e) => setUser({ ...user, username: e.target.value })} id="username" placeholder="Enter your username" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input onChange={(e) => setUser({ ...user, email: e.target.value })} id="email" placeholder="Enter your email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input onChange={(e) => setUser({ ...user, password: e.target.value })} type='password' id="password" placeholder="Enter your password" />
              </div>
            </div>
            <Button type="submit" disabled={buttonDisabled} className='w-full mt-3 hover:bg-slate-600'>Create Account</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-around">
          <Link href={"/login"} className='pt-4'>Already have an account? Sign in</Link>
        </CardFooter>
      </Card>
      {isLoading && <Loading />}
    </div>
  );
};

export default SignUp;
