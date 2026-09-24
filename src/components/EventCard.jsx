import { Link } from "react-router";

function EventCard({
  id,
  title,
  date,
  time,
  location,
  category,
  description,
  onEditEvent,
  onDeleteEvent,
}) {
  function handleDeleteClick() {
    onDeleteEvent(id);
  }

  return (
    <article className="event-card">
      <p className="event-category">
        {category}
      </p>

      <h3>{title}</h3>

      <p className="event-description">
        {description}
      </p>

      <div className="event-details">
        <p>
          <strong>Date:</strong> {date}
        </p>

        <p>
          <strong>Time:</strong> {time}
        </p>

        <p>
          <strong>Location:</strong> {location}
        </p>
      </div>

      <Link
        className="details-button"
        to={`/events/${id}`}
      >
        View Details
      </Link>

      <button
        className="edit-button"
        type="button"
        onClick={function () {
          onEditEvent({
            _id: id,
            title,
            date,
            time,
            location,
            category,
            description,
          });
        }}
      >
        Edit
      </button>

      <button
        className="delete-button"
        type="button"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </article>
  );
}

export default EventCard;