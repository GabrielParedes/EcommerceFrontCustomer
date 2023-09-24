import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Input, Container, Row, Form, Label, Col } from 'reactstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postData } from '../../../helpers/apiCaller';

const Register = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const handleChange = (event) => {
		const { name, value } = event.target
		setForm({
			...form,
			[name]: value,
		});
	};

    const userRegister = async () => {
        console.log(form)

        let userData = {
            name: `${form.firstName} ${form.lastName}`,
            username: form.email,
            password: form.password
        }


        // await postData('clientes', userData)
        // .then(resp => {
        //     toast.success("Usuario creado correctamente!");
        //     window.location.href = '/page/account/cart';
        // })
        // .catch(err => {
        //     toast.error("Hubo un error al crear usuario!");
        // })
    }

    return (
        <CommonLayout parent="home" title="register">
            <section className="register-page section-b-space">
                <Container>
                    <Row>
                        <Col lg="12">
                            <h3>Crear cuenta</h3>
                            <div className="theme-card">
                                <Form className="theme-form">
                                    <Row>
                                        <Col md="6">
                                            <Label className="form-label" for="email">Nombre</Label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="firstName"
                                                required="" 
                                                value={form.firstName}
                                                onChange={(event) => handleChange(event)}
                                            />
                                        </Col>
                                        <Col md="6">
                                            <Label className="form-label" for="review">Apellido</Label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="lastName"
                                                required=""
                                                value={form.lastName}
                                                onChange={(event) => handleChange(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Label className="form-label" for="email">Email</Label>
                                            <Input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                required=""
                                                value={form.email}
                                                onChange={(event) => handleChange(event)}
                                            />
                                        </Col>
                                        <Col md="6">
                                            <Label className="form-label" for="review">Contraseña</Label>
                                            <Input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                required=""
                                                value={form.password}
                                                onChange={(event) => handleChange(event)}
                                            />
                                        </Col>
                                        <Col md="12">
                                            <a onClick={userRegister} className="btn btn-solid w-auto">Crear cuenta</a>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export default Register