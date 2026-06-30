import Image from "next/image";
import Link from "next/link";
import startups from "@/data/startups";

const StartupDetailsPage = async ({ params }) => {
  const { id } = await params;

  const startup = startups.find(
    (item) => item.id === Number(id)
  );

  if (!startup) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold text-red-500">
          Startup Not Found
        </h1>

        <Link
          href="/startup"
          className="inline-block mt-8 bg-violet-600 text-white px-6 py-3 rounded-xl"
        >
          Back To Startups
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Back Button */}

      <Link
        href="/startup"
        className="text-violet-600 font-semibold hover:underline"
      >
        ← Back to Startups
      </Link>

      {/* Card */}

      <div className="mt-8 bg-white border rounded-3xl p-8 shadow-sm">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left */}

          <div>

            <Image
              src={startup.image}
              alt={startup.name}
              width={700}
              height={450}
              className="rounded-3xl w-full h-[420px] object-cover"
            />

          </div>

          {/* Right */}

          <div>

            <h1 className="text-5xl font-bold">
              {startup.name}
            </h1>

            <p className="text-gray-500 mt-3">
              {startup.email}
            </p>

            <div className="flex gap-3 mt-6 flex-wrap">

              <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-600 text-sm">
                {startup.industry}
              </span>

              <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm">
                {startup.stage}
              </span>

            </div>

            <h2 className="text-2xl font-bold mt-10">
              About Startup
            </h2>

            <p className="text-gray-600 mt-4 leading-8">
              {startup.description}
            </p>

            <h2 className="text-2xl font-bold mt-10">
              Looking For
            </h2>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
              <li>Frontend Developer</li>
              <li>Backend Developer</li>
              <li>UI/UX Designer</li>
              <li>Marketing Specialist</li>
            </ul>

            <div className="mt-10">

            <Link href="/opportunities">
  <button className="mt-10 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl transition">
    View Opportunities
  </button>
</Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default StartupDetailsPage;