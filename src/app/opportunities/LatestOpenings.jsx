"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FiGlobe, FiClock } from "react-icons/fi";

export default function LatestOpenings() {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axios.get("https://startupforge-server-5pdk.vercel.app/opportunities");
        setLatest(res.data.slice(0, 6));
      } catch (error) {
        console.error(error);
      }
    };

    fetchLatest();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[5px] text-violet-600 font-semibold text-sm">
            Opportunities
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Latest <span className="text-violet-600">Openings</span>
          </h2>

          <p className="text-gray-500 mt-5 text-lg">
            Join exciting startups and make your mark on the future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {latest.map((job) => (
            <Link key={job._id} href="/opportunities">
              <div className="border rounded-3xl p-7 bg-white hover:shadow-xl transition duration-300 cursor-pointer h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold">{job.title}</h3>

                    <p className="text-violet-600 mt-2">
                      {job.company}
                    </p>
                  </div>

                  <span className="text-sm px-4 py-2 rounded-full bg-orange-100 text-orange-600">
                    {job.deadline}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {Array.isArray(job.skills) &&
                    job.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                </div>

                <div className="flex items-center gap-5 mt-7 text-gray-500">
                  <div className="flex items-center gap-2">
                    <FiGlobe />
                    <span>{job.workType}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiClock />
                    <span>{job.employment}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link href="/opportunities">
            <button className="border border-violet-300 text-violet-600 px-10 py-4 rounded-xl hover:bg-violet-600 hover:text-white transition font-semibold">
              View All Opportunities →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}