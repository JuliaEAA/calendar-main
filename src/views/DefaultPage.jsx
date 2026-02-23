import '../App.css';
import old from '../assets/old.png';
import EventList from '../event/EventList';
import Searchfield from '../components/Searchfield';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const events = [
        {id: 1, title: 'Meeting', date: '2026-02-22', description: 'About party in Aarhus'},
        {id: 2, title: 'Workshop', date: '2026-01-26', description: 'Designing a new app'},
        {id: 3, title: 'This', date: '2026-01-30', description: 'Birthday'},
        {id: 4, title: 'Workshop', date: '2026-05-14', description: 'Else'},
        {id: 5, title: 'Workshop', date: '2026-02-18', description: "Designing a new app"},
      ];

function DefaultPage() {
  // every time filterText changes the info is saved to webstorage
  //with key "filterTextinStorage"
  //looks for info in storage if there is some
  // filterText is equal to the savedFilter else it is an empty string
const [filterText, setFilterText] = useState(() => {
  const savedFilter = localStorage.getItem('filterTextinStorage');
  return savedFilter ? savedFilter : "";
});

useEffect(() => {
  localStorage.setItem('filterTextinStorage', filterText);
}, [filterText]);

  const sortedEvents = events.toSorted((a,b) => 
        a.date.localeCompare(b.date, "en", { sensitivity: "base" })
      );

// fitler events based on user input
const filteredEvents = sortedEvents.filter(event =>
    event.title.toLowerCase().includes(filterText.toLowerCase()) ||
    event.description.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  return (
    <div>
      <img src={old} alt="Old" />
      <Header />
      <Searchfield handleinput={handleFilterChange} filter={filterText} />
      <EventList events={filteredEvents} />
      <Footer />
    </div>
  )
}

export default DefaultPage