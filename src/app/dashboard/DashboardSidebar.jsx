"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

import {
  FiGrid,
  FiBriefcase,
  FiPlusCircle,
  FiLayers,
  FiFileText,
  FiUser,
} from "react-icons/fi";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();

  const [role, setRole] = useState("");

  useEffect(() => {
    const getUser = async () => {
      if (!session?.user?.email) return;

      try {
        const { data } = await axios.get(`https://startupforge-server-5pdk.vercel.app/users/${session.user.email}`);

        setRole(data.role);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [session]);

  let menus = [];

  if (role === "Founder" || role === "founder") {
    menus = [
      {
        name: "Overview",
        href: "/dashboard",
        icon: <FiGrid />,
      },
      {
        name: "My Startup",
        href: "/dashboard/my-startup",
        icon: <FiBriefcase />,
      },
      {
        name: "Add Opportunity",
        href: "/dashboard/add-opportunity",
        icon: <FiPlusCircle />,
      },
      {
        name: "Manage Opportunities",
        href: "/dashboard/manage-opportunities",
        icon: <FiLayers />,
      },
      {
        name: "Applications",
        href: "/dashboard/applications",
        icon: <FiFileText />,
      },
      {
        name: "Profile",
        href: "/dashboard/profile",
        icon: <FiUser />,
      },
    ];
  } else {
    menus = [
      {
        name: "Overview",
        href: "/dashboard",
        icon: <FiGrid />,
      },
      {
        name: "My Applications",
        href: "/dashboard/my-applications",
        icon: <FiFileText />,
      },
      {
        name: "Profile",
        href: "/dashboard/profile",
        icon: <FiUser />,
      },
    ];
  }

  return (
    <aside className="w-72 min-h-screen border-r bg-white">
      <div className="p-8 border-b">
        <h1 className="text-3xl font-bold">
          Startup
          <span className="text-violet-600">Forge</span>
        </h1>
      </div>

      <nav className="p-5 space-y-2">
        {menus.map((menu) => (
          <Link
            key={`${menu.name}-${menu.href}`}
            href={menu.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              pathname === menu.href
                ? "bg-violet-100 text-violet-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            {menu.icon}
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
