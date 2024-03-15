import { IdcardOutlined, ShoppingOutlined, HeartOutlined, LockOutlined } from "@ant-design/icons"
import { ROUTES } from "../../../constants/routes"

export const PROFILE_MENU = [
  {
    label: "Thông tin cá nhân",
    path: ROUTES.USER.USER_INFO,
    icon: <IdcardOutlined />,
  },
  {
    label: "Lịch sử mua hàng",
    path: ROUTES.USER.ORDER_HISTORY,
    icon: <ShoppingOutlined />,
  },
  {
    label: "Đổi mật khẩu",
    path: ROUTES.USER.CHANGE_PASSWORD,
    icon: <LockOutlined />,
  },
  {
    label: "Sản phẩm yêu thích",
    path: ROUTES.USER.FAVORITE_PRODUCTS,
    icon: <HeartOutlined />,
  },
]
