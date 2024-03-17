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

// home
export const ProductListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 60px;
  width: 230px;
  height: 342px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  transition: transform 0.5s ease-in-out;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`
export const ProductImage = styled.div`
  @media (max-width: 1280px) {
    img {
      position: absolute;
      width: 100px;
      height: auto;
      top: 0;
      left: 0;
    }
  }
`

export const TitleProduct = styled.div`
  @media (max-width: 1280px) {
    display: flex;
    margin-top: -183px;
    font-size: 10px;
  }
`

export const SlideBanners = styled.div`
  @media (max-width: 1028px) {
    margin-left: 30px;
  }
`

export const visibleRangeScroll = styled.div`
  @media (max-width: 1028px) {
    display: none;
  }
`

export const iconCarts = styled.div`
  @media (max-width: 1028px) {
    display: none;
  }
`
export const buttonTitle = styled.div`
  @media (max-width: 1028px) {
    margin-right: 100px;
  }
`
export const buttonTitle2 = styled.div`
  @media (max-width: 1028px) {
    text-align: center;
    justify-content: center;
  }
`

export const galleryList = styled.div`
  @media (max-width: 1028px) {
    /* margin-right: 20px; */
    margin-left: 10px;
  }
`
