import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";

import { loginSchema, type LoginFormData } from "../validations/login.schema";

import { useLogin } from "../hooks/useLogin";

export default function OrganizationLoginPage() {
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginMutation.mutateAsync({
      email: data.email,
      password: data.password,
      loginType: "organization",
    });

    navigate("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF6F0] px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#4B3932]">Welcome Back</h1>

          <p className="mt-3 text-stone-500">Sign in to your organization account</p>
        </div>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AuthInput
            type="email"
            label="Organization Email"
            placeholder="admin@company.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-stone-600">
              <input type="checkbox" className="h-4 w-4 accent-[#4B3932]" />
              Remember this organization
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-[#4B3932] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="
              w-full
              rounded-xl
              bg-[#4B3932]
              py-4
              text-base
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#3B2E29]
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loginMutation.isPending ? "Signing In..." : "Sign In"}
          </button>

          <div className="border-t border-[#E7DDD3]" />

          <div className="text-center text-sm text-stone-500">
            Not an organization admin?
            <Link
              to="/user/login"
              className="
                ml-2
                font-semibold
                text-[#4B3932]
                hover:underline
              "
            >
              User Login
            </Link>
          </div>

          <div className="text-center text-sm text-stone-500">
            Don't have an organization?
            <Link
              to="/organization/register"
              className="
                ml-2
                font-semibold
                text-[#4B3932]
                hover:underline
              "
            >
              Register Organization
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
