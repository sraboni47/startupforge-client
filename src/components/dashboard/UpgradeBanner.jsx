import { FiZap } from "react-icons/fi";

const UpgradeBanner = () => {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-purple-600 p-8 text-white">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 ">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FiZap className="text-yellow-300 text-2xl" />

            <span className="font-semibold text-yellow-300">Premium Plan</span>
          </div>

          <h2 className="text-3xl font-bold">Upgrade Your Plan</h2>

          <p className="mt-3 text-violet-100 max-w-2xl">
            Unlock unlimited opportunities, premium analytics, featured
            listings, and advanced startup management tools.
          </p>
        </div>

        <button className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default UpgradeBanner;
