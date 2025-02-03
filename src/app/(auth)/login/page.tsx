"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Mail, Lock } from "lucide-react";
import { useLoginMutation } from "@/redux/features/authSlice/authApi";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("12345678");

  const [loginFn, { isLoading }] = useLoginMutation();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempted with:", email, password);
    try {
      const response = await loginFn({ email, password }).unwrap();
      console.log(response);
      //   {
      //     "success": true,
      //     "statusCode": 200,
      //     "message": "User logged in successfully",
      //     "data": {
      //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OThiM2IyYzU0NTdiZDgzNmQ0ZDExNCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlNVUEVSX0FETUlOIiwiaWF0IjoxNzM4MDcxNzMyLCJleHAiOjE3MzgxNTgxMzJ9.iLKm8ZN_t4gipDAHOiGetq5eZAJIUitkq1IpvXSNFw4"
      //     }
      // }

      if (response.success) {
        // Redirect to dashboard
        console.log("User logged in successfully");
        localStorage.setItem("accessToken", response.data.token);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl text-center text-blue-800">Doctor&apos;s Portal</CardTitle>
          <CardDescription className="text-center">Login to manage your appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
