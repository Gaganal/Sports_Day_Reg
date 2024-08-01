import React from 'react';
import './EventCard.css'; // Import the CSS file for styling

const EventCard = ({ event, onSelect, isSelected, onDeselect, inSelectedSection }) => {
  const capitalizedCategory = event.event_category.charAt(0).toUpperCase() + event.event_category.slice(1);
  const initial = event.event_category.charAt(0).toUpperCase();

  return (
    <div className="event-card">
      <div className="category-initial">{initial}</div>
      <div className="event-details">
        <h3>{event.event_name}</h3>
        <p>({capitalizedCategory})</p>
        <p>{event.start_time} - {event.end_time}</p>
        {isSelected ? (
          <button
            className={inSelectedSection ? "deselect-button" : ""}
            onClick={onDeselect ? () => onDeselect(event) : undefined}
          >
            Remove
          </button>
        ) : (
          <button onClick={onSelect ? () => onSelect(event) : undefined}>Select</button>
        )}
      </div>
    </div>
  );
};
export default EventCard;
