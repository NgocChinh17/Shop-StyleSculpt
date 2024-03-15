import { put, takeEvery } from "redux-saga/effects"
import axios from "axios"

import {
  getReviewListRequest,
  getReviewListSuccess,
  getReviewListFailure,
  reviewProductRequest,
  reviewProductSuccess,
  reviewProductFailure,
} from "../slicers/review.slice"

function* getReviewListSaga(action) {
  try {
    const { productId } = action.payload
    const result = yield axios.get("http://localhost:4000/reviews", {
      params: {
        _expand: "user",
        _sort: "createdAt",
        _order: "desc",
        productId: productId,
      },
    })
    yield put(getReviewListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getReviewListFailure({ error: "Lỗi" }))
  }
}

function* reviewProductSaga(action) {
  try {
    const { data } = action.payload
    const result = yield axios.post("http://localhost:4000/reviews", data)
    yield put(reviewProductSuccess({ data: result.data }))
    yield put(getReviewListRequest({ productId: data.productId }))
  } catch (e) {
    yield put(reviewProductFailure({ error: "Lỗi" }))
  }
}

export default function* reviewSaga() {
  yield takeEvery(getReviewListRequest, getReviewListSaga)
  yield takeEvery(reviewProductRequest, reviewProductSaga)
}
