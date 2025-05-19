import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const localizer = momentLocalizer(moment);

function CustomCalendar() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('month'); // Default view

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Zadajte názov udalosti:');
    const notes = prompt('Zadajte poznámku k udalosti (voliteľné):');
    const priority = prompt(
      'Zadajte prioritu (very-important, important, normal):',
      'normal'
    ).toLowerCase();

    if (title && ['very-important', 'important', 'normal'].includes(priority)) {
      const newEvent = { title, start, end, notes, priority };
      setEvents([...events, newEvent]);
      toast.success(`Udalosť "${title}" bola pridaná s prioritou "${priority}"!`);
    } else {
      toast.error('Neplatná priorita. Udalosť nebola pridaná.');
    }
  };

  const handleSelectEvent = (event) => {
    alert(
      `Udalosť: ${event.title}\nPoznámka: ${event.notes || 'Žiadna poznámka'}\nPriorita: ${event.priority}`
    );
  };

  const filterEvents = (timeframe) => {
    const now = moment();
    return events.filter((event) => {
      if (timeframe === 'day') {
        return moment(event.start).isSame(now, 'day');
      } else if (timeframe === 'week') {
        return moment(event.start).isSame(now, 'week');
      } else if (timeframe === 'month') {
        return moment(event.start).isSame(now, 'month');
      }
      return false;
    });
  };

  const renderPriorityList = (timeframe) => {
    const filteredEvents = filterEvents(timeframe);
    const priorities = {
      'very-important': [],
      important: [],
      normal: [],
    };

    filteredEvents.forEach((event) => {
      priorities[event.priority].push(event);
    });

    return (
      <div>
        <h4>Veľmi dôležité</h4>
        {priorities['very-important'].length > 0 ? (
          priorities['very-important'].map((event, index) => (
            <p key={index}>{event.title}</p>
          ))
        ) : (
          <p>Žiadne udalosti</p>
        )}

        <h4>Dôležité</h4>
        {priorities.important.length > 0 ? (
          priorities.important.map((event, index) => (
            <p key={index}>{event.title}</p>
          ))
        ) : (
          <p>Žiadne udalosti</p>
        )}

        <h4>Normálne</h4>
        {priorities.normal.length > 0 ? (
          priorities.normal.map((event, index) => (
            <p key={index}>{event.title}</p>
          ))
        ) : (
          <p>Žiadne udalosti</p>
        )}
      </div>
    );
  };

  return (
    <div className="container mt-5" style={{ minHeight: '100vh', paddingBottom: '50px' }}>
      <h2>
        <i className="bi bi-calendar"></i> Kalendár
      </h2>

      <Tabs>
        <TabList>
          <Tab>Deň</Tab>
          <Tab>Týždeň</Tab>
          <Tab>Mesiac</Tab>
        </TabList>

        <TabPanel>
          <h3>Udalosti na dnes</h3>
          {renderPriorityList('day')}
        </TabPanel>
        <TabPanel>
          <h3>Udalosti na tento týždeň</h3>
          {renderPriorityList('week')}
        </TabPanel>
        <TabPanel>
          <h3>Udalosti na tento mesiac</h3>
          {renderPriorityList('month')}
        </TabPanel>
      </Tabs>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        messages={{
          today: 'Dnes',
          previous: 'Predchádzajúci',
          next: 'Nasledujúci',
        }}
      />
      <ToastContainer />
    </div>
  );
}

export default CustomCalendar;