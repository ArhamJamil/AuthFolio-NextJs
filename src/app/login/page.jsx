"use client";

import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { useToast } from "../components/ui/use-toast";
import axios from "axios";
import Loading from "../loading";
import Link from "next/link";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    Cpassword: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.Cpassword.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user.email, user.password, user.Cpassword]);

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const onAccountLogin = async (e) => {
    e.preventDefault();
    if (user.password !== user.Cpassword) {
      toast({
        title: "Password Mismatch",
        description: "Your password does not match confirm password",
        status: "error",
        duration: 2000,
      });
      return;
    }

    setLoading(true);

    try {
      let loginData = { email: user.email, password: user.password };
      const response = await axios.post("/api/users/login", loginData);
      // console.log("Login response:", response.data);
      
      if (response.data.status) {
        const userData = await axios.get("/api/users/me");
        // console.log("User data:", userData.data);
        
        toast({
          title: "Account Login",
          description: "LoggedIn successfully.",
          status: "success",
          duration: 2000,
        });
        router.push(`/profile/${(userData.data.data.url).substr(0, 30)}`);
      } else {
        toast({
          title: "Invalid Credentials",
          description: "Account does not exist",
          status: "error",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error during account Login:", error.message);
      toast({
        title: "Error",
        description: "Something went wrong.",
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <Card className="w-[300px] sm:w-[350px] md:w-[450px] lg:w-[450px]">
          <CardHeader className=" border-b mb-8 ">
            <CardTitle className="scroll-m-20 text-2xl  font-extrabold tracking-tight lg:text-4xl">
              Sign In
            </CardTitle>
            <CardDescription>
              Enter your email below to sign in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onAccountLogin}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    id="email"
                    placeholder="Enter your email"
                    value={user.email}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={user.password}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Cpassword">Confirm Password</Label>
                  <Input
                    onChange={(e) =>
                      setUser({ ...user, Cpassword: e.target.value })
                    }
                    type="password"
                    id="Cpassword"
                    placeholder="Confirm your password"
                    value={user.Cpassword}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col justify-around ">
            <Button
              disabled={buttonDisabled}
              type="submit"
              onClick={onAccountLogin}
              className="w-full mt-3 hover:bg-slate-600"
            >
              Sign In
            </Button>
            <Link href={"/signup"} className='pt-4 '>Don't have an account? Register</Link>
          </CardFooter>
        </Card>
        {isLoading && <Loading />}
      </div>
    </>
  );
};

export default Login;
