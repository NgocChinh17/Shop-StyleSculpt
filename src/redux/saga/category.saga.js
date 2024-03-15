import { takeEvery, put } from "redux-saga/effects"
import axios from "axios"

import {
  getCategoryListRequest,
  getCategoryListSuccess,
  getCategoryListFail,
} from "../slicers/category.slice"

function* getCategoryListSaga() {
  try {
    const result = yield axios.get("http://localhost:4000/categories")
    yield put(getCategoryListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getCategoryListFail({ error: "Lỗi..." }))
  }
}

export default function* categorySaga() {
  yield takeEvery(getCategoryListRequest, getCategoryListSaga)
}
