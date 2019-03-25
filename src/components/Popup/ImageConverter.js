import React, { Component } from 'react';

class ImageConverter extends Component {
    render() {
        return (
            <div className='centered'>
                <img onLoad={this.props.onImageLoad} src={this.props.data} alt='converted'/>                
            </div>
        )   
    }
}

export default ImageConverter
