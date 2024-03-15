import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, Input } from "antd"

import { changePasswordRequest } from "../../../../redux/slicers/auth.slice"

function ChangePassword() {
  const [changePasswordForm] = Form.useForm()

  const { userInfo, changePasswordData } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (changePasswordData.error) {
      changePasswordForm.setFields([
        {
          name: "password",
          errors: ["Mật khẩu cũ không đúng!"],
        },
      ])
    }
  }, [changePasswordData.error])

  const handleChangePassword = (values) => {
    dispatch(
      changePasswordRequest({
        id: userInfo.data.id,
        data: {
          email: userInfo.data.email,
          password: values.password,
          newPassword: values.newPassword,
        },
        callback: () => changePasswordForm.resetFields(),
      })
    )
  }

  return (
    <Form
      form={changePasswordForm}
      name="changePasswordForm"
      layout="vertical"
      onFinish={(values) => handleChangePassword(values)}
      autoComplete="off"
    >
      <Form.Item
        label="Mật khẩu cũ"
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu cũ!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Mật khẩu mới"
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu mới!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Xác nhận mật khẩu mới"
        name="confirmNewPassword"
        rules={[
          {
            required: true,
            message: "Vui lòng xác nhận mật khẩu mới!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve()
              }
              return Promise.reject("Mật khẩu không khớp!")
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit" block loading={changePasswordData.load}>
        Thay đổi
      </Button>
    </Form>
  )
}

export default ChangePassword
