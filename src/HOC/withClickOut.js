//https://www.jamestease.co.uk/blether/detect-clicks-outside-element-with-react-components
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const withClickOut = (WrappedComponent) => {
    return class extends Component {
        componentWillMount() {
            document.addEventListener('click', this.handleClick, false)
        }

        componentWillUnmount() {
            document.removeEventListener('click', this.handleClick, false)
        }

        handleClick = (e) => {
            if (!ReactDOM.findDOMNode(this).contains(e.target)) {
                if (typeof this.props.onClickOut === 'function') {
                    this.props.onClickOut()
                }
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

export default withClickOut
