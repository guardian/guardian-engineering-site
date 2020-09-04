import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import styled from '@emotion/styled'

interface ImageProps {
  filename: string
  alt?: string
}

const StyledImg = styled(Img)`
  width: 80%;
`

export const Image: React.FC<ImageProps> = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { relativeDirectory: { glob: "images" } }) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                sizes(maxWidth: 600) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find((n: Record<string, any>) => {
        return n.node.relativePath.includes(props.filename)
      })
      if (!image) {
        return <div>No image found :(</div>
      }

      const imageSizes: FluidObject = image.node.childImageSharp.sizes
      return <StyledImg alt={props.alt} fluid={imageSizes} />
    }}
  />
)
