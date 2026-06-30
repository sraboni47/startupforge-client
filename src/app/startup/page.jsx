"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiFilter } from "react-icons/fi";
import startups from "@/data/startups";

const StartupPage = () => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All Industries");

  const filteredStartups = startups.filter((startup) => {
    const matchSearch =
      startup.name.toLowerCase().includes(search.toLowerCase()) ||
      startup.description.toLowerCase().includes(search.toLowerCase());

    const matchIndustry =
      industry === "All Industries"
        ? true
        : startup.industry === industry;

    return matchSearch && matchIndustry;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          Browse <span className="text-violet-600">Startups</span>
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Discover innovative startups looking for talented collaborators.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="grid md:grid-cols-3 gap-4 mt-12">
        <div className="relative md:col-span-2">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search startups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-14 border rounded-xl pl-12 pr-4 outline-none focus:border-violet-500"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="flex-1 border rounded-xl px-4 outline-none"
          >
            <option>All Industries</option>
            <option>Technology</option>
            <option>FinTech</option>
            <option>HealthTech</option>
            <option>EdTech</option>
            <option>E-commerce</option>
            <option>SaaS</option>
            <option>AI</option>
            <option>AI/ML</option>
            <option>ClimateTech</option>
            <option>Green Tech</option>
            <option>Other</option>
          </select>

          <button className="bg-violet-600 text-white px-5 rounded-xl flex items-center justify-center">
            <FiFilter size={20} />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {filteredStartups.map((startup) => (
          <Link
            key={startup.id}
            href={`/startup/${startup.id}`}
          >
            <div className="bg-white border rounded-3xl p-6 hover:shadow-xl transition duration-300 h-full cursor-pointer">
              <img
                src={startup.image}
                alt={startup.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />

              <h2 className="text-2xl font-bold mt-5">
                {startup.name}
              </h2>

              <p className="text-gray-500 mt-1">
                {startup.email}
              </p>

              <p className="text-gray-600 mt-5 line-clamp-3">
                {startup.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-4 py-1 rounded-full bg-violet-100 text-violet-600 text-sm">
                  {startup.industry}
                </span>

                <span className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                  {startup.stage}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredStartups.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">
            No Startup Found
          </h2>

          <p className="text-gray-500 mt-3">
            Try another search keyword or industry.
          </p>
        </div>
      )}
    </section>
  );
};

export default StartupPage;