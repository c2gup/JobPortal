// 



import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    job:jobSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
