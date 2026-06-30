const ActivityChart = () => {
  const bars = [
    {
      label: "Opportunities",
      height: "h-56",
    },
    {
      label: "Applications",
      height: "h-44",
    },
    {
      label: "Accepted",
      height: "h-20",
    },
  ];

  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Activity Overview
      </h2>

      <div className="mt-10 flex">
        {/* Left Scale */}
        <div className="flex flex-col justify-between h-64 pr-6 text-sm text-gray-400">
          <span>3</span>
          <span>2.25</span>
          <span>1.5</span>
          <span>0.75</span>
          <span>0</span>
        </div>

        {/* Chart */}
        <div className="flex-1 border-l border-b border-gray-200 pl-8">
          <div className="h-64 flex items-end justify-around">
            {bars.map((bar) => (
              <div
                key={bar.label}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-44 ${bar.height} rounded-t-xl bg-gradient-to-t from-violet-700 to-violet-500`}
                ></div>

                <p className="mt-4 text-gray-500 text-sm">
                  {bar.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;