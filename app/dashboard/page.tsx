'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { 
  BarChart2, 
  Zap, 
  DollarSign, 
  Settings, 
  Bell, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  Home,
  Users,
  FileText,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Power,
  Clock,
  Lightbulb,
  Download,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(true)
  const [isInsightsOpen, setIsInsightsOpen] = useState(true)

  const [usageData, setUsageData] = useState({
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [
      {
        label: 'Energy Usage (kWh)',
        data: [4.2, 3.8, 3.2, 5.1, 6.2, 5.7, 4.8, 4.3],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      }
    ]
  })

  const [deviceUsageData] = useState({
    labels: ['AC', 'Refrigerator', 'Washing Machine', 'TV', 'Others'],
    datasets: [{
      data: [35, 25, 15, 15, 10],
      backgroundColor: [
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6'
      ]
    }]
  })

  const [alerts] = useState([
    { type: 'warning', message: 'High energy consumption detected in AC', time: '2 hours ago' },
    { type: 'info', message: 'Monthly bill is 15% lower than last month', time: '1 day ago' },
    { type: 'success', message: 'Energy saving goal achieved!', time: '2 days ago' }
  ])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Energy Consumption Trends'
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      }
    }
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-sm transition-all duration-300 ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {!isSidebarCollapsed && (
              <span className="text-xl font-bold text-blue-600">TrueUsage</span>
            )}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {session?.user?.email?.[0].toUpperCase()}
              </span>
            </div>
            {!isSidebarCollapsed && (
              <div>
                <p className="text-sm font-medium text-gray-700">{session?.user?.email}</p>
                <p className="text-xs text-gray-500">Premium User</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="p-4 border-b">
          <button 
            onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
            className="flex items-center justify-between w-full text-gray-700 font-medium"
          >
            {!isSidebarCollapsed && <span>Quick Actions</span>}
            <ChevronDown className={`w-4 h-4 transition-transform ${isQuickActionsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isQuickActionsOpen && !isSidebarCollapsed && (
            <div className="mt-2 space-y-2">
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-50 rounded-lg w-full">
                <Power className="w-4 h-4" />
                <span>Emergency Shutdown</span>
              </button>
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-50 rounded-lg w-full">
                <Clock className="w-4 h-4" />
                <span>Schedule Devices</span>
              </button>
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-50 rounded-lg w-full">
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
            </div>
          )}
        </div>

        {/* Energy Insights Section */}
        <div className="p-4 border-b">
          <button 
            onClick={() => setIsInsightsOpen(!isInsightsOpen)}
            className="flex items-center justify-between w-full text-gray-700 font-medium"
          >
            {!isSidebarCollapsed && <span>Energy Insights</span>}
            <ChevronDown className={`w-4 h-4 transition-transform ${isInsightsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isInsightsOpen && !isSidebarCollapsed && (
            <div className="mt-2 space-y-2">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2 text-yellow-700">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Peak Hours: 2PM - 6PM</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 text-green-700">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-sm">Save 20% by adjusting AC</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Expected Bill: ₹180</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center space-x-3 p-2 text-blue-600 bg-blue-50 rounded-lg">
            <Home size={20} />
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </Link>
          <Link href="/family-members" className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Users size={20} />
            {!isSidebarCollapsed && <span>Family Members</span>}
          </Link>
          <Link href="/settings" className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Settings size={20} />
            {!isSidebarCollapsed && <span>Settings</span>}
          </Link>
          <Link href="/help" className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <HelpCircle size={20} />
            {!isSidebarCollapsed && <span>Help & Support</span>}
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 p-2 text-red-600 hover:bg-red-50 rounded-lg w-full"
          >
            <LogOut size={20} />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-800">Dashboard Overview</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-full relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Current Usage</p>
                  <h3 className="text-2xl font-bold text-gray-800">5.2 kWh</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-green-500 text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  12% lower than yesterday
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Monthly Bill</p>
                  <h3 className="text-2xl font-bold text-gray-800">₹245.50</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-green-500 text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  8% lower than last month
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Carbon Footprint</p>
                  <h3 className="text-2xl font-bold text-gray-800">1.2 tons</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <BarChart2 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-green-500 text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  15% reduction this month
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Savings Goal</p>
                  <h3 className="text-2xl font-bold text-gray-800">85%</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-blue-500 text-sm">15% to reach goal</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Usage Trend</h3>
              <Line data={usageData} options={options} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Device-wise Consumption</h3>
              <Doughnut data={deviceUsageData} options={doughnutOptions} />
            </div>
          </div>

          {/* Alerts Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Alerts</h3>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start p-4 rounded-lg bg-gray-50">
                  <div className={`p-2 rounded-full mr-4 ${
                    alert.type === 'warning' ? 'bg-yellow-100' :
                    alert.type === 'info' ? 'bg-blue-100' :
                    'bg-green-100'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      alert.type === 'warning' ? 'text-yellow-600' :
                      alert.type === 'info' ? 'text-blue-600' :
                      'text-green-600'
                    }`} />
                  </div>
                  <div>
                    <p className="text-gray-800">{alert.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 