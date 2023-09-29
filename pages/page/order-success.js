import React, { useContext, useEffect, useState } from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Container, Row, Col, Media } from 'reactstrap';
import one from '../../public/assets/images/pro3/1.jpg';
import CartContext from '../../helpers/cart';
import { CurrencyContext } from '../../helpers/Currency/CurrencyContext';
import { useRouter } from 'next/router';

const OrderSuccess = () => {
    const cartContext = useContext(CartContext);
    // const cartItems = cartContext.state;
    // const cartTotal = cartContext.cartTotal;
    const curContext = useContext(CurrencyContext);
    const symbol = curContext.state.symbol;

    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState('');
    const [cartTotal, setCartTotal] = useState(0);
    const [voucher, setVoucher] = useState('');
    const [payment, setPayment] = useState('');

    const router = useRouter();

    useEffect(() => {
        let { items, orderTotal, address, voucher = '', payment } = JSON.parse(localStorage.getItem('cartComplete'))
        setCartItems(items)
        setAddress(address)
        setCartTotal(orderTotal)
        setVoucher(voucher)
        setPayment(payment)
    }, [])

    const returnLanding = () => {
        router.push('/shop/list_view');
    }

    return (
        <CommonLayout parent="home" title="order success">
            <section className="section-b-space light-layout white-1">
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="success-text"><i className="fa fa-check-circle" aria-hidden="true"></i>
                                <h2>Muchas gracias</h2>
                                {/* <p>Payment is successfully processsed and your order is on the way</p> */}
                                {/* <p>Transaction ID:267676GHERT105467</p> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="section-b-space">
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className="product-order">
                                <h3>Detalle de pedido</h3>

                                {cartItems.map((item, i) =>
                                    <Row className="product-order-detail" key={i}>
                                        <Col xs="3" >
                                            <Media src={item.image} alt=""
                                                className="img-fluid blur-up lazyload" />
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>Producto</h4>
                                                <h5>{item.title}</h5>
                                            </div>
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>Cantidad</h4>
                                                <h5>{item.qty}</h5>
                                            </div>
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>Precio</h4>
                                                <h5>{symbol}{item.price * item.qty}</h5>
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                                <div className="total-sec">
                                    <ul>
                                        <li>subtotal <span>{symbol}{cartTotal}</span></li>
                                    </ul>
                                </div>
                                <div className="final-total">
                                    <h3>total <span>{symbol}{cartTotal}</span></h3>
                                </div>
                            </div>
                        </Col>
                        <Col lg="6">
                            <Row className="order-success-sec">
                                <Col sm="6">
                                    <h4>Resumen</h4>
                                    <ul className="order-detail">
                                        {/* <li>order ID: 5563853658932</li>
                                        <li>Order Date: October 22, 2022</li> */}
                                        <li>Tipo de pago: {payment}</li>
                                        {
                                            payment == 'deposito' && (<li>Boleta: {voucher}</li>)
                                        }

                                        <li>Total: {symbol}{cartTotal}</li>
                                    </ul>
                                </Col>
                                <Col sm="6">
                                    <h4>Dirección de envío</h4>
                                    <ul className="order-detail">
                                        <li>{address}</li>
                                        {/* <li>568, suite ave.</li>
                                        <li>Austrlia, 235153</li>
                                        <li>Contact No. 987456321</li> */}
                                    </ul>
                                </Col>
                                {/* <Col sm="12" className="payment-mode">
                                    <h4>payment method</h4>
                                    <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking
                                acceptance subject to device availability.</p>
                                </Col> */}
                                {/* <Col md="12">
                                    <div className="delivery-sec">
                                        <h3>expected date of delivery</h3>
                                        <h2>october 22, 2022</h2>
                                    </div>
                                </Col> */}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="9">

                        </Col>
                        <Col sm="3">
                            <button type="submit" className="btn-solid btn" onClick={() => returnLanding()}>
                                Listo
                            </button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export default OrderSuccess;