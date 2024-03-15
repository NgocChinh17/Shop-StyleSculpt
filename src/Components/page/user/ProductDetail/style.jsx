import styled from "styled-components"

export const ProductDetailWrapper = styled.div`
  margin-left: 129px;
  margin-right: 200px;
  margin-top: 100px;
`

export const ProductDetailContainer = styled.div`
  img {
    border-radius: 5px;
    transition: transform 0.3s ease-in-out;
  }
  img:hover {
    transform: scale(0.9);
  }
`
export const Detail = styled.div`
  position: relative;
  border-top: 1px solid #dddddd;
  width: 500px;
  margin-top: 25px;
  padding-top: 25px;
`

export const ContentDetail = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border: 1px solid #dddddd;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  top: -15px;
  left: 50%;
  background-color: #ffffff;
  transform: translateX(-50%);
`
export const ReviewFormWrapper = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: #f0f2f5;
`

export const ReviewItemWrapper = styled.div`
  margin-top: 8px;
`

export const productImage = styled.div`
  display: inline-block;
  height: 450px;

  @media (max-width: 1028px) {
    display: inline-block;
    img {
      width: 200px !important;
      height: auto;
    }
  }
`
export const AfterTitleProduct = styled.div`
  @media (max-width: 1028px) {
    margin-right: -427px;
  }
`

export const gioiThieu = styled.div`
  @media (max-width: 1028px) {
    min-width: 400px !important;
    min-height: 300px;
  }
`
