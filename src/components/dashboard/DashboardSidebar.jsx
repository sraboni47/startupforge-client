"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiBriefcase,
  FiPlusCircle,
  FiList,
  FiFileText,
  FiUser,
} from "react-icons/fi";
import LogoutButton from "./LogoutButton";

const menuItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: FiGrid,
  },
  {
    title: "My Startup",
    href: "/dashboard/my-startup",
    icon: FiBriefcase,
  },
  {
    title: "Add Opportunity",
    href: "/dashboard/add-opportunity",
    icon: FiPlusCircle,
  },
  {
    title: "Manage Opportunities",
    href: "/dashboard/manage-opportunities",
    icon: FiList,
  },
  {
    title: "Applications",
    href: "/dashboard/applications",
    icon: FiFileText,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: FiUser,
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-white border-r flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="border-b px-6 py-6">
          <Link href="/">
            <h1 className="text-3xl font-bold">
              Startup
              <span className="text-violet-600">Forge</span>
            </h1>
          </Link>
        </div>

        {/* User */}
        <div className="border-b px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-violet-600 text-white flex items-center justify-center text-xl font-bold">
              S
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Sraboni Sarkar
              </h3>

              <span className="inline-block mt-1 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm">
                Founder
              </span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="px-4 py-5 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? "bg-violet-100 text-violet-700 font-semibold"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Icon size={20} />

                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t p-4">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default DashboardSidebar;