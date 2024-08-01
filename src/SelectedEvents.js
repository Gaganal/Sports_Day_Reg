import React from 'react';
import './EventCard.css'; // Reuse the same CSS file for styling

const SelectedEvents = ({ selectedEvents, onDeselect }) => {
  return (
    <div className="selected-events-section">
      <h1 className="section-title">Selected Events</h1>
      <div className="selected-events">
        {selectedEvents.map(event => {
          const capitalizedCategory = event.event_category.charAt(0).toUpperCase() + event.event_category.slice(1);
          const initial = event.event_category.charAt(0).toUpperCase();

          return (
            <div key={event.id} className="event-card">
              <div className="category-initial">{initial}</div>
              <div className="event-details">
                <h3>{event.event_name}</h3>
                <p>({capitalizedCategory})</p>
                <p>{event.start_time} - {event.end_time}</p>
                <button onClick={() => onDeselect(event)}> Remove </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedEvents;
