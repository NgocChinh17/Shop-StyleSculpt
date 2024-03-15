import { takeEvery, put } from "redux-saga/effects"
import axios from "axios"

import {
  getFavoriteListRequest,
  getFavoriteListSuccess,
  getFavoriteListFailure,
  favoriteProductRequest,
  favoriteProductSuccess,
  favoriteProductFailure,
  unFavoriteProductRequest,
  unFavoriteProductSuccess,
  unFavoriteProductFailure,
} from "../slicers/favorite.slice"

function* getFavoriteListSaga(action) {
  try {
    const { userId, callback } = action.payload
    const result = yield axios.get("http://localhost:4000/favorites", {
      params: {
        userId: userId,
        _expand: "product",
      },
    })
    if (callback) callback()
    yield put(getFavoriteListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getFavoriteListFailure({ error: "Lỗi" }))
  }
}

function* favoriteProductSaga(action) {
  try {
    const { data } = action.payload
    const result = yield axios.post("http://localhost:4000/favorites", data)
    yield put(favoriteProductSuccess({ data: result.data }))
  } catch (e) {
    yield put(favoriteProductFailure({ error: "Lỗi" }))
  }
}

function* unFavoriteProductSaga(action) {
  try {
    const { id } = action.payload
    yield axios.delete(`http://localhost:4000/favorites/${id}`)
    yield put(unFavoriteProductSuccess({ id: id }))
  } catch (e) {
    yield put(unFavoriteProductFailure({ error: "Lỗi" }))
  }
}

export default function* favoriteSaga() {
  yield takeEvery(getFavoriteListRequest, getFavoriteListSaga)
  yield takeEvery(favoriteProductRequest, favoriteProductSaga)
  yield takeEvery(unFavoriteProductRequest, unFavoriteProductSaga)
}
