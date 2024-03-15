import { createSlice } from "@reduxjs/toolkit"
import Item from "antd/es/list/Item"

const initialState = {
  cartList: JSON.parse(localStorage.getItem("cartList")) || [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCartRequest: (state, action) => {
      const { id, quantity } = action.payload
      const existProductIndex = state.cartList.findIndex((item) => item.id === id)
      if (existProductIndex !== -1) {
        state.cartList[existProductIndex].quantity =
          state.cartList[existProductIndex].quantity + quantity
      } else {
        state.cartList.push(action.payload)
        localStorage.setItem("cart", JSON.stringify(state.cartList))
      }
    },
    updateFormCart: (state, action) => {
      const { productId, quantity } = action.payload
      const existProductIndex = state.cartList.findIndex((item) => item.productId === productId)
      if (existProductIndex !== -1) {
        state.cartList[existProductIndex].quantity = quantity
      }
      localStorage.setItem("cartList", JSON.stringify(state.cartList))
    },
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.cartList = state.cartList.filter((item) => item.id !== productId)
      localStorage.setItem("cart", JSON.stringify(state.cartList))
    },
    clearCartRequest: (state) => {
      state.cartList = []
      localStorage.removeItem("cartList")
    },
  },
})

export const { addToCartRequest, removeFromCart, updateFormCart, clearCartRequest } =
  cartSlice.actions

export default cartSlice.reducer
