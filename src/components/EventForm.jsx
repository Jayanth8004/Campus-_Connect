import { useState } from "react";

function EventForm({
  id,
  onAddEvent,
  editingEvent,
  onUpdateEvent,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(function () {
    return getFormData(editingEvent);
  });

  const [formError, setFormError] = useState("");

  function handleChange(event) {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormData({
      ...formData,
      [inputName]: inputValue,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.title === "" ||
      formData.category === "" ||
      formData.date === "" ||
      formData.time === "" ||
      formData.location === "" ||
      formData.description === ""
    ) {
      setFormError("Please fill in every field.");
      return;
    }

    const eventData = {
      id: editingEvent ? editingEvent._id : undefined,
      title: formData.title,
      category: formData.category,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      description: formData.description,
    };

    if (editingEvent) {
      onUpdateEvent(eventData);
    } else {
      onAddEvent(eventData);
    }

    setFormData({
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      description: "",
    });

    setFormError("");
  }

  return (
    <section id={id} className="event-form-section">
      <p className="section-label">Create an Activity</p>

      <h2>{editingEvent ? "Update Campus Event" : "Add a New Campus Event"}</h2>

      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title</label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Example: React Workshop"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Club">Club</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>

          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>

          <input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="location">Location</label>

          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="Example: Seminar Hall"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the event"
          />
        </div>

        {formError !== "" && <p className="form-error">{formError}</p>}

        <div className="form-actions">
          <button className="submit-button" type="submit">
            {editingEvent ? "Update Event" : "Add Event"}
          </button>

          {editingEvent && (
            <button
              className="cancel-button"
              type="button"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

function formatDateForInput(date) {
  if (!date) {
    return "";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getFormData(event) {
  if (!event) {
    return {
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      description: "",
    };
  }

  return {
    title: event.title,
    category: event.category,
    date: formatDateForInput(event.date),
    time: formatTimeForInput(event.time),
    location: event.location,
    description: event.description,
  };
}

function formatTimeForInput(time) {
  if (!time) {
    return "";
  }

  if (/^\d{2}:\d{2}$/.test(time)) {
    return time;
  }

  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) {
    return "";
  }

  let hours = Number(match[1]);
  const minutes = match[2];
  const meridiem = match[3].toUpperCase();

  if (meridiem === "PM" && hours !== 12) {
    hours += 12;
  }
  if (meridiem === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

export default EventForm;