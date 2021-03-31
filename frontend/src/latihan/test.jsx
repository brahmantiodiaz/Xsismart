import React, { Component } from 'react';
import Resizer from 'react-image-file-resizer';

export default class test extends Component {
    constructor(props) {
        super(props);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.state = {
          newImage: ''
        }
    }

    fileChangedHandler(event) {
        var fileInput = false
        if(event.target.files[0]) {
            fileInput = true
        }
        if(fileInput) {
            try {
                Resizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                'JPEG',
                100,
                0,
                uri => {
                    console.log(uri)
                    this.setState({ newImage: uri })
                },
                'base64',
                200,
                200,
                );
            }   catch(err) {
                    console.log(err)
            }
        }
    }

    render() {
        return (
            <div className="App">
                <input type="file" onChange={this.fileChangedHandler}/>
                <img src={this.state.newImage} alt=''/>
            </div>
        );
    }
}
