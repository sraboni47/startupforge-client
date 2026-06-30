import { FiMessageSquare } from "react-icons/fi";

const stories = [
  {
    id: 1,
    quote:
      "StartupForge helped me find my CTO in just 2 weeks. The quality of applicants was incredible.",
    name: "Sarah Chen",
    role: "Founder, NexusAI",
    avatar: "S",
  },
  {
    id: 2,
    quote:
      "I joined three amazing startups through this platform. My career trajectory completely changed.",
    name: "Marcus Johnson",
    role: "Full-Stack Dev",
    avatar: "M",
  },
  {
    id: 3,
    quote:
      "The best platform for building a team from scratch. Simple, powerful, and effective.",
    name: "Priya Patel",
    role: "Founder, GreenFlow",
    avatar: "P",
  },
];

const SuccessStories = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Success <span className="text-violet-600">Stories</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300"
            >
              {/* Quote Icon */}
              <FiMessageSquare
                size={34}
                className="text-violet-400 mb-6"
              />

              {/* Quote */}
              <p className="text-gray-600 italic leading-8 min-h-[130px]">
                “{story.quote}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4 mt-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-700 to-purple-500 text-white font-bold flex items-center justify-center">
                  {story.avatar}
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {story.name}
                  </h3>

                  <p className="text-gray-500">
                    {story.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;