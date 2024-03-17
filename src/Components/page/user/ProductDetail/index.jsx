import { useEffect, useState, useMemo } from "react"
import { useParams, Link, useNavigate, generatePath } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Space,
  InputNumber,
  Row,
  Col,
  notification,
  Breadcrumb,
  Card,
  Rate,
  Form,
  Input,
  Tabs,
} from "antd"
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  HomeOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons"

import {
  getProductDetailRequest,
  getProductListRequest,
} from "../../../../redux/slicers/product.slice"
import { addToCartRequest } from "../../../../redux/slicers/cart.slice"
import { getReviewListRequest, reviewProductRequest } from "../../../../redux/slicers/review.slice"
import {
  favoriteProductRequest,
  unFavoriteProductRequest,
} from "../../../../redux/slicers/favorite.slice"

import { ROUTES } from "../../../../constants/routes"
import { HOME } from "../../../../constants/paging"
import dayjs from "dayjs"
import * as S from "./style"

function ProductDetailPage() {
  const { id } = useParams()
  const [reviewForm] = Form.useForm()
  const [quantity, setQuantity] = useState(1)
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 4 })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { productDetail } = useSelector((state) => state.product)
  const { productList } = useSelector((state) => state.product)
  const { reviewList } = useSelector((state) => state.review)
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: id }))
    dispatch(getReviewListRequest({ productId: parseInt(id) }))
  }, [id])

  useEffect(() => {
    dispatch(
      getProductListRequest({
        page: 1,
        limit: HOME,
      })
    )
  }, [])

  const handleAddToCart = () => {
    dispatch(
      addToCartRequest({
        id: productDetail.data.id,
        image: productDetail.data.image,
        name: productDetail.data.name,
        price: productDetail.data.price,
        quantity: quantity,
      })
    )
    notification.success({
      message: "Thêm vào giỏ hàng thành công",
    })
  }

  //tính tổng số sao
  const productRate = useMemo(() => {
    const totalRate = reviewList.data.reduce((total, item) => total + item.rate, 0)
    return reviewList.data.length ? totalRate / reviewList.data.length : 0
  }, [reviewList.data])

  //review sản phẩm
  const renderReviewList = useMemo(() => {
    return reviewList.data.map((item) => {
      return (
        <S.ReviewItemWrapper key={item.id}>
          <Space>
            <h3>{item.user.fullName}</h3> <br />
            <p>{dayjs(item.createdAt).format("DD/MM/YYYY")}</p>
            <Rate value={item.rate} disabled style={{ display: "block", fontSize: 12 }} /> <br />
            <p>{item.comment}</p>
          </Space>{" "}
          <br /> <br />
        </S.ReviewItemWrapper>
      )
    })
  }, [reviewList.data])

  //form review
  const renderReviewForm = useMemo(() => {
    if (userInfo.data.id) {
      const isReviewed = reviewList.data.some((item) => item.userId === userInfo.data.id)
      if (isReviewed) {
        return <S.ReviewFormWrapper>Bạn đã đánh giá sản phẩm này</S.ReviewFormWrapper>
      }
      return (
        <S.ReviewFormWrapper>
          <Form
            form={reviewForm}
            name="loginForm"
            layout="vertical"
            initialValues={{
              rate: 0,
              comment: "",
            }}
            onFinish={(values) => handleReviewProduct(values)}
          >
            <Form.Item
              label="Đánh giá sao"
              name="rate"
              rules={[
                { required: true, message: "Nhận xét là bắt buộc" },
                {
                  min: 1,
                  type: "number",
                  message: "Đánh giá sao là bắt buộc",
                },
              ]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              label="Nhận xét"
              name="comment"
              rules={[{ required: true, message: "Nhận xét là bắt buộc" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi
            </Button>
          </Form>
        </S.ReviewFormWrapper>
      )
    }
    return <S.ReviewFormWrapper>Bạn chưa đăng nhập</S.ReviewFormWrapper>
  }, [reviewList.data, userInfo.data])

  //bảng đánh giá
  const handleReviewProduct = (values) => {
    dispatch(
      reviewProductRequest({
        data: {
          ...values,
          userId: userInfo.data.id,
          productId: productDetail.data.id,
        },
      })
    )
    notification.success({
      message: "Đánh giá sản phẩm thành công",
    })
  }

  //Thả Tym
  const isFavorite = useMemo(() => {
    return productDetail.data.favorites?.some((item) => item.userId === userInfo.data.id)
  }, [productDetail.data, userInfo.data.id])

  const handleToggleFavorite = () => {
    if (!userInfo.data.id)
      return notification.error({
        message: "Bạn cần đăng nhập để thực hiện tính năng này",
      })
    if (isFavorite) {
      const favoriteData = productDetail.data.favorites.find(
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
            productId: productDetail.data.id,
          },
        })
      )
    }
  }

  //tabs
  const onChange = (key) => {
    console.log(key)
  }

  const items = [
    {
      key: "1",
      label: "Giới Thiệu Sản Phẩm",
      children: (
        <div
          dangerouslySetInnerHTML={{ __html: productDetail.data.intros }}
          style={{ fontSize: 16, minHeight: 209 }}
        />
      ),
    },
    {
      key: "2",
      label: "Chi Tiết",
      children: (
        <div
          dangerouslySetInnerHTML={{ __html: productDetail.data.details }}
          style={{ fontSize: 16, minHeight: 209 }}
        />
      ),
    },
  ]

  //slide
  const handleScroll = (direction) => {
    const newStart = direction === "right" ? visibleRange.start + 1 : visibleRange.start - 1
    const newEnd = newStart + 4

    if (newStart >= 0 && newEnd <= productList.data.length) {
      setVisibleRange({ start: newStart, end: newEnd })
    }
  }
  //bạn có thể thích
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
                <div style={{ textAlign: "left", marginLeft: 60 }}>
                  <div>
                    <h3 style={{ fontWeight: 400 }}>{item.name}</h3>
                  </div>

                  <Space>
                    <span style={{ fontWeight: 600, marginRight: 80 }}>
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
                right: -70,
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

  return (
    <S.ProductDetailWrapper>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={ROUTES.USER.HOME}>
                <Space>
                  <HomeOutlined />
                  <span>Home</span>
                </Space>
              </Link>
            ),
          },
          {
            title: (
              <Link to={ROUTES.USER.PRODUCT_LIST}>
                <Space>
                  <span>Trang Sản Phẩm</span>
                </Space>
              </Link>
            ),
          },
          {
            title: productDetail.data.name,
          },
        ]}
      />
      <br />
      <Row gutter={[16, 16]}>
        <Col md={10} sm={24}>
          <S.productImage>
            <img
              src={productDetail.data.image}
              alt="aaa"
              style={{
                width: 300,
                height: "auto",
                borderRadius: 5,
                display: "inline-block",
                float: "left",
              }}
            />
          </S.productImage>
        </Col>

        <Col md={14} sm={24}>
          <div style={{ float: "right", fontSize: 17 }}>
            <S.AfterTitleProduct>
              <div style={{ fontFamily: "sans-serif", marginRight: 427 }}>
                <div style={{ paddingBottom: 20, fontSize: 30 }}> {productDetail.data.name}</div>
                <div>SKU: {productDetail.data.code}</div>
                <br />
                <Space>
                  <Rate value={productRate} allowHalf disabled style={{ fontSize: 15 }} />
                  <span>{`(${productRate ? `${productRate} sao` : "0 đánh giá"})`}</span>
                </Space>
                <br /> <br />
                <Space>
                  <div style={{ paddingBottom: 20 }}>
                    {productDetail.data.price?.toLocaleString()} VND
                  </div>
                </Space>
                <div>Màu Sắc : {productDetail.data.colors}</div>
                <br />
                <button
                  style={{
                    borderRadius: "50%",
                    height: 20,
                    width: 20,
                    marginBottom: 10,
                    backgroundColor: [productDetail.data.hex],
                  }}
                ></button>
                <br />
                <br />
                <Space>
                  <div>Số Lượng </div>
                  <InputNumber
                    min={1}
                    max={10}
                    defaultValue={1}
                    style={{ width: 60 }}
                    onChange={(value) => setQuantity(value)}
                  />
                </Space>
                <br />
                <br />
                <Space>
                  <Button onClick={() => handleAddToCart()}>
                    <ShoppingCartOutlined />
                    Thêm Vào Giỏ
                  </Button>
                  <div>
                    <Button onClick={() => handleAddToCart()}>
                      <ShoppingCartOutlined />
                      <Link to={ROUTES.USER.CART} style={{ marginLeft: 5 }}>
                        Mua
                      </Link>
                    </Button>
                  </div>
                  <Button
                    size="large"
                    type="text"
                    danger={isFavorite}
                    icon={
                      isFavorite ? (
                        <HeartFilled style={{ fontSize: 24 }} />
                      ) : (
                        <HeartOutlined style={{ fontSize: 24, color: "#414141" }} />
                      )
                    }
                    onClick={() => handleToggleFavorite()}
                  ></Button>
                  {productDetail.data?.favorites?.length || 0}
                </Space>
              </div>
            </S.AfterTitleProduct>
            <S.gioiThieu>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </S.gioiThieu>
          </div>
          <br />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={16} md={24}>
          <Card size="small" title="Đánh giá" bordered={false} style={{ marginTop: 16 }}>
            {renderReviewForm}
            {renderReviewList}
          </Card>
        </Col>
      </Row>

      <h2 style={{ marginTop: 20 }}>Có Thể Bạn Sẽ Thích</h2>
      <S.ProductImage>{renderProductItems}</S.ProductImage>
    </S.ProductDetailWrapper>
  )
}

export default ProductDetailPage
