import { createSlice } from "@reduxjs/toolkit";
import { TABLE_DATA } from "../constants/TableData";

const initialState = {
  data: TABLE_DATA,
};

export const grainSlice = createSlice({
  name: "grains",
  initialState,
  reducers: {
    addGrain: (state, action) => {
      state.data = [...state.data, action?.payload];
    },
    removeGrain: (state, action) => {
      state.data = state.data.filter(
        (grain) => grain?.id !== action?.payload?.id
      );
    },
    editGrain: (state, action) => {
      const index = state.data.findIndex(
        (grain) => grain.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
});

export const { addGrain, removeGrain, editGrain } = grainSlice.actions;

export default grainSlice.reducer;
