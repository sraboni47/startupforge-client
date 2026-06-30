"use client";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "https://startupforge-client-gamma.vercel.app",
      });
    } catch (error) {
      console.error(error);
      toast.error("Google Login Failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        return;
      }

      toast.success("Login Successful");

      const { data: user } = await axios.get(
        `https://startupforge-server-5pdk.vercel.app/users/${email}`,
      );

      if (user.role === "founder") {
        router.push("/dashboard");
      } else {
        router.push("/dashboard/my-applications");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-[32px] border border-gray-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      {/* Logo */}

      <div className="mb-8 flex flex-col items-center">
        <div className="mb-4 flex items-center gap-3">
          <Image
            src="/logo1.png"
            alt="StartupForge"
            width={60}
            height={60}
            className="object-contain"
          />

          <h2 className="text-3xl font-bold tracking-tight">
            Startup
            <span className="text-violet-600">Forge</span>
          </h2>
        </div>

        <h1 className="text-center text-5xl font-bold leading-tight">
          Welcome Back
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Login to your StartupForge account
        </p>
      </div>

      {/* Google Login */}

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white text-[15px] font-semibold transition hover:bg-gray-50"
      >
        <FcGoogle className="text-2xl" />
        Continue with Google
      </button>

      {/* Divider */}

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />

        <span className="text-sm text-gray-400">or</span>

        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Form */}

      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <div className="flex h-14 items-center rounded-2xl border border-gray-200 px-4 transition focus-within:border-violet-500">
            <FiMail className="mr-3 text-lg text-gray-400" />

            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-full w-full bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="flex h-14 items-center rounded-2xl border border-gray-200 px-4 transition focus-within:border-violet-500">
            <FiLock className="mr-3 text-lg text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-full w-full bg-transparent outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff className="text-gray-500" />
              ) : (
                <FiEye className="text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 h-14 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?
        <Link
          href="/register"
          className="ml-2 font-semibold text-violet-600 hover:underline"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
