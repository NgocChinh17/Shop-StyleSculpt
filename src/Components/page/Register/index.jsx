import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Form, Input, Button } from "antd"

import { ROUTES } from "../../../constants/routes"
import { registerRequest } from "../../../redux/slicers/auth.slice"

import * as S from "./style"

const RegisterPage = () => {
  const [registerForm] = Form.useForm()

  const { registerData } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (registerData.error) {
      registerForm.setFields([
        {
          name: "email",
          errors: [registerData.error],
        },
      ])
    }
  }, [registerData.error])

  const handleSubmit = (values) => {
    dispatch(
      registerRequest({
        data: {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          role: "user",
          birthday: null,
          phoneNumber: null,
          avatar: null,
        },
        callback: () => navigate(ROUTES.LOGIN),
      })
    )
  }

  return (
    <S.RegisterPageWrapper>
      <S.RegisterPageContainer>
        <Form
          form={registerForm}
          name="registerForm"
          layout="vertical"
          onFinish={(values) => handleSubmit(values)}
          autoComplete="off"
        >
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Họ và tên là bắt buộc",
              },
              {
                type: "string",
                min: 3,
                max: 32,
                message: "Họ và tên phải từ 3-32 kí tự",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Email là bắt buộc",
              },
              {
                type: "email",
                message: "Email không đúng định dạng",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Mật khẩu là bắt buộc",
              },
              // {
              //   pattern:
              //     /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g,
              //   message: "Mật khẩu yếu",
              // },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Mật khẩu là bắt buộc",
              },
              (params) => ({
                validator(_, value) {
                  if (!value || params.getFieldValue("password") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("Mật khẩu xác nhận không khớp"))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={registerData.loading}>
            Đăng ký
          </Button>{" "}
          <div style={{ marginTop: 20, marginLeft: 200 }}>
            <Link to={ROUTES.LOGIN}>Quay lại trang đăng nhập</Link>
          </div>
        </Form>
      </S.RegisterPageContainer>
    </S.RegisterPageWrapper>
  )
}

export default RegisterPage
