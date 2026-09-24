import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";

import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import AboutPage from "./pages/AboutPage";


function App() {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const navigate = useNavigate();

    async function getEvents() {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) {
            throw new Error("Unable to load events");
        }
        return response.json();
    }

    useEffect(()=>{
        getEvents().then(setEvents).catch((error) => console.error(error));
    }, []);

    function handleAddEvent(newEvent) {
        fetch("http://localhost:5000/api/events", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newEvent)
        }).then(async (response)=>{
            if (!response.ok) throw new Error("Unable to add event");
            await response.json();
            return getEvents();
        }).then(setEvents).catch((error) => console.error(error));
    }

    function handleDeleteEvent(eventId) {
        fetch(`http://localhost:5000/api/events/${eventId}`, {
            method: "DELETE"
        }).then(async (response)=>{
            if (!response.ok) throw new Error("Unable to delete event");
            await response.json();
            return getEvents();
        }).then(setEvents).catch((error) => console.error(error));
    }

    function handleEditEvent(event) {
        setEditingEvent(event);
        navigate("/");
    }

    function handleUpdateEvent(updatedEvent) {
        fetch(`http://localhost:5000/api/events/${updatedEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEvent)
        }).then(async (response) => {
            if (!response.ok) throw new Error("Unable to update event");
            const data = await response.json();
            console.log(data);
            setEvents((currentEvents) => currentEvents.map((event) =>
                event._id === updatedEvent.id ? data.event : event
            ));
            setEditingEvent(null);
        }).catch((error) => console.error(error));
    }

    return (
        <div>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            events={events}
                            onAddEvent={handleAddEvent}
                            editingEvent={editingEvent}
                            onUpdateEvent={handleUpdateEvent}
                            onCancelEdit={() => setEditingEvent(null)}
                            onEditEvent={handleEditEvent}
                            onDeleteEvent={handleDeleteEvent}
                        />
                    }
                />

                <Route
                    path="/events"
                    element={
                        <EventsPage
                            events={events}
                            onEditEvent={handleEditEvent}
                            onDeleteEvent={handleDeleteEvent}
                        />
                    }
                />

                <Route
                    path="/events/:eventId"
                    element={
                        <EventDetailsPage
                            events={events}
                        />
                    }
                />

                <Route
                    path="/about"
                    element={<AboutPage />}
                />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;