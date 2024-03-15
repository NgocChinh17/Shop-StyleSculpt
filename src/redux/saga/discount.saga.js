import { takeEvery, put } from "redux-saga/effects"
import axios from "axios"

import {
  getDiscountListRequest,
  getDiscountListSuccess,
  getDiscountListFail,
} from "../slicers/discount.slice"

function* getDiscountListSaga() {
  try {
    const result = yield axios.get("http://localhost:4000/discounts")
    yield put(getDiscountListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getDiscountListFail({ error: "Lỗi..." }))
  }
}

export default function* DiscountSaga() {
  yield takeEvery(getDiscountListRequest, getDiscountListSaga)
}
