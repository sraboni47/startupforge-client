"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import OpportunityCard from "./OpportunityCard";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [workType, setWorkType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/opportunities");

      console.log("API Response:", res.data);

      if (Array.isArray(res.data)) {
        setOpportunities(res.data);
      } else {
        setOpportunities([]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredOpportunities = useMemo(() => {
    console.log("Opportunities:", opportunities);

    return opportunities.filter((job) => {
      const roleTitle = String(job?.roleTitle || "").toLowerCase();
      const type = String(job?.workType || "");

      const matchSearch = roleTitle.includes(search.toLowerCase());

      const matchWorkType = workType === "All" || type === workType;

      return matchSearch && matchWorkType;
    });
  }, [opportunities, search, workType]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-bold">
            Browse <span className="text-violet-600">Opportunities</span>
          </h1>

          <p className="text-gray-500 mt-4 text-xl">
            {filteredOpportunities.length} opportunities available
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl border p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Filters</h2>

            <input
              type="text"
              placeholder="Search role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mb-8"
            />

            <h3 className="uppercase text-gray-500 text-sm font-bold mb-4">
              Work Type
            </h3>

            <div className="space-y-3">
              {["All", "Remote", "Hybrid", "Onsite"].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={item}
                    checked={workType === item}
                    onChange={(e) => setWorkType(e.target.value)}
                  />

                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            {filteredOpportunities.length === 0 ? (
              <div className="bg-white rounded-2xl border p-10 text-center">
                <h2 className="text-2xl font-bold">No Opportunities Found</h2>

                <p className="text-gray-500 mt-3">
                  Try another search or add a new opportunity.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredOpportunities.map((job) => (
                  <OpportunityCard key={job._id} opportunity={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
