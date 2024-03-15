import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { jwtDecode } from "jwt-decode"

import UserLayout from "../Components/Layout/UserLayout"
import ProfileLayout from "../Components/Layout/ProfileLayout"

import HomePage from "../Components/page/user/Home"
import ProductDetailPage from "../Components/page/user/ProductDetail"
import ProductListPage from "../Components/page/user/ProductList"
import Cart from "../Components/page/user/Cart"
import NotFoundPage from "../Components/page/NotFoundPage"
import RegisterPage from "../Components/page/Register"
import LoginPage from "../Components/page/Login"
import CheckoutPage from "../Components/page/user/Checkout"
import UserInfoPage from "../Components/page/user/UserInfo"
import OrderHistoryPage from "../Components/page/user/OrderHistory"
import ChangePasswordPage from "../Components/page/user/ChangePassword"
import FavoriteProductsPage from "../Components/page/user/FavoriteProducts"

import { ROUTES } from "../constants/routes"
import { getUserInfoRequest } from "../redux/slicers/auth.slice"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      const tokenData = jwtDecode(accessToken)
      dispatch(getUserInfoRequest({ id: parseInt(tokenData.sub) }))
    }
  }, [])
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route path={ROUTES.USER.PRODUCT_DETAIL} element={<ProductDetailPage />} />
          <Route path={ROUTES.USER.PRODUCT_LIST} element={<ProductListPage />} />
          <Route path={ROUTES.USER.CART} element={<Cart />} />
          <Route path={ROUTES.USER.CHECKOUT} element={<CheckoutPage />} />
          <Route element={<ProfileLayout />}>
            <Route path={ROUTES.USER.PROFILE} element={<Navigate to={ROUTES.USER.USER_INFO} />} />
            <Route path={ROUTES.USER.USER_INFO} element={<UserInfoPage />} />
            <Route path={ROUTES.USER.ORDER_HISTORY} element={<OrderHistoryPage />} />
            <Route path={ROUTES.USER.FAVORITE_PRODUCTS} element={<FavoriteProductsPage />} />
            <Route path={ROUTES.USER.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
