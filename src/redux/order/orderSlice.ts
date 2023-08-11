import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Items,
  Status,
  TLocationCity,
  TLocationNova,
  TOrder,
  TOrders,
} from "../types";
import {
  addOrder,
  getLocations,
  getNovaPoshtaLocations,
  getOrdersByUser,
  getStreets,
  getUkrPoshtaLocations,
} from "./asyncActions";

const orderSlice = createSlice({
  name: "reviews",
  initialState: {
    status: "success" as Status,
    locations: [
      {
        display_name: "",
      },
    ] as TLocationCity[],

    street: [] as unknown as any,

    city: "",

    novaPoshtaLocations: {
      data: [{}],
    } as TLocationNova,
    ukrPoshtaLocations: {},

    user_orders: [] as unknown as TOrders,
    current_order: {} as unknown as TOrder,
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
        delivery_cost: 0,
        delivery_location: {
          street: "",
          houseNumber: "",
          apartmentNumber: "",
          floorNumber: "",
        },
        novaDepartment: "",
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
      payWithParts: {
        months: 0,
        perMonth: 0,
        firstPay: 0,
      },
      items: [] as Items[],
      total: 0,
      numberOfOrder: "",
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

    CURRENT_ORDER_setOrder(state, action: PayloadAction<TOrder>) {
      state.current_order = action.payload;
      console.log(state.current_order);
    },

    ORDER_setUserLocation(
      state,
      action: PayloadAction<{
        city_location: string;
      }>
    ) {
      state._order.user_location = action.payload;
    },

    ORDER_setUniqueNumber(state, action: PayloadAction<string>) {
      state._order.numberOfOrder = action.payload;
    },

    ORDER_setPaymentWithParts(
      state,
      action: PayloadAction<{
        months: number;
        perMonth: number;
        firstPay: number;
      }>
    ) {
      state._order.payWithParts = action.payload;
    },

    ORDER_setTotal(state, action: PayloadAction<number>) {
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
    ORDER_setDeliveryOnAdress(
      state,
      action: PayloadAction<{
        delivery_type: string;
        delivery_cost: number;
        delivery_location: {
          street: string;
          houseNumber: string;
          apartmentNumber: string;
          floorNumber: string;
        };
        novaDepartment: string;
        elevator: boolean;
        liftRequired: boolean;
      }>
    ) {
      state._order.delivery = action.payload;
    },
    ORDER_setDeliveryNova(
      state,
      action: PayloadAction<{
        delivery_type: string;
        delivery_cost: number;
        delivery_location: {
          street: string;
          houseNumber: string;
          apartmentNumber: string;
          floorNumber: string;
        };
        novaDepartment: string;
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
      const simplifiedAddresses = action.payload.map((address: any) => {
        const parts = address.display_name.split(", ");
        const simplified = `${parts[0]}, ${parts[parts.length - 3]}`;
        return simplified;
      });
      const uniqueAddresses = Array.from(new Set(simplifiedAddresses));
      console.log(uniqueAddresses);
      state.street = uniqueAddresses;
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

    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.user_orders = action.payload;
    });
    builder.addCase(addOrder.pending, (state) => {});
    builder.addCase(addOrder.rejected, (state) => {});

    builder.addCase(getOrdersByUser.fulfilled, (state, action) => {
      state.user_orders = action.payload;
      state.status = "success";
    });
    builder.addCase(getOrdersByUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getOrdersByUser.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const {
  setCity,
  setNovaPoshtaLocation,
  setStreetLocation,
  setLocation,
  CURRENT_ORDER_setOrder,
  ORDER_setTotal,
  ORDER_setUserLocation,
  ORDER_setReceiver,
  ORDER_setUserContact,
  ORDER_setDeliveryOnAdress,
  ORDER_setPayment,
  ORDER_setItems,
  ORDER_setUniqueNumber,
  ORDER_setPaymentWithParts,
  STAGES_userContact,
  STAGES_delivery,
  STAGES_payment,
  STAGES_receiverContact,
  STAGES_city,
} = orderSlice.actions;
export default orderSlice.reducer;
