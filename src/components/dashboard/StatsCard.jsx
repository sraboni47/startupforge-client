const StatsCard = ({ title, value, subtitle, icon: Icon, iconBg }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-5">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBg}`}
        >
        <Icon className="text-2xl" />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-gray-900">
            {value}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {title}
          </p>

          <p className="text-gray-400 text-sm">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;