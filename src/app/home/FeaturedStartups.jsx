"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FeaturedStartups = () => {
const [currentPage, setCurrentPage] = useState(1);
const ITEMS_PER_PAGE = 6;

const startups = [
  {
    id: 1,
    name: "NovaTech AI",
    email: "founder@novatech.com",
    description:
      "Building AI-powered automation tools to help modern businesses scale faster.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500",
    industry: "AI",
    stage: "Seed",
  },
  {
    id: 2,
    name: "FinFlow",
    email: "team@finflow.com",
    description:
      "Next generation financial planning and investment management platform.",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=500",
    industry: "FinTech",
    stage: "Series A",
  },
  {
    id: 3,
    name: "EduSphere",
    email: "hello@edusphere.com",
    description:
      "Creating immersive learning experiences for students around the world.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500",
    industry: "EdTech",
    stage: "Growth",
  },
  {
    id: 4,
    name: "GreenPulse",
    email: "contact@greenpulse.com",
    description:
      "Helping startups and enterprises reduce carbon footprint efficiently.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500",
    industry: "Climate",
    stage: "Idea",
  },
  {
    id: 5,
    name: "CareSync",
    email: "team@caresync.com",
    description:
      "Digital healthcare ecosystem connecting doctors and patients.",
    image:
  "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg",
    industry: "HealthTech",
    stage: "Pre-Seed",
  },
  {
    id: 6,
    name: "CloudNest",
    email: "support@cloudnest.com",
    description:
      "Cloud infrastructure solutions built for modern startups.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
    industry: "SaaS",
    stage: "Seed",
  },

{
  id: 7,
  name: "EcoVolt Energy",
  email: "hello@ecovolt.com",
  image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=300",
  description: "Building smart renewable energy solutions for homes and businesses.",
  industry: "Green Tech",
  stage: "Series A",
},

{
  id: 8,
  name: "MediConnect",
  email: "contact@mediconnect.com",
  image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300",
  description: "Connecting patients with healthcare professionals through telemedicine.",
  industry: "HealthTech",
  stage: "Growth",
},

{
  id: 9,
  name: "ShopWave",
  email: "team@shopwave.com",
  image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=300",
  description: "Helping online stores increase sales with AI-driven recommendations.",
  industry: "E-commerce",
  stage: "Seed",
},

{
  id: 10,
  name: "LearnSphere",
  email: "support@learnsphere.com",
  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300",
  description: "Interactive learning platform designed for modern classrooms.",
  industry: "EdTech",
  stage: "Series A",
},

{
  id: 11,
  name: "SecureNet",
  email: "security@securenet.com",
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300",
  description: "Advanced cybersecurity solutions for startups and enterprises.",
  industry: "Technology",
  stage: "Growth",
},

{
  id: 12,
  name: "FoodFleet",
  email: "hello@foodfleet.com",
  image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300",
  description: "Optimizing food delivery logistics using smart routing systems.",
  industry: "Technology",
  stage: "Seed",
},

{
  id: 13,
  name: "InvestBridge",
  email: "info@investbridge.com",
  image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300",
  description: "Making investment opportunities accessible for emerging founders.",
  industry: "FinTech",
  stage: "Series B",
},

{
  id: 14,
  name: "CloudMatrix",
  email: "team@cloudmatrix.com",
  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300",
  description: "Scalable cloud infrastructure solutions for growing businesses.",
  industry: "SaaS",
  stage: "Growth",
},

{
  id: 15,
  name: "VisionAI Labs",
  email: "contact@visionai.com",
  image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300",
  description: "Computer vision technology powering next-generation automation.",
  industry: "AI/ML",
  stage: "Seed",
},

{
  id: 16,
  name: "TravelNest",
  email: "hello@travelnest.com",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300",
  description: "Personalized travel planning platform for modern explorers.",
  industry: "Other",
  stage: "Idea",
}

];
const totalPages = Math.ceil(
  startups.length / ITEMS_PER_PAGE
);

const startIndex =
  (currentPage - 1) * ITEMS_PER_PAGE;

const currentStartups = startups.slice(
  startIndex,
  startIndex + ITEMS_PER_PAGE
);


  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <span className="uppercase tracking-widest text-violet-600 font-semibold text-sm">
          Discover
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mt-3">
          Featured{" "}
          <span className="text-violet-600">
            Startups
          </span>
        </h2>

        <p className="text-gray-600 mt-4 mb-12 text-lg">
          Explore innovative startups looking for talented collaborators.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentStartups.map((startup) => (
            <div
              key={startup.id}
              className="bg-white border rounded-3xl p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <Image
                  src={startup.image}
                  alt={startup.name}
                  width={60}
                  height={60}
                  className="rounded-2xl object-cover w-[60px] h-[60px]"
                />

                <div>
                  <h3 className="font-bold text-2xl text-slate-900">
                    {startup.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {startup.email}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mt-6 line-clamp-2">
                {startup.description}
              </p>

              <div className="flex gap-3 mt-6 flex-wrap">
                <span className="px-4 py-1 rounded-full text-sm border bg-violet-50 text-violet-600 border-violet-200">
                  {startup.industry}
                </span>

                <span className="px-4 py-1 rounded-full text-sm border bg-slate-100 text-slate-600">
                  {startup.stage}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10 gap-2">
  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`w-10 h-10 rounded-full border ${
        currentPage === index + 1
          ? "bg-violet-600 text-white"
          : "bg-white"
      }`}
    >
      {index + 1}
    </button>
  ))}
</div>

        <div className="flex justify-center mt-12">
          <Link
            href="/startup"
            className="px-8 py-3 border border-violet-300 rounded-xl text-violet-600 hover:bg-violet-600 hover:text-white transition"
          >
            View All Startups →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStartups;