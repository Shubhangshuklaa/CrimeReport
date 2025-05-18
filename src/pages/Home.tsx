import React from 'react';
import { Shield, BellRing, Map, Lock, ChevronRight, Users, BarChart3, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="animated-gradient" />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-background-50 rounded-full px-4 py-2 mb-8"
            >
              <Shield className="w-5 h-5 text-primary-500 mr-2" />
              <span className="text-sm">Fast, Easy, and Secured</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
              Report Crime, Without Fear.
              <br />
              Securely and Online.
            </h1>
            
            <p className="text-xl text-gray-400 mb-8">
              Our secure platform allows you to report crimes anonymously and get real-time updates on
              your case. Report Crime, Create a Safer Tomorrow.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/report" className="button-primary">
                Report a Crime
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/about" className="button-secondary">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-background-50">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold mb-2">17,500+</h3>
              <p className="text-gray-400">Crime reports filed on our platform</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold mb-2">2,740+</h3>
              <p className="text-gray-400">Police stations connected</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold mb-2">98%</h3>
              <p className="text-gray-400">Verification accuracy</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Features</h2>
          <p className="text-xl text-gray-400">
            Advanced tools and features to ensure secure and efficient crime reporting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="feature-card"
          >
            <Users className="w-10 h-10 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Management</h3>
            <p className="text-gray-400">Create and manage user profiles for civilians and police officers.</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="feature-card"
          >
            <BarChart3 className="w-10 h-10 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Analyzer</h3>
            <p className="text-gray-400">Advanced AI algorithms to verify and validate reported incidents.</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="feature-card"
          >
            <Map className="w-10 h-10 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Maps</h3>
            <p className="text-gray-400">Navigate with our advanced map features and location tracking.</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="feature-card"
          >
            <MessageSquare className="w-10 h-10 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-Time Chat</h3>
            <p className="text-gray-400">Communicate securely with law enforcement and support staff.</p>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-background-50 rounded-2xl p-8 md:p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Ready to help keep your community safe?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of citizens and law enforcement agencies already using CrimeGuard.
            </p>
            <Link to="/register" className="button-primary inline-flex">
              Get Started Now
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;