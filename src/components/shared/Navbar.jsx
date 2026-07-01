"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [profileImage, setProfileImage] = useState("/user.png");

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.email) return;

      try {
        const { data } = await axios.get(
          `https://startupforge-server-5pdk.vercel.app/users/${session.user.email}`
        );

        if (data?.image) {
          setProfileImage(data.image);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [session]);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo1.png"
              alt="Logo"
              width={70}
              height={70}
              className="object-contain -mr-2"
            />

            <h1 className="text-3xl font-bold">
              Startup
              <span className="text-violet-600">Nexus</span>
            </h1>
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/">Home</Link>
            <Link href="/startup">Browse Startups</Link>
            <Link href="/opportunities">Opportunities</Link>

            {session?.user && <Link href="/dashboard">Dashboard</Link>}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isPending ? (
              <p className="text-sm">Loading...</p>
            ) : session?.user ? (
              <>
                <div className="flex items-center gap-3">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={42}
                    height={42}
                    className="rounded-full border object-cover"
                  />

                  <div className="hidden md:block">
                    <p className="font-semibold">{session.user.name}</p>

                    <p className="text-xs text-gray-500">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;