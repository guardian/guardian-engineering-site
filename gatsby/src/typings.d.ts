interface CSSModule {
  [className: string]: string
}

// type shims for CSS modules

declare module '*.module.scss' {
  const cssModule: CSSModule
  export = cssModule
}

declare module '*.module.css' {
  const cssModule: CSSModule
  export = cssModule
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}
