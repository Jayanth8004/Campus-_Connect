import { useEffect } from "react";
import EventForm from "../components/EventForm";
import EventSection from "../components/EventSection";
import Hero from "../components/Hero";

function HomePage({events,
    onAddEvent,
    editingEvent,
    onUpdateEvent,
    onCancelEdit,
    onEditEvent,
    onDeleteEvent,}){
    useEffect(() => {
        if (editingEvent) {
            document.getElementById("event-form")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [editingEvent]);

    return(
        <>
        <Hero title="Discover what is happening in Campus"
        description="Find workshops,sports,activities,club Meeting,and opportunities to connect with other students."/>
        <EventForm
        id="event-form"
        key={editingEvent ? editingEvent.id : "new-event"}
        onAddEvent={onAddEvent}
        editingEvent={editingEvent}
        onUpdateEvent={onUpdateEvent}
        onCancelEdit={onCancelEdit}/>
        <EventSection 
        events={events}
        onEditEvent={onEditEvent}
        onDeleteEvent={onDeleteEvent}/>
        </>
    );
}
export default HomePage;