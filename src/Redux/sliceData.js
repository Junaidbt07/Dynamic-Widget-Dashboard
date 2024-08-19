import { createSlice } from "@reduxjs/toolkit";
import { initialCategories } from "./Data/CategoriesData";

const initialState = {
    categories: initialCategories,
}

export const dashboardSliced = createSlice({
    name: 'dashboard',
    initialState,
    reducers:{
        addWidget: ( state, action )=> {
            const {catId, widget} = action.payload;
            state.categories[catId].widgets.push(widget);
        },
        removeWidget: (state, action)=>{
            const {catId, widgetId}= action.payload;
            state.categories[catId].widgets = state.categories[catId].widgets.filter((wid)=> wid.id != widgetId)
        }
    }
});


export const {addWidget, removeWidget} = dashboardSliced.actions;
export default dashboardSliced.reducer;
