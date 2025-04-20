import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, BarChart2, Zap, ShieldCheck, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <nav className="flex justify-between items-center py-6">
          <div className="text-white text-2xl font-bold">TrueUsage</div>
          <div>
            <Link 
              href="/login" 
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Login
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Track Your Energy Usage
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Monitor your energy consumption in real-time with our advanced IoT solution. 
            Save money and reduce your carbon footprint.
          </p>
          <div className="space-x-4">
            <Link 
              href="/login" 
              className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-600 transition"
            >
              Get Started
            </Link>
            <Link 
              href="#features" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg hover:bg-white hover:text-gray-900 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
              <h3 className="text-xl font-bold text-white mb-4">Real-time Monitoring</h3>
              <p className="text-gray-300">
                Track your energy usage in real-time with detailed analytics and insights.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
              <h3 className="text-xl font-bold text-white mb-4">Smart Alerts</h3>
              <p className="text-gray-300">
                Get instant notifications about unusual energy consumption patterns.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
              <h3 className="text-xl font-bold text-white mb-4">Cost Savings</h3>
              <p className="text-gray-300">
                Optimize your energy usage and reduce your monthly electricity bills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

