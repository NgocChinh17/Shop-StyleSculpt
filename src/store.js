import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import productReducer from "./redux/slicers/product.slice"
import categoryReducer from "./redux/slicers/category.slice"
import discountReducer from "./redux/slicers/discount.slice"
import taskReducer from "./redux/slicers/task.slice"
import typeReducer from "./redux/slicers/type.slice"
import authReducer from "./redux/slicers/auth.slice"
import cartReducer from "./redux/slicers/cart.slice"
import favoriteReducer from "./redux/slicers/favorite.slice"
import locationReducer from "./redux/slicers/location.slice"
import orderReducer from "./redux/slicers/order.slice"
import reviewReducer from "./redux/slicers/review.slice"

import rootSaga from "./redux/saga"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    category: categoryReducer,
    discount: discountReducer,
    favorite: favoriteReducer,
    location: locationReducer,
    order: orderReducer,
    product: productReducer,
    task: taskReducer,
    type: typeReducer,
    review: reviewReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
})

sagaMiddleware.run(rootSaga)

export default store
