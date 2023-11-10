import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import defaultConfig from "../public/static/config/config.json"

export const fetchConfig = createAsyncThunk(
    'config/fetchConfig',
    async (_, { getState, requestId, rejectWithValue }) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONFIG_JSON_SITE_READ}`);
        const data = await response.json();
        return data; // Return the response data to be handled by the extraReducers
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const postConfig = createAsyncThunk(
    'config/postConfig',
    async (dataToWrite, { rejectWithValue }) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONFIG_JSON_SITE_WRITE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToWrite),
        });
  
        // Check if the status code indicates success
        if (!response.ok) {
          throw new Error('Server responded with an error!');
        }
  
        const data = await response.json();
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);

export const configSlice = createSlice({
    name: "config",
    initialState: defaultConfig,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchConfig.fulfilled, (state, action) => {
            // Handle the fulfilled state
            return action.payload; // Update the state with the fetched config
          })
          .addCase(fetchConfig.rejected, (state, action) => {
            // Handle the rejected state
            console.error('Fetch failed:', action.payload);
          })
          .addCase(postConfig.fulfilled, (state, action) => {
            // Handle the successful async action
            state = action.payload;
            console.log('Config posted successfully');
          })
          .addCase(postConfig.rejected, (state, action) => {
            // Handle the failed async action
            console.error('Error posting config:', action.payload);
          })   
        }
      }
)


export const configActions = configSlice.actions;
export default configSlice.reducer;
