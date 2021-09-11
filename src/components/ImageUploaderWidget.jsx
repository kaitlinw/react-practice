import React from 'react';
import axios from 'axios';

export default class ImageUploaderWidget extends React.Component {

  state = {
    uploading: false,
    images: []
  }

  onUpload = e => {
    const files = Array.from(e.target.files)
    this.setState({ uploading: true })
    
    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append( i, file)
    })

    const baseUrl = 'http://localhost:3000/api'

    axios.post(`${baseUrl}/image-upload`, formData)
    .then(images => {
      this.setState({
        uploading: false,
        images
      })
    })
  }

  render() {
    const { uploading, images } = this.state

    const displayImages = (images) => {
      return (
        images.map((image, i) => 
          <img key={i} src={image.secure_url} alt=''/>
        )
      )
    }

    const content = () => {
      switch(true) {
        case uploading:
          return "loading..."
        case images.length > 0:
          return displayImages(images)
      }
    }

    return(
      <div>
        <div className="upload-form">
          <p>Upload your image here:</p>
          <input type="file" onChange={this.onUpload}/>
        </div>
        <div className="upload-results">
          <p>Uploaded images:</p>
          {content()}
        </div>
      </div>
    )
  }
}