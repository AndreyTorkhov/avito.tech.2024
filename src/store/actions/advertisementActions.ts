import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Advertisement } from "../../types/interfaces";

interface AdvertisementState {
  advertisements: Advertisement[];
}

const initialState: AdvertisementState = {
  advertisements: [],
};

const advertisementSlice = createSlice({
  name: "advertisement",
  initialState,
  reducers: {
    setAdvertisements(state, action: PayloadAction<Advertisement[]>) {
      state.advertisements = action.payload;
    },
    addAdvertisement(state, action: PayloadAction<Advertisement>) {
      state.advertisements.push(action.payload);
    },
  },
});

export const { setAdvertisements, addAdvertisement } =
  advertisementSlice.actions;
export default advertisementSlice.reducer;
