import React from 'react'

let enhanceComponent = Component =>
  class Enhance extends React.Component {
    render() {
      return <Component {...this.props} />
    }
  }

let OriginalTitle = () => <h1> Hello world </h1>
let EnhancedTitle = enhanceComponent(OriginalTitle)

export default EnhancedTitle
