import * as React from 'react'
import styled from '@emotion/styled'
import { dimensions, colors } from '../styles/variables'

const gradients: Record<string, string> = {
  purple: `linear-gradient(180deg, #45CFED 0%, #FFE500 100%);`,
  green: `linear-gradient(178.04deg, #20C9EF -62.7%, #905AE9 81.28%);`
}

const sizes: Record<string, string> = {
  small: '5rem',
  medium: '10rem',
  large: '20rem'
}

const StyledFloater = styled.div`
  width: ${(props: FloaterProps) => sizes[props.size]};
  height: ${(props: FloaterProps) => sizes[props.size]};
  border-radius: ${(props: FloaterProps) => sizes[props.size]};
  background: red;
  position: absolute;
  background: ${gradients.green};
  transform: rotate(${(props: FloaterProps) => `${props.rotation}deg`});
`

interface FloaterProps {
  className?: string
  size: 'small' | 'medium' | 'large'
  gradient: 'purple' | 'green'
  rotation: number
}

export const Floater: React.FC<FloaterProps> = ({ className, size, gradient, rotation }) => {
  return <StyledFloater className={className} size={size} gradient={gradient} rotation={rotation} />
}
