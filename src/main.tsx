import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { FacultyProvider } from "./context/FacultyContext";
import { AnnouncementProvider } from "./context/AnnouncementContext";
import { EventProvider } from "./context/EventContext";
import { CalendarProvider } from "./context/CalendarContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <FacultyProvider>
        <AnnouncementProvider>
          <EventProvider>
            <CalendarProvider>
              <App />
            </CalendarProvider>
          </EventProvider>
        </AnnouncementProvider>
      </FacultyProvider>
    </Router>
  </React.StrictMode>
);