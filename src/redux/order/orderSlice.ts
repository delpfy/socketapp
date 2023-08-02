import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TLocationCity, TLocationNova } from "../types";
import {
  getLocations,
  getNovaPoshtaLocations,
  getStreets,
  getUkrPoshtaLocations,
} from "./asyncActions";

const orderSlice = createSlice({
  name: "reviews",
  initialState: {
    locations: [
      {
        display_name: "",
      },
    ] as TLocationCity[],

    street: [
      {
        display_name: "",
      },
    ] as TLocationCity[],

    city: "",

    novaPoshtaLocations: {
      data: [{}],
    } as TLocationNova,
    ukrPoshtaLocations: {},

    _order: {
      user_location: {
        city_location: "",
      },
      receiver: {
        userIsReceiver: false,
        contact: {
          name: "",
          surname: "",
          email: "",
          phone: "",
        },
      },
      user_contact: {
        name: "",
        surname: "",
        email: "",
        phone: "",
      },
      delivery: {
        delivery_type: "",
        delivery_location: {
          street: "",
          houseNumber: "",
          apartmentNumber: "",
          floorNumber: "",
        },
        liftRequired: false,
        elevator: false,
      },
      payment: {
        payment_type: "",
        uponReceipt: false,
        card: {
          number: "",
          date: "",
          cvv: "",
        },
      },
      items: {},
      total: 0
    },

    stages_of_order: {
      stage_userContact: false,
      stage_city: false,
      stage_delivery: false,
      stage_payment: false,
      stage_recevierContact: false,
    },

    location: "",
    street_location: "",
    novaPoshtaLocation: "",
    ukrPoshtaLocation: "",
    
  },

  reducers: {
    STAGES_userContact(state, action: PayloadAction<boolean>) {
      state.stages_of_order.stage_userContact = action.payload;
    },
    STAGES_city(state, action: PayloadAction<boolean>) {
      state.stages_of_order.stage_city = action.payload;
    },
    STAGES_delivery(state, action: PayloadAction<boolean>) {
      state.stages_of_order.stage_delivery = action.payload;
    },
    STAGES_payment(state, action: PayloadAction<boolean>) {
      state.stages_of_order.stage_payment = action.payload;
    },
    STAGES_receiverContact(state, action: PayloadAction<boolean>) {
      state.stages_of_order.stage_recevierContact = action.payload;
    },

    ORDER_setUserLocation(
      state,
      action: PayloadAction<{
        city_location: string;
      }>
    ) {
      state._order.user_location = action.payload;
    },

    ORDER_setTotal(
      state,
      action: PayloadAction<number>
    ) {
      state._order.total = action.payload;
      
    },

    ORDER_setItems(state, action: PayloadAction<any>) {
      state._order.items = action.payload;
    },
    ORDER_setReceiver(
      state,
      action: PayloadAction<{
        userIsReceiver: boolean;
        contact: {
          name: string;
          surname: string;
          email: string;
          phone: string;
        };
      }>
    ) {
      state._order.receiver = action.payload;
    },
    ORDER_setUserContact(
      state,
      action: PayloadAction<{
        name: string;
        surname: string;
        email: string;
        phone: string;
      }>
    ) {
      state._order.user_contact = action.payload;
      console.log(state._order.user_contact);
    },
    ORDER_setDelivery(
      state,
      action: PayloadAction<{
        delivery_type: string;
        delivery_location: {
          street: string;
          houseNumber: string;
          apartmentNumber: string;
          floorNumber: string;
        };
        elevator: boolean;
        liftRequired: boolean;
      }>
    ) {
      state._order.delivery = action.payload;
      console.log("state._order.delivery 11");
      console.log(state._order.delivery);
      console.log("state._order.delivery 12");
    },
    ORDER_setPayment(
      state,
      action: PayloadAction<{
        payment_type: string;
        uponReceipt: boolean;
        card: {
          number: string;
          date: string;
          cvv: string;
        };
      }>
    ) {
      state._order.payment = action.payload;
    },

    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
   
    },
    setNovaPoshtaLocation(state, action: PayloadAction<string>) {
      state.novaPoshtaLocation = action.payload;
    },
    setStreetLocation(state, action: PayloadAction<string>) {
      state.street_location = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.locations = action.payload;
    });
    builder.addCase(getLocations.pending, (state) => {});
    builder.addCase(getLocations.rejected, (state) => {});

    builder.addCase(getStreets.fulfilled, (state, action) => {
      state.street = action.payload;
    });
    builder.addCase(getStreets.pending, (state) => {});
    builder.addCase(getStreets.rejected, (state) => {});

    builder.addCase(getNovaPoshtaLocations.fulfilled, (state, action) => {
      state.novaPoshtaLocations = action.payload;
    });
    builder.addCase(getNovaPoshtaLocations.pending, (state) => {});
    builder.addCase(getNovaPoshtaLocations.rejected, (state) => {});

    builder.addCase(getUkrPoshtaLocations.fulfilled, (state, action) => {
      state.ukrPoshtaLocations = action.payload;
    });
    builder.addCase(getUkrPoshtaLocations.pending, (state) => {});
    builder.addCase(getUkrPoshtaLocations.rejected, (state) => {});
  },
});

export const {
  setCity,
  setNovaPoshtaLocation,
  setStreetLocation,
  setLocation,
  ORDER_setTotal,
  ORDER_setUserLocation,
  ORDER_setReceiver,
  ORDER_setUserContact,
  ORDER_setDelivery,
  ORDER_setPayment,
  ORDER_setItems,
  STAGES_userContact,
  STAGES_delivery,
  STAGES_payment,
  STAGES_receiverContact,
  STAGES_city,
} = orderSlice.actions;
export default orderSlice.reducer;
