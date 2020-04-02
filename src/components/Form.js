import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

export default props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  let redirect = () => { history.replace(from); };

  const handleSubmit = (e) => {
    e.preventDefault();

    const generateUrl = `${process.env.REACT_APP_API_URL}/${props.url}`;
    const data = { email: email, password: password };

    axios.post(generateUrl, data).then(response => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        redirect();
      } else if (response.data.failure) {
        console.log(response.data.failure)
      }
    }).catch((error) => {
      console.log(error.response.data.errors)
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="container container--mini">
          <h2>{props.value}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email_input">Email</label>
              <input className="form-control" id="email_input"
                     onChange={e => setEmail(e.target.value)}
                     type="text" placeholder="email"/>
            </div>
            <div className="form-group">
              <label htmlFor="password_input">Password</label>
              <input className="form-control" id="password_input"
                     onChange={e => setPassword(e.target.value)}
                     type="password" placeholder="password"/>
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-primary btn-block mb-4"
                     value={props.value}
                     disabled={!validateForm()}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
