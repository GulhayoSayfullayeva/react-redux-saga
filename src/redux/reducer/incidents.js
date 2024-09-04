import { createSlice } from "@reduxjs/toolkit";

const incidentSlice = createSlice( {
    name: 'incidents',
    initialState: {
        list: [],
        filter: ''
    },
    reducers: {
        setIncidents: (state, action) => {
            state.list = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export const { setIncidents, setFilter} = incidentSlice.actions;

export default incidentSlice.reducer;
