import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementCount, decrementCount } from '../redux/actions'

class Counter extends Component {
  increment = () => {
    this.props.increment();
  }

  decrement = () => {
    this.props.decrement();
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
const mapDispatchToProps = (dispatch) => {
  return {
      increment: () => dispatch(incrementCount()),
      decrement: () => dispatch(decrementCount()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
