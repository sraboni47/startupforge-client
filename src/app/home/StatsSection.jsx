import {
  FiTrendingUp,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { LuRocket } from "react-icons/lu";

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: <LuRocket size={30} />,
      value: "500+",
      title: "Active Startups",
    },
    {
      id: 2,
      icon: <FiUsers size={30} />,
      value: "2,400+",
      title: "Collaborators",
    },
    {
      id: 3,
      icon: <FiTrendingUp size={30} />,
      value: "$12M+",
      title: "Funding Raised",
    },
    {
      id: 4,
      icon: <FiStar size={30} />,
      value: "98%",
      title: "Success Rate",
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center text-violet-600 mb-5">
                {item.icon}
              </div>

              <h2 className="text-5xl font-bold text-slate-900">
                {item.value}
              </h2>

              <p className="text-slate-500 mt-4 text-lg">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;