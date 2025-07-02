"use client";
import { useUser } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";
import { Clock, Calendar, BarChart, Users } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/meetings", label: "Meetings", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
];

const layout = ({ children }) => {
  const pathname = usePathname();
  const isloaded = useUser();

  return (
    <div>
      {!isloaded && <BarLoader width={"100%"} color="#36d7b7" />}

      <div className="flex h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-gray-800 border-r border-gray-700">
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-4 hover:bg-gray-700 transition ${
                      pathname === item.href ? "bg-gray-700" : ""
                    }`}
                  >
                    <item.icon className="w-6 h-6 mr-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              {navItems.find((item) => item.href === pathname)?.label ||
                "Dashboard"}
            </h2>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;
