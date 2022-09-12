import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";


export const historiesSlice = createSlice ({
    name: "histories",
    initialState: [],
    reducers: {
       setHistories: (state, action) => {
           return action.payload
       } 
    }
})

export const { setHistories } = historiesSlice.actions;


export const getHistories = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`http://localhost:5000/api/v1/history/`, getConfig())
    
        .then(res => dispatch(setHistories(res.data?.histories)))

        .finally(() => dispatch(setIsLoading(false)));
}



export const filterName = (query) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`http://localhost:5000/api/v1/history?query=${query}`, getConfig())
        .then(res => dispatch(setHistories(res.data?.histories)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterIdentification = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`http://localhost:5000/api/v1/history=${id}`)
        .then(res => dispatch(setHistories(res.data?.histories.identification)))
        .finally(() => dispatch(setIsLoading(false)));
}

export default historiesSlice.reducer;