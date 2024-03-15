// Import necessary libraries and components

import styled from "styled-components"

export const ProductListWrapper = styled.div`
  margin-left: 129px;
  margin-right: 70px;
  margin-top: 100px;

  @media (max-width: 1200px) {
    margin-left: 20px;
    margin-right: 20px;
  }
`

export const ProductListContainer = styled.div`
  width: 242px;
  height: 362px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  transition: transform 0.5s ease-in-out;

  img {
    width: 242px;
    height: 362px;
    object-fit: cover;
    display: block;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  @media (max-width: 1280px) {
    width: 100%;
    height: auto;

    img {
      width: 100%;
      height: auto;
    }
  }
`

export const FilterToggleBtn = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 16px;
  }
`

export const locSanPham = styled.div`
  @media (max-width: 1028px) {
    margin-left: -255px;
  }
`
