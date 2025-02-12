import { BarChart3, Users, Building2, FileText } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Contacts', value: '2,543', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Companies', value: '85', icon: Building2, color: 'bg-green-500' },
    { title: 'Pending Quotes', value: '12', icon: FileText, color: 'bg-yellow-500' },
    { title: 'Monthly Revenue', value: '$45,234', icon: BarChart3, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center py-2 border-b border-gray-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                <div>
                  <p className="text-sm text-gray-600">New contact added</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <p className="text-sm text-gray-600">Follow up with Client</p>
                </div>
                <span className="text-xs text-gray-400">Tomorrow</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;