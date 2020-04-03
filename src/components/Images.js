import React, { Component } from 'react';

export default class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/images`;
    let options = { headers: { Authorization: token } };

    fetch(url, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const {error, isLoaded, items} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">Thumbnail Gallery</h1>
          <hr className="mt-2 mb-5"/>
          <div className="row text-center text-lg-left">
            {items.map(item => (
              <div key={item.id} className="col-lg-3 col-md-4 col-6">
                <span className="d-block mb-4 h-100">
                  <img className="img-fluid img-thumbnail" src={item.image_url} alt=""/>
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}
