import { createSlice } from "@reduxjs/toolkit";

const safeSlice = createSlice({
  name: "safe",
  initialState: {
    passcode: "",
    imageUrl: "",
    showImageUrlForm: false,
  },
  reducers: {
    setPasscode(state, action) {
      state.passcode = action.payload.passcode;
    },
    setImageUrl(state, action) {
      state.imageUrl = action.payload.imageUrl;
    },
    showForm(state, action) {
      state.showImageUrlForm = action.payload.show;
    },

    // lockSafe(state, action) {
    //   switch (action.payload.type) {
    //     case "PASSCODE":

    //       break;
    //     case "URL":
    //       state.imageUrl = action.payload.imageUrl;
    //       break;
    //   }
    // },
  },
});

export const updatePasscode = (passcode: string, unlock: boolean) => {
  return (dispatch: any) => {
    if (unlock) {
      dispatch(setPasscode({ passcode }));
      dispatch(showForm({ show: true }));
    }
  };
};

// export const updateImageUrl = (url: string) => {
//   return async (dispatch: any) => {
//     dispatch(setImageUrl({ imageUrl: url }));
//     await saveto
//   };
// };

// export const updatePasscode = (passcode: string) => {
//   return (dispatch: any) => {
//     dispatch(setPasscode({ passcode }));
//   };
// };

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
export const setPasscode = safeSlice.actions.setPasscode;
export const setImageUrl = safeSlice.actions.setImageUrl;
export const showForm = safeSlice.actions.showForm;
export default safeSlice;
