import { createSlice } from "@reduxjs/toolkit";

const openSafeSlice = createSlice({
  name: "openSafe",
  initialState: {
    passcode: "",
    imageUrl: "",
    showImageUrlForm: false,
  },
  reducers: {
    setPasscode(state, action) {
      state.showImageUrlForm = true;
      state.passcode = action.payload.passcode;
    }
    
    lockSafe(state, action) {
      switch (action.payload.type) {
        case "PASSCODE":
          
          break;
        case "URL":
          state.imageUrl = action.payload.imageUrl;
          break;
      }
    },
  },
});

export const updatePasscode = (passcode: string) => {
  return async (dispatch: any) => {
    dispatch(setStepsToday({ steps }));
    EventEmitter.emit("steps_24hr", 5001);
    await writeStepsData(steps);
  };
};


// export const sendStepsData = (steps: number) => {
//   return async (dispatch: any) => {
//     dispatch(setStepsToday({ steps }));
//     EventEmitter.emit("steps_24hr", 5001);
//     await writeStepsData(steps);
//   };
// };

// export const addSteps = stepsSlice.actions.addSteps;
// export const removeSteps = stepsSlice.actions.removeSteps;
// export const addStepsToday = stepsSlice.actions.addStepsToday;
// export const setStepsToday = stepsSlice.actions.setStepsToday;
// export default stepsSlice.reducer;
