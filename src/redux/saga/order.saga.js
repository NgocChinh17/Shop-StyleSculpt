import { takeEvery, put } from "redux-saga/effects"
import axios from "axios"

import {
  getOrderListRequest,
  getOrderListSuccess,
  getOrderListFail,
  orderProductRequest,
  orderProductSuccess,
  orderProductFail,
} from "../slicers/order.slice"
import { clearCartRequest } from "../slicers/cart.slice"

function* getOrderListSaga(action) {
  try {
    const { userId } = action.payload
    const result = yield axios.get("http://localhost:4000/orders", {
      params: {
        userId: userId,
        _embed: "orderDetails",
      },
    })
    yield put(getOrderListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getOrderListFail({ error: "Lỗi..." }))
  }
}

function* orderProductSaga(action) {
  try {
    const { data, callback } = action.payload
    const { cartList, ...orderData } = data
    const orderResult = yield axios.post("http://localhost:4000/orders", orderData)
    for (let i = 0; i < cartList.length; i++) {
      yield axios.post("http://localhost:4000/orderDetails", {
        orderId: orderResult.data.id,
        productId: cartList[i].productId,
        productName: cartList[i].name,
        price: cartList[i].price,
        quantity: cartList[i].quantity,
      })
    }
    yield put(clearCartRequest())
    yield callback()
    yield put(orderProductSuccess())
  } catch (e) {
    yield put(orderProductFail({ error: "Lỗi..." }))
  }
}

export default function* categorySaga() {
  yield takeEvery(getOrderListRequest, getOrderListSaga)
  yield takeEvery(orderProductRequest, orderProductSaga)
}
