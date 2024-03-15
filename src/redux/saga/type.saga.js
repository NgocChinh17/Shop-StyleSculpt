import { takeEvery, put } from "redux-saga/effects"
import axios from "axios"

import { getTypeListRequest, getTypeListSuccess, getTypeListFail } from "../slicers/type.slice"

function* getTypeListSaga() {
  try {
    const result = yield axios.get("http://localhost:4000/types")
    yield put(getTypeListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getTypeListFail({ error: "Lỗi..." }))
  }
}

export default function* TypeSaga() {
  yield takeEvery(getTypeListRequest, getTypeListSaga)
}
