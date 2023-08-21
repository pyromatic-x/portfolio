import { configureStore } from "@reduxjs/toolkit";
import greetingPlayed from "./reducers/greetingPlayed";

export default configureStore({
  reducer: {
    greetingPlayed,
  },
});
