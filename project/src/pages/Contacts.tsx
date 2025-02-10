import React from 'react';
import { Plus, Search, Mail, Phone } from 'lucide-react';

const Contacts = () => {
  const contacts = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      company: 'Acme Corp',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 891',
      company: 'Global Tech',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 234 567 892',
      company: 'Innovation Inc',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Plus className="w-5 h-5 mr-2" />
          Add Contact
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {contacts.map((contact, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={contact.avatar}
                alt={contact.name}
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.company}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">{contact.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">{contact.phone}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;