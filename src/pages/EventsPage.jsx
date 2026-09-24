import EventSection from "../components/EventSection";

function EventsPage({ events, onEditEvent, onDeleteEvent }) {
    
    return (
        <>
            <section>
                <p className="section-label">
                    All Campus Activities
                </p>

                <h1>Events</h1>

                <p>
                    Explore all workshops, clubs, sports, and cultural activities
                </p>
            </section>

            <EventSection
                events={events}
                onEditEvent={onEditEvent}
                onDeleteEvent={onDeleteEvent}
            />
        </>
    );
}

export default EventsPage;