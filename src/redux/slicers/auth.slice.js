import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userInfo: {
    data: {},
    loading: true,
    error: null,
  },
  registerData: {
    loading: false,
    error: null,
  },
  loginData: {
    loading: false,
    error: null,
  },
  updateUserInfoData: {
    loading: false,
    error: null,
  },
  changeAvatarData: {
    loading: false,
    error: null,
  },
  changePasswordData: {
    load: false,
    error: null,
  },
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // register
    registerRequest: (state) => {
      state.registerData.loading = true
      state.registerData.error = null
    },
    registerSuccess: (state, action) => {
      state.registerData.loading = false
    },
    registerFail: (state, action) => {
      const { error } = action.payload
      state.registerData.error = error
      state.registerData.loading = false
    },

    // login
    loginRequest: (state) => {
      state.loginData.loading = true
      state.loginData.error = null
    },
    loginSuccess: (state, action) => {
      const { data } = action.payload
      state.loginData.loading = false
      state.userInfo.data = data
      state.userInfo.loading = false
    },
    loginFail: (state, action) => {
      const { error } = action.payload
      state.loginData.error = error
      state.loginData.loading = false
    },

    // logout
    logoutRequest: (state) => {
      state.userInfo.data = {}
      localStorage.removeItem("accessToken")
    },

    // getUserInfo
    getUserInfoRequest: (state) => {
      state.userInfo.loading = true
      state.userInfo.error = null
    },
    getUserInfoSuccess: (state, action) => {
      const { data } = action.payload
      state.userInfo.loading = false
      state.userInfo.data = data
    },
    getUserInfoFail: (state, action) => {
      const { error } = action.payload
      state.userInfo.error = error
      state.userInfo.loading = false
    },

    // updateUserInfo
    updateUserInfoRequest: (state) => {
      state.updateUserInfoData.loading = true
      state.updateUserInfoData.error = null
    },
    updateUserInfoSuccess: (state, action) => {
      const { data } = action.payload
      state.updateUserInfoData.loading = false
      state.userInfo.data = data
    },
    updateUserInfoFail: (state, action) => {
      const { error } = action.payload
      state.updateUserInfoData.error = error
      state.updateUserInfoData.loading = false
    },

    // changeAvatar
    changeAvatarRequest: (state) => {
      state.changeAvatarData.loading = true
      state.changeAvatarData.error = null
    },
    changeAvatarSuccess: (state, action) => {
      const { data } = action.payload
      state.changeAvatarData.loading = false
      state.userInfo.data = data
    },
    changeAvatarFail: (state, action) => {
      const { error } = action.payload
      state.changeAvatarData.error = error
      state.changeAvatarData.loading = false
    },

    // changePassword
    changePasswordRequest: (state, action) => {
      state.changePasswordData.loading = true
      state.changePasswordData.error = null
    },
    changePasswordSuccess: (state, action) => {
      state.changePasswordData.loading = false
    },
    changePasswordFailure: (state, action) => {
      const { error } = action.payload
      state.changePasswordData.loading = false
      state.changePasswordData.error = error
    },
  },
})

export const {
  registerRequest,
  registerSuccess,
  registerFail,
  loginRequest,
  loginSuccess,
  loginFail,
  logoutRequest,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFail,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFail,
  changeAvatarRequest,
  changeAvatarSuccess,
  changeAvatarFail,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
} = authSlice.actions

export default authSlice.reducer
