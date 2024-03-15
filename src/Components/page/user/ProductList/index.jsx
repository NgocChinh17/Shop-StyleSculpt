import { useEffect, useMemo, useState } from "react"
import {
  Row,
  Col,
  Card,
  Flex,
  Button,
  Select,
  Checkbox,
  notification,
  Space,
  Breadcrumb,
} from "antd"
import { HeartOutlined, HeartFilled, ShoppingCartOutlined, HomeOutlined } from "@ant-design/icons"
import { Link, generatePath, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import qs from "qs"

import { getProductListRequest } from "../../../../redux/slicers/product.slice"
import { getCategoryListRequest } from "../../../../redux/slicers/category.slice"
import { getDiscountListRequest } from "../../../../redux/slicers/discount.slice"
import { getTypeListRequest } from "../../../../redux/slicers/type.slice"
import { addToCartRequest } from "../../../../redux/slicers/cart.slice"

import {
  favoriteProductRequest,
  unFavoriteProductRequest,
} from "../../../../redux/slicers/favorite.slice"

import { ROUTES } from "../../../../constants/routes"
import { PRODUCT_LIMIT } from "../../../../constants/paging"

import * as S from "./style"

function ProductListPage() {
  const { productList } = useSelector((state) => state.product)
  const { categoryList } = useSelector((state) => state.category)
  const { discountList } = useSelector((state) => state.discount)
  const { typeList } = useSelector((state) => state.type)
  const { userInfo } = useSelector((state) => state.auth)
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { search } = useLocation()

  const searchParams = useMemo(() => {
    const params = qs.parse(search, { ignoreQueryPrefix: true })
    return {
      categoryId: params.categoryId ? params.categoryId.map((item) => parseInt(item)) : [],
      typeId: params.typeId ? params.typeId.map((item) => parseInt(item)) : [],
      discountId: params.discountId ? params.discountId.map((item) => parseInt(item)) : [],
      priceOder: params.priceOder,
      keyword: params.keyword || "",
    }
  }, [search])

  useEffect(() => {
    dispatch(getCategoryListRequest())
    dispatch(getDiscountListRequest())
    dispatch(getTypeListRequest())
  }, [])

  useEffect(() => {
    dispatch(
      getProductListRequest({
        ...searchParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    )
  }, [searchParams])

  const handleFilter = (key, value) => {
    const newFilterParams = { ...searchParams, [key]: value }
    navigate(`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify(newFilterParams)}`)
  }

  const handleShowPage = () => {
    dispatch(
      getProductListRequest({
        ...searchParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    )
  }

  const renderCategoryItems = useMemo(() => {
    return categoryList.data.map((item, index) => {
      return (
        <Checkbox key={item.id} value={item.id}>
          {item.name}
        </Checkbox>
      )
    })
  }, [categoryList.data])

  const renderDiscountItems = useMemo(() => {
    return discountList.data.map((item, index) => {
      return (
        <Checkbox key={item.id} value={item.id}>
          {item.name}
        </Checkbox>
      )
    })
  }, [discountList.data])

  const renderTypeItems = useMemo(() => {
    return typeList.data.map((item, index) => {
      return (
        <Checkbox key={item.id} value={item.id}>
          {item.name}
        </Checkbox>
      )
    })
  }, [typeList.data])

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
    return productList.data.map((item, index) => {
      return (
        <Col lg={6} md={8} sm={12} key={index}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
            <S.ProductListContainer>
              <img src={item.image} alt="aaaa" style={{ borderRadius: 5 }} />
            </S.ProductListContainer>
          </Link>
          <Space>
            <span style={{ display: "inline-block" }}>Màu Áo : </span>
            <button
              style={{
                borderRadius: "50%",
                height: 16,
                width: 16,
                marginBottom: 10,
                backgroundColor: [item.hex],
                marginTop: 10,
                marginLeft: 5,
              }}
            ></button>
            <Button
              size="large"
              type="text"
              style={{ marginLeft: 90 }}
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
          </Space>
          <h3
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: "#57585A",
            }}
          >
            {item.name}
          </h3>
          <div style={{ marginBottom: 40 }}>
            <Space>
              <h4
                style={{
                  fontWeight: 500,
                  color: "black",
                }}
              >
                {item.price.toLocaleString()} VND
              </h4>
              <Button
                size="large"
                type="text"
                style={{
                  marginLeft: 90,
                  float: "left",
                  fontSize: 20,
                }}
                onClick={() => handleAddToCart(item)}
              >
                <ShoppingCartOutlined />
              </Button>
            </Space>
          </div>
        </Col>
      )
    })
  }, [productList.data])

  return (
    <S.ProductListWrapper>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={ROUTES.USER.HOME}>
                <Space>
                  <HomeOutlined />
                  <span>Trang chủ</span>
                </Space>
              </Link>
            ),
          },
          {
            title: "Trang Sản Phẩm",
          },
        ]}
        style={{ marginBottom: 8 }}
      />
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <Card title="Bộ lọc" size="small" style={{ marginTop: 47 }}>
            <h3>Giới tính</h3>
            <Checkbox.Group
              style={{ width: "166px" }}
              placeholder="Loại Hàng  Cho"
              allowClear
              onChange={(value) => handleFilter("categoryId", value)}
              value={searchParams.categoryId}
            >
              {renderCategoryItems}
            </Checkbox.Group>
            <br /> <br />
            <h3>Discount</h3>
            <Checkbox.Group
              style={{ width: "166px" }}
              placeholder="Mức Chiết Khấu"
              allowClear
              onChange={(value) => handleFilter("discountId", value)}
              value={searchParams.discountId}
            >
              {renderDiscountItems}
            </Checkbox.Group>
            <br /> <br />
            <h3>Các loại Sản phẩm</h3>
            <Checkbox.Group
              style={{ width: "166px" }}
              placeholder="Loại Sản Phẩm"
              allowClear
              onChange={(value) => handleFilter("typeId", value)}
              value={searchParams.typeId}
            >
              {renderTypeItems}
            </Checkbox.Group>
          </Card>
        </Col>

        <Col span={20}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <S.locSanPham>
                <Select
                  onChange={(value) => handleFilter("priceOder", value)}
                  value={searchParams.priceOder}
                  placeholder="Sắp xếp theo"
                  allowClear
                  style={{ width: "200px", marginLeft: 818 }}
                >
                  <Select.Option value="asc">Giá tăng dần</Select.Option>
                  <Select.Option value="desc">Giá giảm dần</Select.Option>
                </Select>
              </S.locSanPham>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>{renderProductItems}</Row>

          {productList.data.length < productList.meta.total && (
            <Flex justify="center" style={{ marginTop: 16 }}>
              <Button onClick={() => handleShowPage()}>Hiển thị thêm</Button>
            </Flex>
          )}
        </Col>
      </Row>
    </S.ProductListWrapper>
  )
}

export default ProductListPage
