import '../App.css';
import EventList from '../components/EventList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import old from '../assets/old.png';
import Searchfield from '../components/Searchfield';
import { useState, useEffect } from 'react';

const events = [
  { id: 1, title: 'Meeting', date: '2026-03-15', time: '10:00', description: 'About party in Aarhus.'},
  { id: 2, title: 'Workshop', date: '2026-03-20', time: '14:00', description: 'Visual Studio Code ReactJs.' },
  { id: 3, title: 'Birthday', date: '2026-01-25', time: '18:00', description: 'My birthday party.' },
  { id: 4, title: 'Conference', date: '2026-02-18', time: '09:00', description: 'Tech conference in Copenhagen.' },
];
      
  function DefaultPage() { 
    // Looks for information in local storage and if it finds it, 
    // it sets the value of filterText to that information. 
    // If it doesn't find it, it sets the value of filterText to an empty string.
    const [filterText, setFilterText] = useState(() => {
      const savedFilter = localStorage.getItem("filterTextinStorage");
      return savedFilter ? savedFilter : "";
    });

    // Whenever the value of filterText changes, the useEffect hook is triggered 
    // and the new value of filterText (information) is saved to local storage with the key "filterTextinStorage".
    useEffect(() => {
      localStorage.setItem("filterTextinStorage", filterText);
    }, [filterText]);

    const sortedEvents = events.toSorted((a,b) =>
      a.date.localeCompare(b.date, "en", {sensitivity: "base" })
  );

  // Filter events based on user input
    const filteredEvents = sortedEvents.filter(event => 
    event.title.toLowerCase().includes(filterText.toLowerCase()) || 
    event.description.toLowerCase().includes(filterText.toLowerCase())
    );

// Change the value of variable "filterText" to the value of the input field
// Makes the component re-render and the list of events is filtered based on the new value of "filterText"
// Function handleInputChange(event) => {...
const handleInputChange = (event) => {
  setFilterText(event.target.value);
};
    return (
    <div>
      <img src={old} alt="Old"/>
      <Header/>
      <Searchfield handleInput={handleInputChange} filter={filterText}/>
      <EventList events={filteredEvents} />
      <Footer/>
    </div> 
 ) 
}
export default DefaultPage