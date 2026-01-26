import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, BookOpen, UserPlus } from "lucide-react";
import { useState } from "react";
import { signup } from "@/api/api";
import { useAuth } from "@/context/auth-context";

interface SignupFormValues {
  username: string;
  password: string;
}

const SignupPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const onSubmit = async (data: SignupFormValues) => {
    setError("");
    setIsLoading(true);
    try {
      await signup(data);
      await login(data.username, data.password);
      // login will redirect
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">ReadLand</h1>
          </Link>
          <p className="mt-2 text-muted-foreground">
            Your Tech Magazine Platform
          </p>
        </div>

        {/* Signup Card */}
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">Create Account</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Sign up to get started
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium leading-none"
                >
                  Username
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    autoComplete="username"
                    className="pl-10"
                    disabled={isLoading}
                    {...register("username", {
                      required: "Username is required",
                      minLength: { value: 3, message: "At least 3 characters" },
                    })}
                    aria-invalid={!!errors.username}
                  />
                </div>
                {errors.username && (
                  <span className="text-xs text-destructive">
                    {errors.username.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    className="pl-10"
                    disabled={isLoading}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 3, message: "At least 3 characters" },
                    })}
                    aria-invalid={!!errors.password}
                  />
                </div>
                {errors.password && (
                  <span className="text-xs text-destructive">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
