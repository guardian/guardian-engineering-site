import * as React from 'react'
import styled from '@emotion/styled'
import { SvgPerson } from '@guardian/src-icons'

const ContentBoxContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1 1 0px
  flex-basis: 0;
  margin-right: 8px;
  margin-left: 8px;
`

export const InnerContentBox = styled.div`
  background-color: #2d2d2d;
  margin-right: 8px;
  margin-left: 8px;
  width: 50%;
  margin-top: 70px;
  position: relative;
  svg {
    width: 50px;
    height: 50px;
    fill: black !important;
    position: relative;
    top: -15px;
    left: 90%;
    z-index: 2;
    border-radius: 50%;
    background-color: white;
    margin-bottom: -24px;
  }
`

export const personIcon: React.FC<ContentBoxProps> = () => <SvgPerson />

interface ContentBoxProps {
  className?: string
}

export const StyledContentBox: React.FC<ContentBoxProps> = ({ children }) => <ContentBoxContainer>{children}</ContentBoxContainer>
