import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

import { favoriteProductSuccess, unFavoriteProductSuccess } from "./favorite.slice"

const initialState = {
  productList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
  productDetail: {
    data: {},
    loading: false,
    error: null,
  },
  createProductData: {
    loading: false,
    error: null,
  },
  productSuggest: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
}

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    // getProductList
    getProductListRequest: (state) => {
      state.productList.loading = true
      state.productList.error = null
    },
    getProductListSuccess: (state, action) => {
      const { data, more, meta } = action.payload
      state.productList.data = more ? [...state.productList.data, ...data] : data
      state.productList.meta = meta
      state.productList.loading = false
    },
    getProductListFail: (state, action) => {
      const { error } = action.payload
      state.productList.error = error
      state.productList.loading = false
    },

    // getProductDetail
    getProductDetailRequest: (state) => {
      state.productDetail.loading = true
      state.productDetail.error = null
    },
    getProductDetailSuccess: (state, action) => {
      const { data } = action.payload
      state.productDetail.data = data
      state.productDetail.loading = false
    },
    getProductDetailFail: (state, action) => {
      const { error } = action.payload
      state.productDetail.error = error
      state.productDetail.loading = false
    },

    // getProductSuggest
    getProductSuggestRequest: (state) => {
      state.productSuggest.loading = true
      state.productSuggest.error = null
    },
    getProductSuggestSuccess: (state, action) => {
      const { data } = action.payload
      state.productSuggest.data = data
      state.productSuggest.loading = false
    },
    getProductSuggestFail: (state, action) => {
      const { error } = action.payload
      state.productSuggest.error = error
      state.productSuggest.loading = false
    },

    createProduct: (state, action) => {
      state.productList.push({
        id: uuidv4(),
        ...action.payload,
      })
    },
    updateProduct: () => {
      // do something
    },
    deleteProduct: () => {
      // do something
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(favoriteProductSuccess, (state, action) => {
        const { data } = action.payload
        state.productDetail.data.favorites.push(data)
      })
      .addCase(unFavoriteProductSuccess, (state, action) => {
        const { id } = action.payload
        if (state.productDetail.data.favorites?.length) {
          state.productDetail.data.favorites = state.productDetail.data.favorites.filter(
            (item) => item.id !== id
          )
        }
      })
  },
})

export const {
  getProductListRequest,
  getProductListSuccess,
  getProductListFail,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFail,
  getProductSuggestRequest,
  getProductSuggestSuccess,
  getProductSuggestFail,
  createProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions

export default productSlice.reducer
