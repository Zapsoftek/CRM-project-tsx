import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, X, Trash } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  time: string;
  type: 'meeting' | 'review' | 'internal';
  date: Date;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    type: 'meeting',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const startPadding = Array(monthStart.getDay()).fill(null);
  const endPadding = Array((6 * 7) - (startPadding.length + daysInMonth.length)).fill(null);
  const allDays = [...startPadding, ...daysInMonth, ...endPadding];

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getEventsByDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date));
  };

  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.time || !newEvent.date) return;

    if (selectedEvent) {
      // Update existing event
      setEvents(events.map(event => event.id === selectedEvent.id ? { ...selectedEvent, ...newEvent, type: newEvent.type as 'meeting' | 'review' | 'internal', date: parseISO(newEvent.date) } : event));
      setSelectedEvent(null);
    } else {
      // Add new event
      setEvents([...events, { id: events.length + 1, ...newEvent, type: newEvent.type as 'meeting' | 'review' | 'internal', date: parseISO(newEvent.date) }]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const resetForm = () => {
    setNewEvent({ title: '', time: '', type: 'meeting', date: format(new Date(), 'yyyy-MM-dd') });
    setSelectedEvent(null);
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <div className="flex items-center">
          <button onClick={prevMonth}><ChevronLeft /></button>
          <h2 className="mx-4">{format(currentDate, 'MMMM yyyy')}</h2>
          <button onClick={nextMonth}><ChevronRight /></button>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded">
          <Plus className="mr-2" /> Add Event
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-4 text-center font-semibold">{day}</div>
        ))}
        {allDays.map((date, i) => (
          <div key={i} className={`p-2 min-h-[120px] ${date && isSameMonth(date, currentDate) ? 'bg-white' : 'bg-gray-50'}`}>
            {date && (
              <>
                <span className={`text-sm ${isSameDay(date, new Date()) ? 'bg-blue-500 text-white p-1 rounded-full' : ''}`}>{format(date, 'd')}</span>
                <div>
                  {getEventsByDate(date).map(event => (
                    <div key={event.id} className="bg-blue-100 p-1 mt-1 flex justify-between items-center">
                      <div onClick={() => {
                        setSelectedEvent(event);
                        setNewEvent({ ...event, date: format(event.date, 'yyyy-MM-dd') });
                        setShowModal(true);
                      }} className="cursor-pointer">
                        <div className="font-medium">{event.title}</div>
                        <div>{event.time}</div>
                      </div>
                      <button onClick={() => handleDeleteEvent(event.id)} className="text-red-500">
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedEvent ? 'Edit Event' : 'Add Event'}</h3>
              <button onClick={() => setShowModal(false)}><X /></button>
            </div>
            <input type="text" placeholder="Event Title" className="w-full p-2 border rounded mb-2" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
            <input type="time" className="w-full p-2 border rounded mb-2" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} />
            <input type="date" className="w-full p-2 border rounded mb-2" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
            <button onClick={handleSaveEvent} className="w-full bg-blue-500 text-white p-2 rounded mb-2">Save Event</button>
            {selectedEvent && (
              <button onClick={() => handleDeleteEvent(selectedEvent.id)} className="w-full bg-red-500 text-white p-2 rounded flex items-center justify-center">
                <Trash className="mr-2" /> Delete Event
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
