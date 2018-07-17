import React, { Component } from 'react';
import clipboard from 'clipboard'

class CopyButton extends Component {
    constructor(props) {
      super(props)
      this.clipboard = new clipboard('.clipboard-btn');
      this.state = {
        style: ''
      }
    }
  
    componentWillUnmount() {
      this.clipboard.destroy();
    }

    handleClick = () => {
      this.setState({ style: 'on' })
      setTimeout(() => {
        this.setState({ style: '' })
      }, 1000)
    }
  
    render() {
      const { data, title } = this.props
      const { style } = this.state
      const text = style === 'on' ? 'Copy Complete' : title
      return (
        <span 
          className={`copy clipboard-btn ${style}`} 
          data-clipboard-text={data} 
          onClick={this.handleClick}
        >
          {text}
        </span>
      );
    }
  }
  
  export default CopyButton;