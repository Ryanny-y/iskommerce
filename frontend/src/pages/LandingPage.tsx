import { ShoppingBag, Store, MessageSquare } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FeatureCard from "@/components/landing/FeatureCard";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main>
        <HeroSection />

        {/* Features Section */}
        <section id="features" className="py-24 bg-neutral-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Marketplace built for students
              </h2>
              <p className="text-neutral-500 max-w-xl mx-auto">
                Everything you need to trade safely and efficiently within your
                university community.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<ShoppingBag className="w-6 h-6" />}
                title="Browse Items"
                description="Discover food and student products available within your campus."
              />
              <FeatureCard
                icon={<Store className="w-6 h-6" />}
                title="Sell Products"
                description="Start your own student business and sell to classmates."
              />
              <FeatureCard
                icon={<MessageSquare className="w-6 h-6" />}
                title="Chat with Sellers"
                description="Communicate directly with sellers for faster transactions."
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-emerald-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to join your campus marketplace?
            </h2>
            <p className="text-emerald-50 mb-10 text-lg">
              Join thousands of students already trading on Iskommerce.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={'/signup'} className="bg-white text-emerald-600 font-bold px-8 py-4 rounded-full hover:bg-emerald-50 transition-colors shadow-lg">
                Create Free Account
              </Link>
              <button className="bg-emerald-700 text-white font-bold px-8 py-4 rounded-full hover:bg-emerald-800 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
