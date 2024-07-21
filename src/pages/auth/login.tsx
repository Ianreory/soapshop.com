import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { userLogin } from "@/utils/apis/auth";
import { LoginSchema } from "@/utils/types/auth";

export function Alert() {
  return (
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
      <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">Danger alert!</span> Change a few things up and try submitting again.
      </div>
    </div>
  );
}

function Login() {
  const [body, setBody] = useState<LoginSchema>({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const response = await userLogin(body);
      Cookies.set("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError("Login failed. Please try again."); 
    }
  }

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen ">
        <Card className="w-full max-w-md bg-[#1e293b]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full"
              required
              value={body.email}
              onChange={(e) =>
                setBody({
                  ...body,
                  email: e.target.value,
                })
              }
            />

            <Label className="mt-4">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full"
              required
              value={body.password}
              onChange={(e) =>
                setBody({
                  ...body,
                  password: e.target.value,
                })
              }
            />
            <Button type="submit" className="w-full mt-4 active:bg-black" onClick={() => handleSubmit()}>
              Sign in
            </Button>
          </CardContent>
          <CardFooter>
            <p>
              Dont't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:text-blue-900">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}

export default Login;
