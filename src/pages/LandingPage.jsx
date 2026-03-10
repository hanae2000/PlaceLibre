import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Shield, ArrowRight, Zap } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Find parking made <span className="text-blue-600">simple</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Reserve parking spaces in seconds. No more circling blocks or paying for unused time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/search" className="btn-primary justify-center gap-2">
                Start searching <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/register" className="btn-outline justify-center gap-2">
                Sign up free
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl h-96 flex items-center justify-center">
            <MapPin className="w-48 h-48 text-blue-200" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: <Zap className="w-8 h-8" />,
              title: 'Instant Booking',
              description: 'Reserve a spot in just a few clicks and save time'
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: 'Flexible Duration',
              description: 'Pay only for the time you actually use'
            },
            {
              icon: <DollarSign className="w-8 h-8" />,
              title: 'Best Prices',
              description: 'Compare rates and find the most affordable options'
            }
          ].map((feature, i) => (
            <div key={i} className="card p-8 hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
          <Shield className="w-12 h-12 mx-auto mb-4 text-blue-200" />
          <h2 className="text-3xl font-bold mb-4">Secure & Trusted</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Your parking reservations and payment information are protected with industry-leading security standards.
          </p>
          <Link to="/register" className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
};
