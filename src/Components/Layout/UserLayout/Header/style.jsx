import styled, { css } from "styled-components"

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-height: 87px;
  padding-left: 60px;
  padding-right: 70px;
  padding-bottom: 30px;
  z-index: 100;
  background-color: white;

  @media (max-width: 1280px) {
    padding-left: 20px;
  }
`

export const LogoHeader = styled.div`
  background-color: white;

  @media (max-width: 1028px) {
    display: inline-block;
  }
`

export const MenuHeader = styled.div`
  color: #3333;
  margin-top: 16px;
  max-width: 283px;

  @media (max-width: 1028px) {
    /* display: none; */
    display: inline-block;
    margin-left: 90px;
  }
`

export const InputSearch = styled.div`
  margin-top: 10px;
  width: 250px;
`

export const HeaderCart = styled.div`
  font-size: 29px;
`

export const AvatarMenu = styled.div`
  margin-left: 20px;
  margin-top: 20px;
`
