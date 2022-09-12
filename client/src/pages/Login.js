import axios from 'axios';
import React from 'react';
import { Button, Card, Form, Row, Col, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  //const API_URL = `${process.env.REACT_APP_API_URL}api/v1/users`;

  const submit = (data) => {
    axios
      .post(`http://localhost:5000/api/v1/users/login`, data)
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem('token', res.data.token);
        navigate('/');
        alert('Bienvenido usuario');
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 404) {
          alert('Su Historia no existe en la base de datos');
        }
      });
  };

  return (
    <div>
      <h3 className="main-title">
        Bienvenido al portal de búsqueda de historias clinicas de Medicoop
      </h3>
      <br />
      <div className="background-picture"></div>
      <h4 className="main-title">
        Ingrese su Nombre y Cédula sin puntos ni comas.
      </h4>
      <br />
      <Card style={{ maxWidth: '500px' }} className="mx-auto">
        <Card.Body className="card-body">
          <Form onSubmit={handleSubmit(submit)}>
            <Form.Group className="mb-3">
              <Form.Label>Nombres y Apellidos</Form.Label>
              <Form.Control
                {...register('name')}
                type="name"
                placeholder="Ingrese su Nombre"
              />
              <Form.Text className="text-muted">
                Nunca compartiremos tu información personal.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Cedula de Ciudadania</Form.Label>
              <Form.Control
                {...register('identification')}
                type="password"
                placeholder="Ingrese su Cédula sin puntos ni comas"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Button variant="success" type="submit">
                Ingresar
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <Row>
        <Col>
          <div className="main-text">
            <article className="requirements">
              <div className="steps">
                <Container className="fluid">
                  <Col>
                    <div className="card-header">
                      <Card.Header>
                        <h2>¿Como solicitar mi Historia Clinica?</h2>
                        <br />
                      </Card.Header>
                    </div>
                    <Card className="numbers-container">
                      <div className="numbers-container">
                        <h1>1.</h1>
                        <article>
                          Ingresar en el portal con nombre y cedula del paciente
                        </article>
                      </div>
                    </Card>
                    <Card className="numbers-container">
                      <div className="numbers-container">
                        <h1>2.</h1>
                        <article>
                          Llenar formulario con los datos reales del paciente,
                          recuerde que estos datos seran verificados al momento
                          de enviar su historia.
                        </article>
                      </div>
                    </Card>
                  </Col>

                  <Col>
                    <Card>
                      <div className="numbers-container">
                        <h1>3.</h1>
                        <article>
                          Si no aparece en la base de datos, o hay algun error
                          por favor comuniquese al numero 314-6454871 o al
                          correo electronico
                          <a href="mailto:historiasclinicasmedicoop@gmail.com">
                            {' '}
                            historiasclinicasmedicoop@gmail
                          </a>
                        </article>
                      </div>
                    </Card>
                    <Card>
                      <div className="numbers-container">
                        <h1>4.</h1>
                        <article>
                          Dar click en enviar solicitud, y nosotros procedermos
                          a enviar la historia al correo que nos indica, de
                          haber problemas con la verificacion nos pondremos en
                          contacto con usted.
                        </article>
                      </div>
                    </Card>
                  </Col>
                </Container>
              </div>
            </article>
          </div>
        </Col>
        <footer>
          <div className="footer">
            © 2022 Copyright: Medicoop I.P.S. - all Rights Reserved
          </div>
        </footer>
      </Row>
      <br />
      <br />
    </div>
  );
};

export default Login;
