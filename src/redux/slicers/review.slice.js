import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  reviewList: {
    data: [],
    loading: false,
    error: null,
  },
  reviewProductData: {
    loading: false,
    error: null,
  },
}

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    // getReviewList
    getReviewListRequest: (state, action) => {
      state.reviewList.loading = true
      state.reviewList.error = null
    },
    getReviewListSuccess: (state, action) => {
      const { data } = action.payload
      state.reviewList.data = data
      state.reviewList.loading = false
    },
    getReviewListFailure: (state, action) => {
      const { error } = action.payload
      state.reviewList.loading = false
      state.reviewList.error = error
    },
    // reviewProduct
    reviewProductRequest: (state, action) => {
      state.reviewProductData.loading = true
      state.reviewProductData.error = null
    },
    reviewProductSuccess: (state, action) => {
      state.reviewProductData.loading = false
    },
    reviewProductFailure: (state, action) => {
      const { error } = action.payload
      state.reviewProductData.loading = false
      state.reviewProductData.error = error
    },
  },
})

export const {
  getReviewListRequest,
  getReviewListSuccess,
  getReviewListFailure,
  reviewProductRequest,
  reviewProductSuccess,
  reviewProductFailure,
} = reviewSlice.actions

export default reviewSlice.reducer
