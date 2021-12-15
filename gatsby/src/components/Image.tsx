import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import styled from '@emotion/styled'

interface ImageProps {
  filename: string
  alt?: string
  className?: string
}

const StyledImg = styled(Img)`
  &.diImage {
    margin-top: 200px;
  }
  width: 100%;
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const image = data.images.edges.find((n: Record<string, any>) => {
        return n.node.relativePath.includes(props.filename)
      })
      if (!image) {
        return <div>No image found :(</div>
      }

      const imageSizes: FluidObject = image.node.childImageSharp.sizes
      return <StyledImg alt={props.alt} fluid={imageSizes} className={props.className} />
    }}
  />
)
