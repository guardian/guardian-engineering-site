import * as React from 'react'
import BackgroundSlider from 'gatsby-image-background-slider'
import { useStaticQuery } from 'gatsby'

interface ImageSliderProps {
  className?: string
  imgSrc?: string
  imgAlt?: string
}

const ImageSlider: React.FC<ImageSliderProps> = () => (
  <BackgroundSlider
    query={useStaticQuery(graphql`
      query {
        backgrounds: allFile(filter: { sourceInstanceName: { eq: "images" } }) {
          nodes {
            relativePath
            childImageSharp {
              fluid(maxWidth: 4000, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    `)}
  />
)

export default ImageSlider
