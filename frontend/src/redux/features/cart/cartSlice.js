import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        console.log("Items already added");
      }

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    updateQuantity: (state, action) => {
      const products = state.products.map((product) => {
        if (product._id === action.payload.id) {
          if (action.payload.type === "increment") {
            product.quantity += 1;
          } else if (action.payload.type === "decrement") {
            if (product.quantity > 1) {
              product.quantity -= 1;
            }
          }
        }
        return product;
      });

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload.id
      );
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

// utilities functions
export const setSelectedItems = (state) =>
  state.products.reduce((total, product) => {
    return Number(total + product.quantity);
  }, 0);

export const setTotalPrice = (state) =>
  state.products.reduce((total, product) => {
    return Number(total + product.quantity * product.price);
  }, 0);

export const setTax = (state) => Number(setTotalPrice(state) * state.taxRate);

export const setGrandTotal = (state) => {
  return setTotalPrice(state) + setTotalPrice(state) * state.taxRate;
};

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// // Initial state
// const initialState = {
//   items: [],
//   selectedItems: 0,
//   totalPrice: 0,
//   tax: 0,
//   taxRate: 0.05,
//   grandTotal: 0,
// };

// // Utility functions
// const setSelectedItems = (state) =>
//   state.items.reduce((total, item) => total + item.quantity, 0);

// const setTotalPrice = (state) =>
//   state.items.reduce((total, item) => total + item.quantity * item.price, 0);

// const setTax = (state) => Number(setTotalPrice(state) * state.taxRate);

// const setGrandTotal = (state) => {
//   return setTotalPrice(state) + setTax(state);
// };

// // Cart slice
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.items.find((p) => p._id === item._id);

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...item, quantity: 1 });
//       }

//       state.selectedItems = setSelectedItems(state);
//       state.totalPrice = setTotalPrice(state);
//       state.tax = setTax(state);
//       state.grandTotal = setGrandTotal(state);
//     },
//     updateQuantity: (state, action) => {
//       const item = state.items.find((p) => p._id === action.payload.id);
//       if (item) {
//         if (action.payload.type === "increment") {
//           item.quantity += 1;
//         } else if (action.payload.type === "decrement" && item.quantity > 1) {
//           item.quantity -= 1;
//         }
//       }

//       state.selectedItems = setSelectedItems(state);
//       state.totalPrice = setTotalPrice(state);
//       state.tax = setTax(state);
//       state.grandTotal = setGrandTotal(state);
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter((p) => p._id !== action.payload.id);

//       state.selectedItems = setSelectedItems(state);
//       state.totalPrice = setTotalPrice(state);
//       state.tax = setTax(state);
//       state.grandTotal = setGrandTotal(state);
//     },
//     clearCart: (state) => {
//       state.items = [];
//       state.selectedItems = 0;
//       state.totalPrice = 0;
//       state.tax = 0;
//       state.grandTotal = 0;
//     },
//   },
// });

// // Exporting actions and reducer
// export const { addToCart, updateQuantity, removeFromCart, clearCart } =
//   cartSlice.actions;
// export default cartSlice.reducer;
