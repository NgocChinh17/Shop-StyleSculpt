import { useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import {
  InputNumber,
  Table,
  Image,
  Button,
  Popconfirm,
  notification,
  Row,
  Col,
  Card,
  Breadcrumb,
  Space,
} from "antd"
import { DeleteOutlined, HomeOutlined } from "@ant-design/icons"

import * as S from "./style"

import { ROUTES } from "../../../../constants/routes"
import { removeFromCart, updateFormCart } from "../../../../redux/slicers/cart.slice"

function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartList } = useSelector((state) => state.cart)

  const totalPrice = useMemo(
    () => cartList.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartList]
  )

  const handleChangeQuantity = (productId, value) => {
    dispatch(
      updateFormCart({
        productId: productId,
        quantity: value,
      })
    )
  }

  const handleDelete = (key) => {
    dispatch(removeFromCart(key))
    notification.success({
      message: "Xóa Sản Phẩm Thành Công",
    })
  }

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image, record) => <Image src={record.image} alt={record.name} width={50} />,
    },
    {
      title: "Giá Sản Phẩm",
      dataIndex: "price",
      key: "price",
      render: (price) => price.toLocaleString(),
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          defaultValue={record.quantity}
          min={1}
          onChange={(value) => handleChangeQuantity(record.productId, value)}
        />
      ),
    },
    {
      title: "Thành Tiền",
      dataIndex: "total",
      key: "total",
      render: (_, record) => (record.price * record.quantity).toLocaleString(),
    },
    {
      title: "Xóa",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa sản phẩm này?"
          onConfirm={() => handleDelete(record.key)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button type="danger" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ]

  const renderCartList = useMemo(() => {
    return cartList.map((item) => ({
      key: item.id,
      image: item.image,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }))
  }, [cartList])

  return (
    <S.cartPageWrapper>
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
            title: (
              <Link to={ROUTES.USER.PRODUCT_DETAIL}>
                <Space>
                  <span>Trang Sản Phẩm chi tiết</span>
                </Space>
              </Link>
            ),
          },
          {
            title: "Giỏ Hàng",
          },
        ]}
      />
      <br />
      <Table columns={columns} dataSource={renderCartList} pagination={false} />
      <Row justify="end" style={{ margin: "24px 0" }}>
        <Col span={4} style={{ textAlign: "right" }}>
          <Card size="small" title="Tổng tiền">
            {totalPrice.toLocaleString()} VND
          </Card>
        </Col>
      </Row>
      <S.cartPageContainer>
        <Row justify="end">
          <Button
            type="primary"
            disabled={!cartList.length}
            onClick={() => navigate(ROUTES.USER.CHECKOUT)}
          >
            Tiếp theo
          </Button>
        </Row>
      </S.cartPageContainer>
    </S.cartPageWrapper>
  )
}

export default CartPage
