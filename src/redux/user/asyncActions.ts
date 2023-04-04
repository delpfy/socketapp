import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { IUserDisplay } from "../types";


export const checkAuthorization = createAsyncThunk<IUserDisplay>(
    'home/checkAuthorization',
    async function (){
        console.log("DATA " + 1);
        const {data} = await axios.get<IUserDisplay>(`/authme`);
        console.log("DATA " + data);
        return data;
    }
);

