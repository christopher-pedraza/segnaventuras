import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    current_nivel: 0,
};

export const nivelSlice = createSlice({
    name: "nivel",
    initialState,
    reducers: {
        setNivel: (state, action) => {
            state.current_nivel = action.payload;
        },
    },
});

export const { setNivel } = nivelSlice.actions;

export const selectNivel = (state) => state.nivel.current_nivel;

export default nivelSlice.reducer;
