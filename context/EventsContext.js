import { createContext, useContext, useState } from 'react';

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [registered, setRegistered] = useState([]);   // event ids the student joined
  const [saved, setSaved] = useState([]);             // event ids that are favourited
  const [lastResumed, setLastResumed] = useState(null); // AppState
  const [resumeCount, setResumeCount] = useState(0);    // AppState

  const toggleRegister = (id) =>
    setRegistered((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleSaved = (id) =>
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const clearRegistered = () => setRegistered([]);

  return (
    <EventsContext.Provider
      value={{
        registered, saved, toggleRegister, toggleSaved, clearRegistered,
        lastResumed, setLastResumed, resumeCount, setResumeCount,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export const useEvents = () => useContext(EventsContext);