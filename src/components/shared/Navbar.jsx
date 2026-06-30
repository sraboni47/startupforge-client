"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

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
              Startup<span className="text-violet-600">Nexus</span>
            </h1>
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/">Home</Link>
            <Link href="/startup">Browse Startups</Link>
            <Link href="/opportunities">Opportunities</Link>

            {session?.user && (
              <Link href="/dashboard">Dashboard</Link>
            )}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isPending ? null : session?.user ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-lg">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="hidden md:block">
                    <p className="font-semibold">
                      {session.user.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="border px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="border px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
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