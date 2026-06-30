const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold">
              StartupNexus
            </h2>

            <p className="mt-3 text-gray-400">
              Connect founders with talented collaborators.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>Startups</li>
              <li>Opportunities</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              For Founders
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Create Startup</li>
              <li>Add Opportunity</li>
              <li>Applications</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Contact
            </h3>

            <p className="text-gray-400">
              hello@startupnexus.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;