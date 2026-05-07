import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import authService from "../../services/authService";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/Card";
 
const Login = () => {
  const navigate = useNavigate();  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
 
    try {
      const response = await authService.userLogin({ email, password });
      const roles = response.data.roles;        
      const role = Array.isArray(roles) ? roles[0] : roles;
 
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("roles", JSON.stringify(Array.isArray(roles) ? roles : [roles]));
      localStorage.setItem("userEmail", email);
      // localStorage.setItem("userId", response.data.userId);
 
      const tokenPayload = JSON.parse(atob(response.data.token.split('.')[1]));
    localStorage.setItem("userId", tokenPayload.userId);
 
      toast.success("Logged in successfully!");
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      const msg = "Invalid email or password. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-8">
        <CardHeader className="p-0 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Enter your email to sign in to your account</CardDescription>
        </CardHeader>
 
        <CardContent className="p-0">
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md mb-4">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
 
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>
 
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>
 
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
 
        <CardFooter className="p-0 justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="underline underline-offset-4 hover:text-primary transition-colors">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
 
export default Login;
 
 