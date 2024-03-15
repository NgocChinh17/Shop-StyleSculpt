import styled from "styled-components"

export const ProductTitle = styled.h3`
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.truncateMultiLine || 1};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 48px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.88);
`

export const ProductPrice = styled.p`
  font-size: 16px;
  color: #006363;
`
