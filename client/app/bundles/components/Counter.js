import React from 'react'

const Counter = ({value, onIncreaseClick}) => (
  <div>
    <span>{ value }</span>
    <button onClick={ onIncreaseClick }>Increase</button>
  </div>
)

export default Counter
