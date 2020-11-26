import * as React from 'react'
import styled from '@emotion/styled'

import Content from './Content'

const StyledContentLeft = styled(Content)`
  float: left;
  padding-left: 8px;
`
const StyledContentRight = styled(Content)`
  float: right;
`

const StyledContentTitle = styled(Content)`
  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 55px;
  margin: 50px 0 0 20px;

`

const StyledContentCard = styled(Content)`
  background: rgba(255, 255, 255, 0.12);
  width: 100%;
  height: 100%;
  padding: 10px 30px;

  h2 {
    margin-bottom: 30px;
  }
`

interface ContentLeftProps {
  className?: string
}

interface ContentRightProps {
  className?: string
}

interface ContentCardProps {
  className?: string
}

interface ContentTitleProps {
  className?: string
}

export const ContentLeft: React.FC<ContentLeftProps> = ({ children, className }) => (
  <StyledContentLeft className={className}>{children}</StyledContentLeft>
)

export const ContentRight: React.FC<ContentRightProps> = ({ children, className }) => (
  <StyledContentRight className={className}>{children}</StyledContentRight>
)

export const ContentCard: React.FC<ContentCardProps> = ({ children, className }) => (
  <StyledContentCard className={className}>{children}</StyledContentCard>
)

export const ContentTitle: React.FC<ContentTitleProps> = ({ children, className }) => (
  <StyledContentTitle className={className}>{children}</StyledContentTitle>
)
