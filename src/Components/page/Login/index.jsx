import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Input, Button } from "antd"
import { Link, useNavigate } from "react-router-dom"

import { ROUTES } from "../../../constants/routes"
import { loginRequest } from "../../../redux/slicers/auth.slice"

import * as S from "./style"
import { Row, Col } from "antd" // Import Row and Col from Ant Design

const LoginPage = () => {
  const [loginForm] = Form.useForm()

  const { loginData } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: "email",
          errors: [" "],
        },
        {
          name: "password",
          errors: [loginData.error],
        },
      ])
    }
  }, [loginData.error])

  const handleSubmit = (values) => {
    dispatch(
      loginRequest({
        data: values,
        callback: (role) => navigate(role === "admin" ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.HOME),
      })
    )
  }

  return (
    <S.LoginContainer>
      <S.LoginForm>
        <Form
          form={loginForm}
          name="loginForm"
          layout="vertical"
          onFinish={(values) => handleSubmit(values)}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <div style={{ marginBottom: 16 }}>
            Bạn chưa có tài khoản? <Link to={ROUTES.REGISTER}>Đăng ký</Link>
          </div>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form>
      </S.LoginForm>
    </S.LoginContainer>
  )
}

export default LoginPage
