import styled from "styled-components"

export const HomeWrapper = styled.div`
  margin-left: 125px;
  margin-right: 120px;
`

export const ProductListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
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
