import { fork } from "redux-saga/effects"

import productSaga from "./product.saga"
import categorySaga from "./category.saga"
import discountSaga from "./discount.saga"
import typeSaga from "./type.saga"
import authSaga from "./auth.saga"
import favoriteSaga from "./favorite.saga"
import locationSaga from "./location.saga"
import orderSaga from "./order.saga"
import reviewSaga from "./review.saga"

export default function* rootSaga() {
  yield fork(authSaga)
  yield fork(categorySaga)
  yield fork(discountSaga)
  yield fork(favoriteSaga)
  yield fork(locationSaga)
  yield fork(orderSaga)
  yield fork(productSaga)
  yield fork(typeSaga)
  yield fork(reviewSaga)
}
