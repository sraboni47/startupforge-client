import Link from "next/link";
import { FiArrowRight, FiUsers } from "react-icons/fi";

const ReadyToForge = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto rounded-3xl border border-gray-200 bg-gradient-to-br from-violet-50 via-white to-purple-50 p-10 md:p-16 text-center shadow-sm">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Ready to <span className="text-violet-600">Forge</span> Your Team?
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Join thousands of founders and collaborators building the future
            together.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
  <Link
    href="/dashboard"
    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
  >
    I am a Founder
    <FiArrowRight />
  </Link>

  <Link
    href="/dashboard"
    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-violet-200 text-violet-600 font-semibold bg-white hover:bg-violet-50 transition"
  >
    I am a Collaborator
    <FiUsers />
  </Link>
</div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToForge;
