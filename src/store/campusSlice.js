import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

const STORAGE_KEY = "campus-connect-redux-v1";
const initialSaved = (() => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
})();
const seedEvents = [
  { id: "1", title: "TechFest Hackathon 2026", category: "Technical", date: "2026-08-20", venue: "Innovation Lab, Block A", capacity: 120, registered: 87 },
  { id: "2", title: "Rhythm Nights: Cultural Fest", category: "Cultural", date: "2026-08-25", venue: "Open Air Amphitheatre", capacity: 500, registered: 412 },
  { id: "3", title: "Campus Football Cup", category: "Sports", date: "2026-09-02", venue: "Main Sports Ground", capacity: 200, registered: 150 }
];
const initialState = {
  events: Array.isArray(initialSaved.events) ? initialSaved.events : seedEvents,
  clubs: Array.isArray(initialSaved.clubs) ? initialSaved.clubs : [],
  registrations: Array.isArray(initialSaved.registrations) ? initialSaved.registrations : [],
  status: "idle", error: null, lastUpdated: null
};

// A real async thunk boundary: replace this fallback with your backend endpoint when available.
export const refreshEvents = createAsyncThunk("campus/refreshEvents", async (_, { signal, rejectWithValue }) => {
  const endpoint = import.meta.env.VITE_API_BASE_URL;
  if (!endpoint) return null; // Use local persisted data when no backend is configured.
  try {
    const response = await fetch(`${endpoint.replace(/\/$/, "")}/events`, { signal, headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Events request failed (${response.status})`);
    const body = await response.json();
    return Array.isArray(body) ? body : body.events;
  } catch (error) { return rejectWithValue(error.message || "Unable to load events"); }
});

const slice = createSlice({
  name: "campus", initialState,
  reducers: {
    addEvent: { reducer(state, action) { state.events.unshift(action.payload); }, prepare(event) { return { payload: { ...event, id: event.id || nanoid(), registered: Number(event.registered || 0), capacity: Number(event.capacity || 0) } }; } },
    updateEvent(state, action) { const i = state.events.findIndex(e => String(e.id) === String(action.payload.id)); if (i >= 0) state.events[i] = { ...state.events[i], ...action.payload }; },
    deleteEvent(state, action) { state.events = state.events.filter(e => String(e.id) !== String(action.payload)); state.registrations = state.registrations.filter(r => String(r.eventId) !== String(action.payload)); },
    addClub: { reducer(state, action) { state.clubs.unshift(action.payload); }, prepare(club) { return { payload: { ...club, id: club.id || nanoid(), members: Number(club.members || 0) } }; } },
    registerForEvent(state, action) { const exists = state.registrations.some(r => r.eventId === action.payload.eventId && r.studentEmail === action.payload.studentEmail); if (!exists) { state.registrations.push({ ...action.payload, id: nanoid(), createdAt: new Date().toISOString() }); const event = state.events.find(e => String(e.id) === String(action.payload.eventId)); if (event && event.registered < event.capacity) event.registered += 1; } },
    cancelRegistration(state, action) { const registration = state.registrations.find(r => r.id === action.payload); if (registration) { const event = state.events.find(e => String(e.id) === String(registration.eventId)); if (event) event.registered = Math.max(0, event.registered - 1); state.registrations = state.registrations.filter(r => r.id !== action.payload); } },
    clearApiError(state) { state.error = null; }
  },
  extraReducers(builder) { builder.addCase(refreshEvents.pending, state => { state.status = "loading"; state.error = null; }).addCase(refreshEvents.fulfilled, (state, action) => { state.status = "succeeded"; state.lastUpdated = new Date().toISOString(); if (Array.isArray(action.payload)) state.events = action.payload; }).addCase(refreshEvents.rejected, (state, action) => { state.status = "failed"; state.error = action.payload || action.error.message || "Unable to load events"; }); }
});
export const { addEvent, updateEvent, deleteEvent, addClub, registerForEvent, cancelRegistration, clearApiError } = slice.actions;
export default slice.reducer;
