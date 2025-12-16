import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { FacultyProvider } from "./context/FacultyContext";
import { AnnouncementProvider } from "./context/AnnouncementContext";
import { EventProvider } from "./context/EventContext";
import { CalendarProvider } from "./context/CalendarContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FacultyProvider>
        <AnnouncementProvider>
          <EventProvider>
            <CalendarProvider>
              <App />
            </CalendarProvider>
          </EventProvider>
        </AnnouncementProvider>
      </FacultyProvider>
    </BrowserRouter>
  </React.StrictMode>
);