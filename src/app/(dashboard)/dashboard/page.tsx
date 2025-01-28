import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Calendar } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl text-center text-blue-800">Welcome, Doctor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">Thank you for logging in. We&apos;re glad to have you back.</p>
          <div className="flex justify-center">
            <Link href={"/dashboard/all-appointments"}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="mr-2 h-4 w-4" /> View Appointments
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
