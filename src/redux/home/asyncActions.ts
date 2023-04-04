import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { IItemDisplay, IItemsDisplay } from "../types";



export const getAllItems = createAsyncThunk<IItemsDisplay>(
    'home/getAllItems',
    async function (){
        console.log("DATA " + 1);
        const {data} = await axios.get<IItemsDisplay>(`/items`);
        console.log("DATA " + data);
        return data;
    }
);

export const getItemsByCategory = createAsyncThunk<IItemsDisplay, string>(
    'home/getItemsByCategory',
    async (params) => {
        console.log("DATA " + 1);
        console.log("Params " + params) // Here is category.
        const {data} = await axios.get<IItemsDisplay>(`/items/category/${params}`);
        console.log("DATA " + data);
        return data;
    }
);

export const getItemById = createAsyncThunk<IItemDisplay, string>(
    'home/getItemById',
    async (params) => {
        console.log("DATA " + 1);
        console.log("Params " + params) // Here is Id.
        const {data} = await axios.get<IItemDisplay>(`/items/${params}`);
        console.log("DATA " + data);
        return data;
    }
);