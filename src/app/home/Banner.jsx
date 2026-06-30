
import Link from "next/link";
const Banner = () => {
  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gradient-to-r from-violet-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-200 bg-violet-50 text-violet-600 text-sm font-medium mb-6">
          🚀 The Future Startup Collaboration Platform
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Build Your Dream
          <br />
          <span className="text-violet-600">Startup Team</span>
        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600">
          Connect founders with talented collaborators. Find your co-founder,
          developer, designer, marketer, and build your next big startup
          together.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Link
  href="/dashboard"
  className="bg-violet-600 text-white px-8 py-4 rounded-xl hover:bg-violet-700 transition"
>
  Start Building
</Link>

          <Link href="/opportunities">
  <button className="px-8 py-4 rounded-xl border border-violet-300 text-violet-600 font-semibold hover:bg-violet-50 transition">
    Browse Opportunities
  </button>
</Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Trusted by 500+ startups worldwide · No credit card required
        </p>
      </div>
    </section>
  );
};

export default Banner;
