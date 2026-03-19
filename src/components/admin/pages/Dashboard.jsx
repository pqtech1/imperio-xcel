import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Calendar,
  Download,
} from "lucide-react";
import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("week");

  // Stats data
  const stats = [
    {
      title: "Total Users",
      value: "24.5K",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Revenue",
      value: "$45.2K",
      change: "+8.2%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Growth",
      value: "32.5%",
      change: "+5.3%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Active",
      value: "12.3K",
      change: "+3.2%",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Activity data for charts
  const weeklyActivity = [
    { name: "Mon", users: 400, revenue: 2400 },
    { name: "Tue", users: 300, revenue: 1398 },
    { name: "Wed", users: 500, revenue: 3800 },
    { name: "Thu", users: 450, revenue: 2900 },
    { name: "Fri", users: 600, revenue: 4300 },
    { name: "Sat", users: 350, revenue: 2100 },
    { name: "Sun", users: 200, revenue: 1200 },
  ];

  const monthlyData = [
    { name: "Week 1", users: 2200, revenue: 12400 },
    { name: "Week 2", users: 2800, revenue: 15800 },
    { name: "Week 3", users: 2600, revenue: 14200 },
    { name: "Week 4", users: 3100, revenue: 18900 },
  ];

  const quarterlyData = [
    { name: "Jan", users: 8500, revenue: 45200 },
    { name: "Feb", users: 9200, revenue: 48900 },
    { name: "Mar", users: 10100, revenue: 53200 },
  ];

  const getChartData = () => {
    switch (timeRange) {
      case "week":
        return weeklyActivity;
      case "month":
        return monthlyData;
      case "quarter":
        return quarterlyData;
      default:
        return weeklyActivity;
    }
  };

  // Pie chart data
  const userDistribution = [
    { name: "New Users", value: 35, color: "#3b82f6" },
    { name: "Returning", value: 45, color: "#10b981" },
    { name: "Inactive", value: 20, color: "#f59e0b" },
  ];

  const recentActivity = [
    {
      user: "John Doe",
      action: "New user registered",
      time: "2 min ago",
      avatar: "JD",
    },
    {
      user: "Jane Smith",
      action: "Updated settings",
      time: "15 min ago",
      avatar: "JS",
    },
    {
      user: "Mike Johnson",
      action: "Completed project",
      time: "1 hour ago",
      avatar: "MJ",
    },
    {
      user: "Sarah Wilson",
      action: "Added new team",
      time: "3 hours ago",
      avatar: "SW",
    },
    {
      user: "Alex Brown",
      action: "Made a payment",
      time: "5 hours ago",
      avatar: "AB",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="h-10 px-3 bg-white border border-gray-300 text-sm text-gray-700 focus:border-gray-500 focus:ring-0 rounded-none"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 3 months</option>
          </select>
          <button className="h-10 px-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-none">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white border border-gray-200 p-6 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1">
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {stat.title}
                </p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity Overview - Area Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                Activity Overview
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs">
                    <span className="w-2 h-2 bg-blue-600"></span>
                    <span className="text-gray-600">Users</span>
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <span className="w-2 h-2 bg-green-600"></span>
                    <span className="text-gray-600">Revenue</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getChartData()}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: 0,
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#3b82f6"
                    fill="url(#colorUsers)"
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* User Distribution - Pie Chart */}
        <div className="bg-white border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              User Distribution
            </h2>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {userDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: 0,
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {userDistribution.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700">
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.user}
                  </p>
                  <p className="text-xs text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Calendar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">
                Quick Actions
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2">
                {["Add User", "Create Report", "Export Data", "Settings"].map(
                  (action, i) => (
                    <button
                      key={i}
                      className="p-3 border border-gray-200 hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700"
                    >
                      {action}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Upcoming */}
          <div className="bg-white border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">
                Upcoming
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar size={14} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Team Meeting
                    </p>
                    <p className="text-xs text-gray-500">Today, 3:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={14} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Project Deadline
                    </p>
                    <p className="text-xs text-gray-500">Tomorrow, 5:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={14} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Client Presentation
                    </p>
                    <p className="text-xs text-gray-500">Wed, 10:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
