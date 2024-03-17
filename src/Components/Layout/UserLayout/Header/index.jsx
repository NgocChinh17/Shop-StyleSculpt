import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Space, Button, Dropdown, Menu, Badge, Popover, Row, Col, Input } from "antd"
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { useNavigate, Link } from "react-router-dom"
import qs from "qs"
import HeadlessTippy from "@tippyjs/react/headless"
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"

import { logoutRequest } from "../../../../redux/slicers/auth.slice"
import { getProductSuggestRequest } from "../../../../redux/slicers/product.slice"
import { addToCartRequest } from "../../../../redux/slicers/cart.slice"
import SearchItem from "./SearchItem"

import { ROUTES } from "../../../../constants/routes"

import "./header.scss"
import * as S from "./style"

const { Search } = Input

function Header() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showResult, setShowResult] = useState(false)

  const { userInfo } = useSelector((state) => state.auth)
  const { productSuggest } = useSelector((state) => state.product)
  const { cartList } = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //search
  useEffect(() => {
    dispatch(
      getProductSuggestRequest({
        keyword: searchTerm,
      })
    )
  }, [searchTerm])

  //avatar
  const items = [
    {
      label: "Thông Tin Cá Nhân",
      key: "1",
      onClick: () => navigate(ROUTES.USER.PROFILE),
    },
    {
      label: "Lịch Sử Đơn Hàng",
      key: "2",
      onClick: () => navigate(ROUTES.USER.ORDER_HISTORY),
    },
    {
      label: "Đăng Xuất",
      key: "3",
      onClick: () => dispatch(logoutRequest()),
    },
  ]

  const menuProps = {
    items,
  }

  useEffect(() => {
    const cartA = JSON.parse(localStorage.getItem("cart"))
    cartA.map((item) => {
      dispatch(
        addToCartRequest({
          id: item.id,
          image: item.image,
          name: item.name,
          price: item.price,
          size: item.size,
          quantity: item.quantity,
        })
      )
    })
  }, [])

  //menu
  const listMenu = [
    {
      label: "Trang Chủ",
      key: "1",
      onClick: () => navigate(`${ROUTES.USER.HOME}`),
    },
    {
      label: "Nam",
      key: "2",
      onClick: () => navigate(`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify({ categoryId: [1] })}`),
    },
    {
      label: "Nữ",
      key: "3",
      onClick: () => navigate(`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify({ categoryId: [2] })}`),
    },
    {
      label: "Trẻ Em",
      key: "4",
      onClick: () => navigate(`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify({ categoryId: [3] })}`),
    },
  ]

  //show cart
  const cartContent = (
    <div>
      {cartList.map((item) => (
        <div key={item.id}>
          <Space>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <p>{item.name}</p>
            <p>Price: ${item.price}</p>
          </Space>
        </div>
      ))}
      <Link to={ROUTES.USER.CART}>Xem Giỏ Hàng</Link>
    </div>
  )

  return (
    <S.HeaderWrapper>
      <Row type="flex" justify="space-around">
        <Col span={7}>
          <S.MenuHeader>
            <Menu mode="horizontal" items={listMenu} />
          </S.MenuHeader>
        </Col>

        <Col span={2}>
          <Link to={ROUTES.USER.HOME}>
            <S.LogoHeader>
              <Space>
                <h1
                  style={{
                    fontSize: 30,
                    color: "#333",
                    fontWeight: 700,
                    marginTop: 10,
                  }}
                >
                  Shop
                </h1>
              </Space>
              <h3 style={{ color: "#333" }}>StyleSculpt</h3>
            </S.LogoHeader>
          </Link>
        </Col>

        <Space>
          <Col span={2}>
            <Space>
              <S.InputSearch>
                <div style={{ width: "100%", position: "relative" }}>
                  <HeadlessTippy
                    interactive
                    visible={showResult && searchTerm && productSuggest.data.length > 0}
                    // visible={true}
                    render={(attrs) => (
                      <PerfectScrollbar
                        style={{
                          maxHeight: "400px",
                          width: 247,
                          backgroundColor: "rgb(255, 255, 255)",
                        }}
                      >
                        <div className="search-result" tabIndex="-1" {...attrs}>
                          <div className="wrapper">
                            {productSuggest.data.map((result) => (
                              <SearchItem key={result.id} data={result} />
                            ))}
                          </div>
                        </div>
                      </PerfectScrollbar>
                    )}
                    onClickOutside={() => setShowResult(false)}
                  >
                    <input
                      className="input-search"
                      style={{ width: 247, height: 30, borderRadius: 5 }}
                      type={"text"}
                      placeholder="Bạn tìm gì hôm nay"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setShowResult(true)}
                    ></input>
                  </HeadlessTippy>
                </div>
              </S.InputSearch>

              <S.HeaderCart>
                <Popover content={cartContent} title="Giỏ Hàng" trigger="hover">
                  <Badge count={cartList.length} size="small">
                    <Button>
                      <Link to={ROUTES.USER.CART}>
                        <ShoppingCartOutlined style={{ fontSize: 17 }} />
                      </Link>
                    </Button>
                  </Badge>
                </Popover>
              </S.HeaderCart>
            </Space>
          </Col>
          <Col span={4} style={{ marginBottom: 11 }}>
            <S.AvatarMenu>
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    {userInfo.data.id ? (
                      <Space>
                        <UserOutlined />
                        {userInfo.data.fullName}
                      </Space>
                    ) : (
                      <Link to={ROUTES.LOGIN} style={{ color: "#333" }}>
                        Login
                      </Link>
                    )}
                  </Space>
                </Button>
              </Dropdown>
            </S.AvatarMenu>
          </Col>
        </Space>
      </Row>
    </S.HeaderWrapper>
  )
}

export default Header
