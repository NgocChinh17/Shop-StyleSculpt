import { SearchOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import "./searchItem.scss"

function SearchItem({ data }) {
  return (
    <Link to={`/products/${data.id}`} className="wrapper_book_item">
      <SearchOutlined className="avatar" />
      <div className="info">
        <h4 className="name">
          <span>{data.name}</span>
        </h4>
      </div>
    </Link>
  )
}

export default SearchItem
