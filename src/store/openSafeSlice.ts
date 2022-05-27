import { createSlice } from "@reduxjs/toolkit";

const openSafeSlice = createSlice({
  name: "openSafe",
  initialState: {
    passcode: "",
    imageUrl: "",
    showImageUrlForm: false,
  },
  reducers: {
    lockSafe(state, action) {
      switch (action.payload.type) {
        case "PASSCODE":
          state.showImageUrlForm = true;
          state.passcode = action.payload.passcode;
          break;
        case "URL":
          state.imageUrl = action.payload.imageUrl;
          break;
      }
    },
  },
});
