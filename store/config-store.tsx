import { createSlice } from '@reduxjs/toolkit';
import defaultConfig from "../public/static/config/config.json"


export const configSlice = createSlice({
    name: "config",
    initialState: defaultConfig,
    reducers: {

    }

})


export const configActions = configSlice.actions;
export default configSlice.reducer;
