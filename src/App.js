import React, { useState, useEffect } from 'react';
import './App.css';
import EventCard from './EventCard';

const eventsData = [
  {
    id: 1,
    event_name: 'Butterfly 100M',
    event_category: 'swimming',
    start_time: '2022-12-17 13:00:00',
    end_time: '2022-12-17 14:00:00'
  },
  {
    id: 2,
    event_name: 'Backstroke 100M',
    event_category: 'swimming',
    start_time: '2022-12-17 13:30:00',
    end_time: '2022-12-17 14:30:00'
  },
  {
    id: 3,
    event_name: 'Freestyle 400M',
    event_category: 'swimming',
    start_time: '2022-12-17 15:00:00',
    end_time: '2022-12-17 16:00:00'
  },
  {
    id: 4,
    event_name: 'High Jump',
    event_category: 'athletics',
    start_time: '2022-12-17 13:00:00',
    end_time: '2022-12-17 14:00:00'
  },
  {
    id: 5,
    event_name: 'Triple Jump',
    event_category: 'athletics',
    start_time: '2022-12-17 16:00:00',
    end_time: '2022-12-17 17:00:00'
  },
  {
    id: 6,
    event_name: 'Long Jump',
    event_category: 'athletics',
    start_time: '2022-12-17 17:00:00',
    end_time: '2022-12-17 18:00:00'
  },
  {
    id: 7,
    event_name: '100M Sprint',
    event_category: 'athletics',
    start_time: '2022-12-17 17:00:00',
    end_time: '2022-12-17 18:00:00'
  },
  {
    id: 8,
    event_name: 'Lightweight 60kg',
    event_category: 'boxing',
    start_time: '2022-12-17 18:00:00',
    end_time: '2022-12-17 19:00:00'
  },
  {
    id: 9,
    event_name: 'Middleweight 75 kg',
    event_category: 'boxing',
    start_time: '2022-12-17 19:00:00',
    end_time: '2022-12-17 20:00:00'
  },
  {
    id: 10,
    event_name: 'Heavyweight 91kg',
    event_category: 'boxing',
    start_time: '2022-12-17 20:00:00',
    end_time: '2022-12-17 22:00:00'
  }
];

function App() {
  const [selectedEvents, setSelectedEvents] = useState(() => {
    const saved = localStorage.getItem('selectedEvents');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedEvents', JSON.stringify(selectedEvents));
  }, [selectedEvents]);

  const handleSelect = (event) => {
    if (selectedEvents.length >= 3) {
      alert('You can only select up to 3 events.');
      return;
    }
    if (selectedEvents.some(e => (e.start_time < event.end_time && e.end_time > event.start_time))) {
      alert('This event conflicts with one of your selected events.');
      return;
    }
    setSelectedEvents([...selectedEvents, event]);
  };

  const handleDeselect = (event) => {
    setSelectedEvents(selectedEvents.filter(e => e.id !== event.id));
  };

  const groupedEvents = eventsData.reduce((acc, event) => {
    if (!acc[event.event_category]) {
      acc[event.event_category] = [];
    }
    acc[event.event_category].push(event);
    return acc;
  }, {});

  return (
    <div className="App">
      <div className="events-section">
        <h2 className="section-title">All Events</h2>
        {Object.keys(groupedEvents).map(category => (
          <div key={category} className="event-category">
            {groupedEvents[category].map(event => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={handleSelect}
                isSelected={selectedEvents.some(e => e.id === event.id)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="selected-events-section">
        <h2 className="section-title">Selected Events</h2>
        <div className="selected-events">
          {selectedEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              isSelected={true}
              onDeselect={handleDeselect}
              inSelectedSection={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
