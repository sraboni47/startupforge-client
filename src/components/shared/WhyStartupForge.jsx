import {
  FiZap,
  FiCheckCircle,
  FiGlobe,
  FiBriefcase,
} from "react-icons/fi";

const features = [
  {
    id: 1,
    icon: <FiZap size={34} />,
    title: "Lightning Fast",
    description:
      "Post opportunities and receive applications within hours, not weeks.",
  },
  {
    id: 2,
    icon: <FiCheckCircle size={34} />,
    title: "Verified Profiles",
    description:
      "Every collaborator is verified with portfolio links and skill endorsements.",
  },
  {
    id: 3,
    icon: <FiGlobe size={34} />,
    title: "Global Reach",
    description:
      "Connect with talent from over 80 countries around the world.",
  },
  {
    id: 4,
    icon: <FiBriefcase size={34} />,
    title: "All Roles",
    description:
      "Developers, designers, marketers, and 50+ other professional roles.",
  },
];

const WhyStartupForge = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why <span className="text-violet-600">StartupForge?</span>
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Everything you need to find your perfect startup match.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-violet-50 border border-violet-100 text-violet-600">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-500 leading-8">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStartupForge;