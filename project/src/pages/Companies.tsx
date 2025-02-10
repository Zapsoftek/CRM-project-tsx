import { useState } from 'react';
import { Plus, Search, Edit, Trash } from 'lucide-react';

const Companies = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Acme Corp',
      industry: 'Technology',
      employees: '250+',
      status: 'Active',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Global Tech',
      industry: 'Software',
      employees: '100+',
      status: 'Active',
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      name: 'Innovation Inc',
      industry: 'Consulting',
      employees: '50+',
      status: 'Inactive',
      logo: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=100&h=100&fit=crop',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newCompany, setNewCompany] = useState({ id: 0, name: '', industry: '', employees: '', status: 'Active', logo: '' });

  const handleSaveCompany = () => {
    if (!newCompany.name || !newCompany.industry || !newCompany.employees) return;
    if (!newCompany.logo) {
      newCompany.logo = 'https://via.placeholder.com/100'; // Default logo placeholder
    }
    if (newCompany.id) {
      setCompanies(companies.map(comp => (comp.id === newCompany.id ? newCompany : comp)));
    } else {
      setCompanies([...companies, { ...newCompany, id: companies.length + 1 }]);
    }
    setShowModal(false);
    setNewCompany({ id: 0, name: '', industry: '', employees: '', status: 'Active', logo: '' });
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewCompany({ id: 0, name: '', industry: '', employees: '', status: 'Active', logo: '' });
  };

  interface Company {
    id: number;
    name: string;
    industry: string;
    employees: string;
    status: string;
    logo: string;
  }

  const handleEditCompany = (company: Company) => {
    setNewCompany(company);
    setShowModal(true);
  };

  const handleDeleteCompany = (id: number) => {
    setCompanies(companies.filter((comp: Company) => comp.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Plus className="w-5 h-5 mr-2" /> Add Company
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="Search companies..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map(company => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <img className="h-10 w-10 rounded-full object-cover" src={company.logo} alt={company.name} />
                    <span className="ml-4 text-sm font-medium text-gray-900">{company.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.industry}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.employees}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{company.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex space-x-3">
                    <button onClick={() => handleEditCompany(company)} className="text-blue-500 hover:text-blue-700"><Edit className="w-5 h-5" /></button>
                    <button onClick={() => handleDeleteCompany(company.id)} className="text-red-500 hover:text-red-700"><Trash className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">{newCompany.id ? 'Edit Company' : 'Add Company'}</h3>
            <input type="text" placeholder="Company Name" className="w-full p-2 border rounded mb-2" value={newCompany.name} onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })} />
            <input type="text" placeholder="Industry" className="w-full p-2 border rounded mb-2" value={newCompany.industry} onChange={(e) => setNewCompany({ ...newCompany, industry: e.target.value })} />
            <input type="text" placeholder="Employees" className="w-full p-2 border rounded mb-2" value={newCompany.employees} onChange={(e) => setNewCompany({ ...newCompany, employees: e.target.value })} />
            <div className="flex space-x-2">
              <button onClick={handleSaveCompany} className="w-full bg-blue-500 text-white p-2 rounded">Save</button>
              <button onClick={handleCancel} className="w-full bg-gray-400 text-white p-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;
