import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Trello,
  Building2,
  Users,
  FileText,
} from 'lucide-react';

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/calendar', icon: Calendar, label: 'Calendar' },
  { path: '/scrumboard', icon: Trello, label: 'Scrumboard' },
  { path: '/companies', icon: Building2, label: 'Companies' },
  { path: '/contacts', icon: Users, label: 'Contacts' },
  { path: '/quotes', icon: FileText, label: 'Quotes' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">ZAP CRM</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-[#C0A479] hover:text-white ${
                isActive ? 'bg-[#C0A479] text-white border-r-4 border-[#C0A479]' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
