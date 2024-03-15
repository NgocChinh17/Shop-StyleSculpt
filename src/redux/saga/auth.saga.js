import { takeEvery, put } from "redux-saga/effects"
import { notification } from "antd"
import axios from "axios"

import {
  registerRequest,
  registerSuccess,
  registerFail,
  loginRequest,
  loginSuccess,
  loginFail,
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
} from "../slicers/auth.slice"

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload
    const result = yield axios.post("http://localhost:4000/register", data)
    yield put(registerSuccess({ data: result.data }))
    yield callback()
    notification.success({
      message: "Đăng ký thành công",
    })
  } catch (e) {
    yield put(
      registerFail({
        error: e.response.data === "Email already exists" ? "Email đã tồn tại" : e.response.data,
      })
    )
  }
}

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload
    const result = yield axios.post("http://localhost:4000/login", data)
    yield localStorage.setItem("accessToken", result.data.accessToken)
    yield put(loginSuccess({ data: result.data.user }))
    yield callback(result.data.user.role)
    notification.success({
      message: "Đăng nhập thành công",
    })
  } catch (e) {
    yield put(loginFail({ error: "Email hoặc mật khẩu không đúng" }))
  }
}

function* getUserInfo(action) {
  try {
    const { id } = action.payload
    const result = yield axios.get(`http://localhost:4000/users/${id}`)
    yield put(getUserInfoSuccess({ data: result.data }))
  } catch (e) {
    yield put(getUserInfoFail({ error: "Lỗi..." }))
  }
}

function* updateUserInfoSaga(action) {
  try {
    const { id, data } = action.payload
    const result = yield axios.patch(`http://localhost:4000/users/${id}`, data)
    yield put(updateUserInfoSuccess({ data: result.data }))
    notification.success({
      message: "Cập nhật thành công",
    })
  } catch (e) {
    yield put(updateUserInfoFail({ error: "Lỗi..." }))
  }
}

function* changeAvatarSaga(action) {
  try {
    const { id, data } = action.payload
    const result = yield axios.patch(`http://localhost:4000/users/${id}`, data)
    yield put(changeAvatarSuccess({ data: result.data }))
    notification.success({
      message: "Cập nhật thành công",
    })
  } catch (e) {
    yield put(changeAvatarFail({ error: "Lỗi..." }))
  }
}

function* changePasswordSaga(action) {
  try {
    const { id, data, callback } = action.payload
    yield axios.post("http://localhost:4000/login", {
      email: data.email,
      password: data.password,
    })
    const result = yield axios.patch(`http://localhost:4000/users/${id}`, {
      password: data.newPassword,
    })
    callback()
    yield put(changePasswordSuccess({ data: result.data }))
  } catch (e) {
    yield put(changePasswordFailure({ error: "Lỗi" }))
  }
}

export default function* authSaga() {
  yield takeEvery(registerRequest, registerSaga)
  yield takeEvery(loginRequest, loginSaga)
  yield takeEvery(getUserInfoRequest, getUserInfo)
  yield takeEvery(updateUserInfoRequest, updateUserInfoSaga)
  yield takeEvery(changeAvatarRequest, changeAvatarSaga)
  yield takeEvery(changePasswordRequest, changePasswordSaga)
}
