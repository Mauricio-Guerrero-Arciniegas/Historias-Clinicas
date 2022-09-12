import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import getConfig from '../utils/getConfig';

class MultiForm extends Component {
  state = {
    name: '',
    identification: '',
    email: '',
    phoneNumber: '',
    selectedFile: null,
    filename: '',
  };

  handleChange = (event) => {
    this.setState({
      name: document.getElementById('name').value,
      identification: document.getElementById('identification').value,
      email: document.getElementById('email').value,
      phoneNumber: document.getElementById('phoneNumber').value,
    });
  };

  fileSelectedHandler = (event) => {
    //let file = event.target.files[0].name;
    this.setState({
      selectedFile: event.target.files[0],
      filename: document.getElementById('file').value,
    });
  };

  fileUploadHandler = (event) => {
    event.preventDefault();

    let formData = new FormData();

    formData.append('name', this.state.name);
    formData.append('identification', this.state.identification);
    formData.append('email', this.state.email);
    formData.append('phoneNumber', this.state.phoneNumber);
    formData.append('requestImg', this.state.filename);
    formData.append('requestImg', this.state.selectedFile);

    //const API_URL = `${process.env.REACT_APP_API_URL}api/v1`;

    axios
      .post(`http://localhost:5000/api/v1/request`, formData, getConfig())
      .then((res) => {});
  };

  render() {
    return (
      <div className="formDiv">
        <h2 className="formTitle">Formulario</h2>
        <br />
        <form encType="multipart/form">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nombre"
            onChange={this.handleChange}
          />
          <br />
          <input
            type="number"
            name="identification"
            id="identification"
            placeholder="Numero de Cedula"
            onChange={this.handleChange}
          />
          <br />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Correo Electronico"
            onChange={this.handleChange}
          />
          <br />

          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Telefono de Contacto"
            onChange={this.handleChange}
          />

          <div id="div_file">
            <p id="texto">Seleccionar Archivo .pdf</p>
            <input
              type="file"
              name="requestImg"
              id="file"
              placeholder="Upload your file"
              onChange={this.fileSelectedHandler}
            />
          </div>

          <button
            className="submit"
            type="submit"
            onClick={this.fileUploadHandler}
          >
            Enviar
          </button>
        </form>
      </div>
    );
  }
}
export default MultiForm;
