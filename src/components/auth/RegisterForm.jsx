"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import {
  FiUser,
  FiMail,
  FiLock,
  FiImage,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const RegisterForm = () => {
  const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

  const { data } = await axios.post(url, formData);

  return data.data.url;
};
  const router = useRouter();

  const [role, setRole] = useState("collaborator");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "https://startupforge-client-gamma.vercel.app",
      });
    } catch (error) {
      console.error(error);
      toast.error("Google Sign In Failed");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

    
const { error,data } = await authClient.signUp.email({
  name,
  email,
  password,
});

if (error) {
  console.log("ERROR =", error);
  toast.error(error.message || "Registration failed");
  return;
}
console.log("DATA =", data);
let imageUrl = "";

if (image) {
  imageUrl = await uploadImage(image);
}

await axios.put(
  "https://startupforge-server-5pdk.vercel.app/users",
  {
    name,
    email,
    image: imageUrl,
    role,
    skills: "",
    bio: "",
  }
);

toast.success("Account created successfully!");

router.push("/login");


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
        <div className="mb-4 flex items-center gap-3 ">
          <Image
            src="/logo1.png"
            alt="StartupForge Logo"
            width={90}
            height={80}
            className="object-contain"
          />

          <h2 className="text-3xl font-bold tracking-tight -ml-7">
            Startup
            <span className="text-violet-600">Forge</span>
          </h2>
        </div>

        <h1 className="text-center text-5xl font-bold leading-tight">
          Create your account
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Join thousands of founders and collaborators
        </p>
      </div>

      {/* Google Button */}

      <button
        type="button"
        onClick={handleGoogleSignUp}
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

      {/* Role */}

      <div>
        <p className="mb-3 text-sm font-semibold">I am a...</p>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("founder")}
            className={`h-12 rounded-2xl border text-sm font-semibold transition ${
              role === "founder"
                ? "border-violet-600 bg-violet-600 text-white"
                : "border-violet-300 bg-white text-violet-600 hover:bg-violet-50"
            }`}
          >
            Founder
          </button>

          <button
            type="button"
            onClick={() => setRole("collaborator")}
            className={`h-12 rounded-2xl border text-sm font-semibold transition ${
              role === "collaborator"
                ? "border-violet-600 bg-violet-600 text-white"
                : "border-violet-300 bg-white text-violet-600 hover:bg-violet-50"
            }`}
          >
            Collaborator
          </button>
        </div>
      </div>

      {/* Form */}

      <form onSubmit={handleRegister} className="mt-7 space-y-5">
        {/* Full Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>

          <div className="flex h-14 items-center rounded-2xl border border-gray-200 px-4 transition focus-within:border-violet-500">
            <FiUser className="mr-3 text-lg text-gray-400" />

            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-full w-full bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

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

        {/* Profile Image */}

        <div className="flex items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-full border border-gray-300">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                <FiImage size={22} />
              </div>
            )}
          </div>

          <label className="flex h-14 flex-1 cursor-pointer items-center justify-center rounded-2xl border border-violet-300 text-violet-600 hover:bg-violet-50">
            Upload Profile Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
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

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-green-600">
            <span>✓ 6+ chars</span>
            <span>✓ Uppercase</span>
            <span>✓ Lowercase</span>
          </div>
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Confirm Password
          </label>

          <div className="flex h-14 items-center rounded-2xl border border-gray-200 px-4 transition focus-within:border-violet-500">
            <FiLock className="mr-3 text-lg text-gray-400" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-full w-full bg-transparent outline-none"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
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
          {loading ? "Creating Account..." : "Create Account 🚀"}
        </button>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?
          <a
            href="/login"
            className="ml-2 font-semibold text-violet-600 hover:underline"
          >
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
