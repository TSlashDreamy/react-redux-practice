import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk("users/remove", async (user) => {
  axios.delete(`http://localhost:3005/users/${user.id}`);

  return user; // we are returning user to know which user we deleted
});

export { removeUser };
