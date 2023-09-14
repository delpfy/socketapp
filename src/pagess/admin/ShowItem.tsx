import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Typography } from "@mui/material";



export default function ShowItem () {
    const {itemCurrent} = useAppSelector(state => state.home)
    const [newItem , setNewItem] = useState({
        name: '',
        description: '',
        category: '',
        price: 0,
        quantity: 0,
        sale: 0,
        rating: 0,
        reviewsAmount: 0,
        image: [''],
        fields: []
    })
    return(
<>
<Typography>{itemCurrent.items.name}</Typography>
</>
    );
}