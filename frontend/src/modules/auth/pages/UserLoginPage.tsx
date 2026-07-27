import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";

import {  loginSchema,  type LoginFormData,} from "../validations/login.schema";

import { useLogin } from "../hooks/useLogin";

export default function UserLoginPage() {
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const {    register,    handleSubmit,    formState: { errors },  } = useForm<LoginFormData>({
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
      loginType: "user",
    });

    navigate("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF6F0] px-4 py-8">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        {/* Header */}

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-[#4B3932]">
            User Console Login
          </h1>

          <p className="mt-3 text-stone-500">
            Access your incident channels and war rooms
          </p>

        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <AuthInput
            type="email"
            label="Work Email"
            placeholder="engineer@company.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex justify-end">

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-[#4B3932] hover:underline"
            >
              Forgot Password?
            </Link>

          </div>
                    {/* Login Button */}

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
            {loginMutation.isPending
              ? "Signing In..."
              : "Sign In"}
          </button>

          {/* Divider */}

          <div className="border-t border-[#E7DDD3]" />

          {/* Register Organization */}

          <div className="text-center text-sm text-stone-500">
            Need to register your organization?

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

          {/* Organization Login */}

          <div className="text-center text-sm text-stone-500">
            Organization Admin?

            <Link
              to="/organization/login"
              className="
                ml-2
                font-semibold
                text-[#4B3932]
                hover:underline
              "
            >
              Login to Organization
            </Link>
          </div>

        </form>

      </div>

    </main>
  );
}