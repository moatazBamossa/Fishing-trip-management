
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldResetPassword, setShouldResetPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login - in a real app you'd authenticate with an API
    // For demo purposes, show reset password form after login
    toast({
      title: "Login successful",
      description: "Please reset your password to continue.",
    });
    
    setShouldResetPassword(true);
  };

  if (shouldResetPassword) {
    return <ResetPasswordForm />;
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Log In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => alert("Password reset not implemented in demo")}>
            Forgot password?
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Login;
