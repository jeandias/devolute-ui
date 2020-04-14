import React, { Component } from 'react';
import { ToastsStore } from 'react-toasts';

export default class Uploader extends Component {
  state = {
    image_url: ''
  };

  getImage = e => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.setState({ file });
    }
  };

  handleUpload = async e => {
    e.preventDefault();
    this.setState({ image_url: "" });

    const { file } = this.state;
    ToastsStore.info("Uploading...");
    if (!file) return;

    const token = localStorage.getItem("token");
    const generateUrl = `${process.env.REACT_APP_API_URL}/images/generate_aws_url`;
    let options = { headers: { Authorization: token }};
    const payload = await fetch(generateUrl, options).then(res => res.json());

    const url = payload.url;
    const formData = new FormData();

    Object.keys(payload.fields).forEach(key =>
      formData.append(key, payload.fields[key])
    );
    formData.append("file", file);

    const xml = await fetch(url, {
      method: "POST",
      body: formData
    }).then(res => res.text());

    ToastsStore.info("Upload successful!");

    const image_url = new DOMParser()
      .parseFromString(xml, "application/xml")
      .getElementsByTagName("Location")[0].textContent;

    this.setState({ image_url: image_url });

    const requestOptions = {
      method: "POST",
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: image_url })
    };
    const newUrl = `${process.env.REACT_APP_API_URL}/images`;
    const image = await fetch(newUrl, requestOptions).then(res => res.json());
    console.log(image)
  };

  render() {
    let image;

    if(this.state.image_url) {
      image = <img src={this.state.image_url} alt="" style={{ width: "400px", height: "300px" }}/>;
    }

    return (
      <div className="container">
        <form onSubmit={this.handleUpload}>
          <div className="form-group">
            <label htmlFor="upload_image">Upload an image to AWS S3 bucket</label>
            <input className="form-control-file"
                   id="upload_image"
                   type="file"
                   accept="image/*"
                   onChange={this.getImage}/>
            <br />
            <button type="submit" className="btn btn-primary">Upload</button>
          </div>
        </form>

        {image}
      </div>
    );
  }
}
