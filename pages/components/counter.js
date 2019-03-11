import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementCount, decrementCount } from '../redux/actions'

class Counter extends Component {
  increment = () => {
    this.props.dispatch(incrementCount())
  }

  decrement = () => {
    this.props.dispatch(decrementCount())
  }

  render () {
    return (
      <div>
        <h1>
          Count: <span>{this.props.count}</span>
        </h1>
        <button onClick={this.increment}>+1</button>
        <button onClick={this.decrement}>-1</button>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { 
    count: state.counter.count
  }
}

export default connect(mapStateToProps)(Counter)