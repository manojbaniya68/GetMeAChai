"use client";

import React from "react";
import Link from "next/link";

// Feature Card Component
const FeatureCard = ({ emoji, title, desc }) => (
  <li className="bg-slate-800 p-6 rounded-2xl shadow border border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all">
    <div className="text-4xl mb-3" aria-hidden="true">
      {emoji}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-slate-300 text-sm">{desc}</p>
  </li>
);

// Call-to-Action Component
const CTASection = () => (
  <section className="bg-slate-800 rounded-2xl p-10 text-center mx-auto max-w-3xl mt-20">
    <h2 className="text-3xl font-bold mb-4">Be Part of the Journey</h2>
    <p className="text-lg text-slate-300 mb-6">
      Whether you’re a creator or supporter, your presence makes a difference.
      Fuel creativity, connect with the community, and help ideas take flight.
    </p>
    <Link
      href="/"
      className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-lg transition"
    >
      Get Started
    </Link>
  </section>
);

export default function About() {
  // Features with updated text for Secure Payments → mention eSewa
  const features = [
    {
      title: "User Profiles",
      desc: "Create and manage your creator profile with ease.",
      emoji: "👤",
    },
    {
      title: "Secure Payments via eSewa",
      desc: "Support creators easily and securely using eSewa.",
      emoji: "💳",
    },
    {
      title: "Analytics & Insights",
      desc: "Track engagement and support trends.",
      emoji: "📈",
    },
    {
      title: "Responsive UI",
      desc: "Beautiful experience on mobile and desktop.",
      emoji: "📱",
    },
  ];

  return (
    <main className="bg-slate-900 text-slate-100 px-6 py-16 lg:px-12 lg:py-24" aria-labelledby="about-heading">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 id="about-heading" className="text-5xl font-extrabold mb-4">
          About GetMeAChai ☕
        </h1>
        <p className="text-xl text-slate-300">
          A community-powered crowdfunding platform where creators receive support
          one chai at a time — fueling passion, creativity, and innovation.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-slate-300 leading-relaxed">
          We empower creators, innovators, and builders to receive direct support
          from their fans and community. GetMeAChai removes barriers to funding so
          ideas can grow and thrive without limitations.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2" role="list">
          {features.map((f) => (
            <FeatureCard key={f.title} emoji={f.emoji} title={f.title} desc={f.desc} />
          ))}
        </ul>
      </section>

      {/* Call-to-Action */}
      <CTASection />

      {/* Footer */}
      <footer className="text-center text-slate-500 text-sm mt-16">
        © {new Date().getFullYear()} GetMeAChai. All rights reserved.
      </footer>
    </main>
  );
}
