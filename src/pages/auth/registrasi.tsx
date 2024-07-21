import Layout from "@/components/layout";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RegisterSchema } from "@/utils/types/auth";
import { userRegistrasi } from "@/utils/apis/auth";
import { Button } from "@/components/ui/button";

export default function Register() {
  const navigate = useNavigate();
  const [body, setBody] = useState<RegisterSchema>({
    username: "",
    email: "",
    password: "",
    address: "",
    phone_number: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    try {
      const response = await userRegistrasi(body);
      navigate("/");
      e.preventDefault();
      console.log(response);
    } catch (error) {
      setError("Registrasi failed. Please try again.");
      alert(error);
    }
  }

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen ">
        <Card className="w-full max-w-md bg-[#1e293b]">
          <CardHeader>
            <CardTitle>Registrasi</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" value={body.username} onChange={(e) => setBody({ ...body, username: e.target.value })} />

            <Label htmlFor="email">Email</Label>
            <Input id="email" value={body.email} onChange={(e) => setBody({ ...body, email: e.target.value })} />

            <Label htmlFor="password">Password</Label>
            <Input id="password" value={body.password} onChange={(e) => setBody({ ...body, password: e.target.value })} />

            <Label htmlFor="address">Address</Label>
            <Input id="address" value={body.address} onChange={(e) => setBody({ ...body, address: e.target.value })} />

            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input id="phoneNumber" value={body.phone_number} onChange={(e) => setBody({ ...body, phone_number: e.target.value })} />
            <Button type="submit" className="w-full mt-4 active:bg-black" onClick={() => handleSubmit()}>
              submit
            </Button>
          </CardContent>
          <CardFooter>
            <p>
              already have an account?{" "}
              <Link to="/login" className="hover:decoration-gray-600">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
