import React from "react"
import { Button, Result } from "antd"
import { Link } from "react-router-dom"

import { ROUTES } from "../../../constants/routes"

function NotFoundPage() {
  return (
    <div style={{ marginTop: 70 }}>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary">
            <Link to={ROUTES.USER.HOME}>Back Home</Link>
          </Button>
        }
      />
    </div>
  )
}

export default NotFoundPage
