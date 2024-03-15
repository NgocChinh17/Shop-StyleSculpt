import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  typeList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
}

export const typeSlice = createSlice({
  name: "type",
  initialState: initialState,
  reducers: {
    // getTypeList
    getTypeListRequest: (state) => {
      state.typeList.loading = true
      state.typeList.error = null
    },
    getTypeListSuccess: (state, action) => {
      const { data } = action.payload
      state.typeList.data = data
      state.typeList.loading = false
    },
    getTypeListFail: (state, action) => {
      const { error } = action.payload
      state.typeList.error = error
      state.typeList.loading = false
    },
  },
})

export const { getTypeListRequest, getTypeListSuccess, getTypeListFail } = typeSlice.actions

export default typeSlice.reducer
