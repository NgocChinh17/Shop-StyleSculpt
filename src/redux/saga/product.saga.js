import { takeEvery, put, debounce } from "redux-saga/effects"
import axios from "axios"

import {
  getProductListRequest,
  getProductListSuccess,
  getProductListFail,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFail,
  getProductSuggestRequest,
  getProductSuggestSuccess,
  getProductSuggestFail,
} from "../slicers/product.slice"

function* getProductListSaga(action) {
  try {
    const { categoryId, page, limit, more, priceOder, discountId, keyword, typeId } = action.payload

    const result = yield axios.get("http://localhost:4000/products", {
      params: {
        ...(priceOder && {
          _sort: "price",
          _order: priceOder,
        }),
        ...(keyword && {
          q: keyword,
        }),
        categoryId: categoryId,
        discountId: discountId,
        typeId: typeId,
        _page: page,
        _limit: limit,
        _expand: "category",
      },
    })
    yield put(
      getProductListSuccess({
        data: result.data,
        more: more,
        meta: {
          total: parseInt(result.headers["x-total-count"]),
          page: page,
          limit: limit,
        },
      })
    )
  } catch (e) {
    yield put(getProductListFail({ error: "Lỗi..." }))
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: "category",
        _embed: "favorites",
      },
    })
    yield put(getProductDetailSuccess({ data: result.data }))
  } catch (e) {
    yield put(getProductDetailFail({ error: "Lỗi..." }))
  }
}

function* getProductSuggestSaga(action) {
  try {
    const { keyword } = action.payload
    const result = yield axios.get(`http://localhost:4000/products`, {
      params: {
        ...(keyword && {
          q: keyword,
        }),
      },
    })
    yield put(
      getProductSuggestSuccess({
        data: result.data,
      })
    )
  } catch (e) {
    yield put(getProductSuggestFail({ error: "Lỗi..." }))
  }
}

export default function* productSaga() {
  yield takeEvery(getProductListRequest, getProductListSaga)
  yield takeEvery(getProductDetailRequest, getProductDetailSaga)
  yield debounce(300, getProductSuggestRequest, getProductSuggestSaga)
}
