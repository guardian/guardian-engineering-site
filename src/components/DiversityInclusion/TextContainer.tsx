import * as React from 'react'
import styled from '@emotion/styled'
import { textSans, headline } from '@guardian/src-foundations/typography'

const TextContainer = styled.div`
  flex-direction: column;
  display: flex;
`

export const InnerContainer = styled.div`
  flex: 1;
  flex-direction: column;
  margin-right: 8px;
  margin-left: 8px;
  margin-top: 8px;
`

export const ContentBoxTitle = styled.h2`
  ${headline.small()};
  font-weight: 700;
  padding-bottom: 1.5rem;
  /* Tablet/Landscape Mobile Phone */
  @media (min-width: 650px) and (max-width: 812px) {
    font-size: 48px;
  }
  /* Mobile Phones */
  @media (min-width: 320px) and (max-width: 649px) {
    padding-bottom: 1rem;
  }
`

export const ContentBoxText = styled.p`
  ${textSans.small()};
  width: 80%;
  /* Tablet/Landscape Mobile Phone */
  @media (min-width: 650px) and (max-width: 812px) {
    width: 90%;
  }
  /* Mobile Phones */
  @media (min-width: 320px) and (max-width: 649px) {
    width: 90%;
  }
`

interface TextContainerProps {
  className?: string
}

export const StyledTextContainer: React.FC<TextContainerProps> = ({ children }) => <TextContainer>{children}</TextContainer>
