import * as React from 'react'
import BackgroundSlider from 'gatsby-image-background-slider'
import { useStaticQuery, graphql } from 'gatsby'

interface ImageSliderProps {
  className?: string
  imgSrc?: string
  imgAlt?: string
}

const images = ['images/Ellipse 2.1.png', 'images/home-about-gnm.png', 'images/home-about-gnm.jpg']

const ImageSlider: React.FC<ImageSliderProps> = () => (
  <div>
    <BackgroundSlider
      images={images}
      query={useStaticQuery(graphql`
        query {
          backgrounds: allFile(filter: { relativeDirectory: { glob: "images" } }) {
            nodes {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      `)}
      initDelay={2} // delay before the first transition (if left at 0, the first image will be skipped initially)
      transition={4} // transition duration between images
      duration={8} // how long an image is shown
      style={{
        transform: 'rotate(-2deg) scale(.9)'
      }}
    />
  </div>
)

export default ImageSlider
