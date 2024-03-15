import { useMemo } from "react"
import { Navigate, Link, Outlet, useLocation } from "react-router-dom"
import { Card, Row, Col, Breadcrumb, Space, notification, Tabs } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { CameraOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons"

import { ROUTES } from "../../../constants/routes"
import { convertImageToBase64 } from "../../../utils/file"
import { PROFILE_MENU } from "./constants"

import { changeAvatarRequest } from "../../../redux/slicers/auth.slice"

import * as S from "./style"

const { TabPane } = Tabs

function Profile() {
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const accessToken = localStorage.getItem("accessToken")

  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      return notification.error({ message: "File không đúng định dạng" })
    }
    const imgBase64 = await convertImageToBase64(file)
    await dispatch(
      changeAvatarRequest({
        id: userInfo.data.id,
        data: {
          avatar: imgBase64,
        },
      })
    )
  }

  const renderProfileMenu = useMemo(() => {
    return PROFILE_MENU.map((item, index) => {
      return (
        <Link to={item.path} key={index} style={{ color: "black" }}>
          <S.ProfileMenuItem active={item.path === pathname}>
            <div>{item.icon}</div>
            <p style={{ marginLeft: 12 }}>{item.label}</p>
          </S.ProfileMenuItem>
        </Link>
      )
    })
  }, [pathname])

  const profileLabel = useMemo(() => {
    return PROFILE_MENU.find((item) => item.path === pathname)?.label
  }, [pathname])

  if (accessToken && userInfo.loading) {
    return <div>Loading...</div>
  } else if (!userInfo.data.id) {
    return <Navigate to={ROUTES.USER.HOME} />
  }
  return (
    <S.ProfileWrapper>
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
            title: profileLabel,
          },
        ]}
        style={{ marginBottom: 8 }}
      />

      <Card bordered={false} size="small" title={profileLabel}>
        <Row gutter={[16, 16]}>
          <Col md={6}>
            <S.ProfileMenuWrapper bordered={false} size="small">
              <S.ProfileMenuWrapper bordered={false} size="small">
                <S.AvatarContainer>
                  <S.AvatarUpload>
                    <S.AvatarEdit>
                      <input
                        type="file"
                        id="imageUpload"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => handleChangeAvatar(e)}
                      />
                      <label htmlFor="imageUpload">
                        <CameraOutlined style={{ fontSize: 16 }} />
                      </label>
                    </S.AvatarEdit>
                    {userInfo.data.avatar ? (
                      <S.AvatarPreview src={userInfo.data.avatar} alt="User profile picture" />
                    ) : (
                      <S.AvatarDefaultWrapper>
                        <S.AvatarDefaultContainer
                          icon={<UserOutlined style={{ fontSize: 36 }} />}
                        />
                      </S.AvatarDefaultWrapper>
                    )}
                  </S.AvatarUpload>
                  <h3>{userInfo.data.fullName}</h3>
                  <p>{userInfo.data.email}</p>
                </S.AvatarContainer>
              </S.ProfileMenuWrapper>
            </S.ProfileMenuWrapper>
          </Col>
          <Col md={18}>
            <Tabs defaultActiveKey={pathname} tabPosition="top" size="large">
              {PROFILE_MENU.map((item) => (
                <TabPane
                  tab={
                    <Link to={item.path} style={{ color: "black" }}>
                      <Space>
                        {item.icon}
                        <span>{item.label}</span>
                      </Space>
                    </Link>
                  }
                  key={item.path}
                >
                  <Outlet />
                </TabPane>
              ))}
            </Tabs>
          </Col>
        </Row>
      </Card>
    </S.ProfileWrapper>
  )
}

export default Profile
