import { configureStore } from "@reduxjs/toolkit";
import campusReducer from "./campusSlice.js";

export const store = configureStore({ reducer: { campus: campusReducer }, middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }) });
store.subscribe(() => {
  try { const { events, clubs, registrations } = store.getState().campus; localStorage.setItem("campus-connect-redux-v1", JSON.stringify({ events, clubs, registrations })); } catch { /* storage may be disabled */ }
});
export const selectEvents = state => state.campus.events;
export const selectClubs = state => state.campus.clubs;
export const selectRegistrations = state => state.campus.registrations;
