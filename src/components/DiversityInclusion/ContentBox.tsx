import * as React from 'react'
import styled from '@emotion/styled'
// import { headline } from '@guardian/src-foundations/typography'
// import { colors } from '../../styles/variables'

const ContentBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-right: 8px;
  margin-left: 8px;
`

export const InnerContentBox = styled.div`
  background-color: LightCoral;
  margin-right: 8px;
  margin-left: 8px;
`

interface ContentBoxProps {
  className?: string
}

export const StyledContentBox: React.FC<ContentBoxProps> = ({ children }) => <ContentBoxContainer>{children}</ContentBoxContainer>
