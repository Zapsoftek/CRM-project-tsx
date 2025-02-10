import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
}

const Scrumboard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Contact Form', description: 'Create contact form component', status: 'todo' },
    { id: 2, title: 'API Integration', description: 'Integrate with CRM API', status: 'inProgress' },
    { id: 3, title: 'Dashboard', description: 'Complete dashboard layout', status: 'done' },
  ]);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'inProgress', title: 'In Progress', color: 'bg-blue-50' },
    { id: 'done', title: 'Done', color: 'bg-green-50' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Scrumboard</h1>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className={`${column.color} rounded-lg p-4`}>
            <h2 className="text-lg font-semibold mb-4">{column.title}</h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium mb-2">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scrumboard;