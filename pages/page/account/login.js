import React, { useState } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Label, Input, Col } from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { get } from 'react-hook-form';
import { getData, getDataByParams, postData } from '../../../helpers/apiCaller';

const Login = () => {
    const router = useRouter();    

    const [formData, setFormData] = useState({username: '', password: ''})

    const login = () => {
        postData('clientes/username', formData)
        .then(resp => {
            if(!resp.message) {
                localStorage.setItem('user', JSON.stringify({id: resp[0], name: resp[1], username: resp[2], email: resp[2]}))
                localStorage.setItem('isSessionActive', true)
                router.push('/shop/list_view');
            } else {
                Swal.fire(
                    'Credenciales incorrectas',
                    'Las credenciales proporcionadas son incorrectas',
                    'error'
                  )
            }
        })
        
    }

    const handleChange = (event) => {
		const { name, value } = event.target

		console.log(name, value)

		setFormData({
			...formData,
			[name]: value,
		});
	};

    return (
        <CommonLayout parent="home" title="login">
            <section className="login-page section-b-space">
                <Container>
                    <Row>
                        <Col lg={{ size: 6, offset: 3 }}>
                            <h3>Iniciar sesión</h3>
                            <div className="theme-card">
                                <Form className="theme-form">
                                    <div className="form-group">
                                        <Label className="form-label" for="email">Email</Label>
                                        <Input type="text" className="form-control" name="username" required="" value={formData.username} onChange={(event) => handleChange(event)}/>
                                    </div>
                                    <div className="form-group">
                                        <Label className="form-label" for="review">Contraseña</Label>
                                        <Input type="password" className="form-control" name="password" required="" value={formData.password} onChange={(event) => handleChange(event)}/>
                                    </div>
                                    <Row>
                                        <Col xl={6}>
                                            <a href="#" onClick={() => login()} className="btn btn-solid">Iniciar</a>
                                        </Col>

                                        <Col xl={6}>
                                            <Link href={`/page/account/register`}>
                                                <a href="" className="btn btn-solid">Registrarse</a>
                                            </Link>
                                        </Col>
                                    </Row>


                                </Form>
                            </div>
                        </Col>
                        {/* <Col lg="6" className="right-login">
                            <h3>New Customer</h3>
                            <div className="theme-card authentication-right">
                                <h6 className="title-font">Create A Account</h6>
                                <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be
                                    able to order from our shop. To start shopping click register.</p><a href="#"
                                        className="btn btn-solid">Create an Account</a>
                            </div>
                        </Col> */}
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export default Login;