import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, generatePath } from "react-router-dom"
import { Button, Flex, Carousel, Space, notification, Col, Row } from "antd"
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons"
import qs from "qs"

import { addToCartRequest } from "../../../../redux/slicers/cart.slice"
import {
  favoriteProductRequest,
  unFavoriteProductRequest,
} from "../../../../redux/slicers/favorite.slice"

import { ROUTES } from "../../../../constants/routes"
import { HOME } from "../../../../constants/paging"

import * as S from "./style"
import { getProductListRequest } from "../../../../redux/slicers/product.slice"

function HomePage() {
  const { productList } = useSelector((state) => state.product)
  const { userInfo } = useSelector((state) => state.auth)
  const [quantity, setQuantity] = useState(1)
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 4 })

  const dispatch = useDispatch()

  const banners = [
    { backgroundColor: "#D32F2F", saleText: "SALE 50% ALL ITEMS" },
    { backgroundColor: "#E64A19", saleText: "SALE 75% ALL ITEMS" },
    { backgroundColor: "#D32F2F", saleText: "SALE 30% ALL ITEMS" },
  ]

  useEffect(() => {
    dispatch(
      getProductListRequest({
        page: 1,
        limit: HOME,
      })
    )
  }, [])

  const GALLERY = [
    {
      id: 1,
      image:
        "https://pubcdn.ivymoda.com/files/news/2024/03/07/8d05a65146458e531195d1acf205b1f3.jpg",
    },
    {
      id: 2,
      image:
        "https://pubcdn.ivymoda.com/files/news/2024/03/07/0adeb701bb545f81e02cd0d3a8f906e9.jpg",
    },
    {
      id: 3,
      image:
        "https://pubcdn.ivymoda.com/files/news/2024/03/07/8bca6d33233bf8bde0b700662f1c0b36.jpg",
    },
    {
      id: 4,
      image:
        "https://pubcdn.ivymoda.com/files/news/2024/03/07/72b5e575c31f3810c7187a190c61604b.jpg",
    },
  ]

  //Thả Tym
  const isFavorite = useMemo(() => {
    return productList.data.favorites?.some((item) => item.userId === userInfo.data.id)
  }, [productList.data, userInfo.data.id])

  const handleToggleFavorite = () => {
    if (!userInfo.data.id)
      return notification.error({
        message: "Bạn cần đăng nhập để thực hiện tính năng này",
      })
    if (isFavorite) {
      const favoriteData = productList.data.favorites.find(
        (item) => item.userId === userInfo.data.id
      )
      if (favoriteData) {
        dispatch(unFavoriteProductRequest({ id: favoriteData.id }))
      }
    } else {
      dispatch(
        favoriteProductRequest({
          data: {
            userId: userInfo.data.id,
            productId: productList.data.id,
          },
        })
      )
    }
  }

  //slide
  const handleScroll = (direction) => {
    const newStart = direction === "right" ? visibleRange.start + 1 : visibleRange.start - 1
    const newEnd = newStart + 4

    if (newStart >= 0 && newEnd <= productList.data.length) {
      setVisibleRange({ start: newStart, end: newEnd })
    }
  }

  //thêm vào giỏ hàng
  const handleAddToCart = (item) => {
    dispatch(
      addToCartRequest({
        id: item.id,
        image: item.image,
        name: item.name,
        price: item.price,
        quantity: quantity,
      })
    )
    notification.success({
      message: "Thêm vào giỏ hàng thành công",
    })
  }

  const renderProductItems = useMemo(() => {
    const visibleProducts = productList.data.slice(visibleRange.start, visibleRange.end)
    return (
      <div style={{ position: "relative" }}>
        <Row style={{ flexWrap: "nowrap", padding: "16px 0" }}>
          {visibleProducts.map((item, index) => (
            <Col lg={6} md={8} sm={12} key={index}>
              <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
                <Row>
                  <S.ProductListContainer>
                    <img src={item.image} alt={item.name} style={{ borderRadius: 5 }} />
                  </S.ProductListContainer>
                </Row>
              </Link>

              <S.TitleProduct>
                <div style={{ textAlign: "left", marginLeft: 45 }}>
                  <Space>
                    <span>Màu Áo : </span>

                    <button
                      style={{
                        borderRadius: "50%",
                        height: 16,
                        width: 16,
                        marginBottom: 10,
                        backgroundColor: item.hex,
                        marginTop: 10,
                        marginLeft: 5,
                      }}
                    ></button>
                    <S.iconCarts>
                      <Button
                        size="large"
                        type="text"
                        style={{ marginLeft: 95 }}
                        danger={isFavorite}
                        icon={
                          isFavorite ? (
                            <HeartFilled style={{ fontSize: 17 }} />
                          ) : (
                            <HeartOutlined style={{ fontSize: 17, color: "#414141" }} />
                          )
                        }
                        onClick={() => handleToggleFavorite()}
                      ></Button>
                    </S.iconCarts>
                  </Space>
                  <div>
                    <h3 style={{ fontWeight: 400 }}>{item.name}</h3>
                  </div>

                  <Space>
                    <span style={{ fontWeight: 400, marginRight: 90 }}>
                      {item.price.toLocaleString()} VND
                    </span>

                    <S.iconCarts>
                      <Button
                        size="large"
                        type="text"
                        style={{
                          fontSize: 20,
                        }}
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCartOutlined />
                      </Button>
                    </S.iconCarts>
                  </Space>
                </div>
              </S.TitleProduct>
            </Col>
          ))}
        </Row>

        <S.visibleRangeScroll>
          {visibleRange.start > 0 && (
            <Button
              onClick={() => handleScroll("left")}
              type="text"
              style={{
                position: "absolute",
                left: -15,
                top: "35%",
                fontSize: 20,
                height: 50,
                backgroundColor: "white",
              }}
            >
              <LeftOutlined />
            </Button>
          )}
          {visibleRange.end < productList.data.length && (
            <Button
              onClick={() => handleScroll("right")}
              type="text"
              style={{
                position: "absolute",
                right: -17,
                top: "35%",
                fontSize: 20,
                height: 50,
                backgroundColor: "white",
              }}
            >
              <RightOutlined />
            </Button>
          )}
        </S.visibleRangeScroll>
      </div>
    )
  }, [productList.data, isFavorite, visibleRange])

  //render GALLERY
  const renderGALLERY = useMemo(() => {
    return (
      <Row gutter={[16, 16]}>
        {GALLERY.map((item) => (
          <Col lg={6} md={8} sm={12} key={item.id}>
            <div style={{ marginLeft: 30, marginRight: 30 }}>
              <img src={item.image} alt="Gallery" style={{ borderRadius: 5 }} />
            </div>
          </Col>
        ))}
      </Row>
    )
  }, [])

  return (
    <S.HomeWrapper>
      <S.SlideBanners>
        <div style={{ display: "flex", marginBottom: 30, marginTop: 70 }}>
          {banners.map((banner, index) => (
            <div
              key={index}
              style={{
                backgroundColor: banner.backgroundColor,
                color: "white",
                padding: "10px",
                flex: 1,
                textAlign: "center",
              }}
            >
              {banner.saleText}
            </div>
          ))}
        </div>
        <div>
          <Carousel autoplay>
            <div>
              <img
                src="https://pubcdn.ivymoda.com/files/news/2024/03/06/03a8a09ebd2f19e13fb0b0bba0b355c6.jpg"
                alt="cccc"
              />
            </div>
            <div>
              <img
                src="https://pubcdn.ivymoda.com/files/news/2024/02/19/317fbe133d8504480dbebcd520a5c20c.jpg"
                alt="aaaa"
              />
            </div>
            <div>
              <img
                src="https://pubcdn.ivymoda.com/files/news/2024/03/02/783cb46d3c808c67f9bf50f9d19ed231.jpg"
                alt="bbbb"
              />
            </div>
            <div>
              <img
                src="https://pubcdn.ivymoda.com/files/news/2024/03/01/9efafd064cf26fa73035b2bf5ef81ad4.jpg"
                alt="cccc"
              />
            </div>
          </Carousel>
        </div>
      </S.SlideBanners>
      <br />
      <br />
      <S.buttonTitle>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              border: "1px solid #8e8686",
              height: 60,
              width: 250,
              borderTopLeftRadius: 50,
              borderBottomRightRadius: 30,
              marginLeft: "40%",
              marginBottom: 16,
            }}
          >
            <button
              style={{
                fontWeight: 600,
                marginBottom: 16,
                border: "1px solid #333",
                backgroundColor: "white",
                height: 70,
                width: 230,
                fontSize: 20,
                borderTopLeftRadius: 50,
                borderBottomRightRadius: 50,
              }}
            >
              Sản Phẩm
            </button>
          </div>
        </div>
      </S.buttonTitle>
      <S.ProductImage>{renderProductItems}</S.ProductImage>
      <S.buttonTitle2>
        <Link to={`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify({ categoryId: [1] })}`}>
          <Flex justify="center">
            <Button>Hiển thị thêm</Button>
          </Flex>
        </Link>
      </S.buttonTitle2>
      <br /> <br />
      <S.buttonTitle>
        <button
          style={{
            border: "1px solid #8e8686",
            height: 60,
            width: 250,
            borderTopLeftRadius: 50,
            borderBottomRightRadius: 30,
            marginLeft: "40%",
            marginBottom: 16,
          }}
        >
          <button
            style={{
              fontWeight: 600,
              marginBottom: 16,
              border: "1px solid #333",
              backgroundColor: "white",
              height: 70,
              width: 230,
              fontSize: 20,
              borderTopLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
          >
            Trưng Bày
          </button>
        </button>
      </S.buttonTitle>
      <br />
      <S.galleryList>
        <Row>{renderGALLERY}</Row>
      </S.galleryList>
    </S.HomeWrapper>
  )
}

export default HomePage
