import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  discountList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
}

export const discountSlice = createSlice({
  name: "discount",
  initialState: initialState,
  reducers: {
    // getDiscountList
    getDiscountListRequest: (state) => {
      state.discountList.loading = true
      state.discountList.error = null
    },
    getDiscountListSuccess: (state, action) => {
      const { data } = action.payload
      state.discountList.data = data
      state.discountList.loading = false
    },
    getDiscountListFail: (state, action) => {
      const { error } = action.payload
      state.discountList.error = error
      state.discountList.loading = false
    },
  },
})

export const { getDiscountListRequest, getDiscountListSuccess, getDiscountListFail } =
  discountSlice.actions

export default discountSlice.reducer
