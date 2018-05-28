import React from 'react'
import EnhanceComponent from './EnhanceComponent.js'

// class OtherTest extends React.Component {
//   render() {
//     return (
//       <div>
//         <EnhanceComponent />
//       </div>
//     )
//   }
// }

export default function() {
  let style = {
    marginTop: '32px'
  }
  return (
    <div style={style}>
      这里是临时测试区域
      <EnhanceComponent />
    </div>
  )
}
