import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import "./App.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 text-center">
      <header className="mb-6">
        <h1 className="text-4xl font-bold">Communion App</h1>
        <p className="text-lg mt-2">Connecting people of all faiths through events and community support</p>
      </header>
      <section className="bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold">Connecting People Across Faiths & Interests</h2>
        <p className="mt-2">Join community events that bring people together.</p>
        <button 
          onClick={() => navigate("/events")} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Explore Events
        </button>
      </section>
    </div>
  );
};

const EventListing = () => {
  const [events, setEvents] = useState([
    { id: 1, title: "Community Gathering", date: "2025-03-20", location: "Church Hall", category: "Religious" },
    { id: 2, title: "Charity Drive", date: "2025-03-25", location: "City Center", category: "Charity" },
  ]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", location: "", category: "" });
  const [filter, setFilter] = useState("");

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.location && newEvent.category) {
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
      setNewEvent({ title: "", date: "", location: "", category: "" });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold">Events</h2>
      <div className="mt-4">
        <label className="block mb-2">Filter by Category:</label>
        <select className="border p-2" onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Religious">Religious</option>
          <option value="Charity">Charity</option>
          <option value="Social">Social</option>
        </select>
      </div>
      <ul className="mt-4">
        {events.filter(event => !filter || event.category === filter).map(event => (
          <li key={event.id} className="border p-4 mb-2 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Category: {event.category}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold">Add New Event</h3>
        <input className="border p-2 block mt-2" placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        <input className="border p-2 block mt-2" type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
        <input className="border p-2 block mt-2" placeholder="Location" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
        <select className="border p-2 block mt-2" value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}>
          <option value="">Select Category</option>
          <option value="Religious">Religious</option>
          <option value="Charity">Charity</option>
          <option value="Social">Social</option>
        </select>
        <button 
          onClick={handleAddEvent} 
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Add Event
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <nav className="p-4 bg-blue-500 text-white flex justify-between">
        <h1 className="text-xl font-bold">Communion App</h1>
        <div>
          <Link className="mx-2" to="/">Home</Link>
          <Link className="mx-2" to="/events">Events</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventListing />} />
      </Routes>
    </Router>
  );
};

export default App;
