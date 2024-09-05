import { createSlice } from "@reduxjs/toolkit";

const incidentSlice = createSlice( {
    name: 'incidents',
    initialState: {
        list: [],
        users: [],
        categories: [],
    },
    reducers: {
        setIncidents: (state, action) => {
            state.list = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        }
    }
});

export const { setIncidents, setUsers, setCategories} = incidentSlice.actions;

export default incidentSlice.reducer;
