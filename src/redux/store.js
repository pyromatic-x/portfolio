import { configureStore } from "@reduxjs/toolkit";
import greetingPlayed from "./reducers/greetingPlayed";
import avatarAppeared from "./reducers/avatarAppeared";

export default configureStore({
  reducer: {
    greetingPlayed,
    avatarAppeared,
  },
});
