import Auth from './Auth';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Find Your Perfect</span>
              <span className="block text-indigo-600">Internship Match</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Upload your resume and let our AI match you with the best internship opportunities. Get personalized compatibility scores and apply with just one click.
            </p>
            <div className="mt-10">
              <Auth />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}