import React, { useContext, useEffect, useState } from "react";
import { Media, Container, Form, Row, Col } from "reactstrap";
import CartContext from "../../../../helpers/cart";
import paypal from "../../../../public/assets/images/paypal.png";
import { PayPalButton } from "react-paypal-button-v2";
import { get, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CurrencyContext } from "../../../../helpers/Currency/CurrencyContext";
import { getSessionStatus } from "../../../../helpers/another";
import { postData } from "../../../../helpers/apiCaller";

const CheckoutPage = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;
  const resetCart = cartContext.resetCart;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const [obj, setObj] = useState({});
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')))
  const [payment, setPayment] = useState("efectivo");
  const { register, handleSubmit, formState: { errors } } = useForm(); // initialise the hook
  const router = useRouter();


  useEffect(() => {
    console.log("STATUS SESSION CHECKOUT")
    console.log(getSessionStatus())

    if (getSessionStatus() == 'false') {
      router.push('/page/account/login')
    }

  }, [])

  useEffect(() => {
    console.log(userData)

  }, [userData])

  const checkhandle = (value) => {
    setPayment(value);
  };

  const onSubmit = (data) => {
    if (data !== "") {
      postData('compras', {
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        address: userData.address,
        total: cartTotal,
        payment_type: payment == 'deposito' ? userData.voucher : payment,
        customer_id: userData.id
      })
      .then(async (resp) => {
        console.log(resp)
        if(resp.id){
          await cartItems.forEach(async (item) => {
            postData('detalle_compra', {
              product_id: item.id,
              qty: item.qty,
              subtotal: item.total,
              purchase_id: resp.id
            })
          })

          localStorage.setItem('cartComplete', JSON.stringify({ items: cartItems, orderTotal: cartTotal, symbol: symbol, address: userData.address, payment: payment, voucher: userData.voucher || '' }))
          resetCart()

          router.push({
            pathname: "/page/order-success",
            state: { items: cartItems, orderTotal: cartTotal, symbol: symbol },
          });
        }
      })



      

      
    } else {
      errors.showMessages();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target

    console.log(name, value)

    setUserData({
      ...userData,
      [name]: value,
    });
  };


  return (
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg="6" sm="12" xs="12">
                  <div className="checkout-title">
                    <h3>Detalles de compra</h3>
                  </div>
                  <div className="row check-out">
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Nombre completo</div>
                      <input
                        type="text"
                        className={`${errors.name ? "error_border" : ""}`}
                        name="name"
                        {...register('name', { required: true })}
                        value={userData.name || ''}
                        onChange={(event) => handleChange(event)}
                      />
                      <span className="error-message">
                        {errors.name && "Este campo es requerido"}
                      </span>
                    </div>
                    {/* <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Last Name</div>
                      <input
                        type="text"
                        className={`${errors.last_name ? "error_border" : ""}`}
                        name="last_name"
                        {...register('last_name', { required: true })}
                      />
                      <span className="error-message">
                        {errors.last_name && "Last name is required"}
                      </span>
                    </div> */}
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Teléfono</div>
                      <input
                        type="text"
                        name="phone"
                        className={`${errors.phone ? "error_border" : ""}`}
                        {...register('phone', { required: true, pattern: /\d+/ })}
                        value={userData.phone}
                        onChange={(event) => handleChange(event)}
                      />
                      <span className="error-message">
                        {errors.phone && "Ingrese un teléfono válido"}
                      </span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Correo electrónico</div>
                      <input
                        //className="form-control"
                        className={`${errors.email ? "error_border" : ""}`}
                        type="text"
                        name="email"
                        {...register('email', {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                        value={userData.email}
                        onChange={(event) => handleChange(event)}
                      />
                      <span className="error-message">
                        {errors.email && "Ingrese un correo válido"}
                      </span>
                    </div>
                    {/* <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Country</div>
                      <select name="country" {...register("country", { required: true })}>
                        <option>Guatemala</option>
                        <option>South Africa</option>
                        <option>United State</option>
                        <option>Australia</option>
                      </select>
                    </div> */}
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Dirección</div>
                      <input
                        //className="form-control"
                        className={`${errors.address ? "error_border" : ""}`}
                        type="text"
                        name="address"
                        {...register("address", { required: true, min: 1, max: 200 })}
                        value={userData.address}
                        onChange={(event) => handleChange(event)}
                      />
                      <span className="error-message">
                        {errors.address && "Ingrese una direccion válida"}
                      </span>
                    </div>
                    {/* <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Town/City</div>
                      <input
                        //className="form-control"
                        type="text"
                        className={`${errors.city ? "error_border" : ""}`}
                        name="city"
                        {...register('city', { required: true })}
                        onChange={setStateFromInput}
                      />
                      <span className="error-message">
                        {errors.city && "select one city"}
                      </span>
                    </div> */}
                    {/* <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">State / County</div>
                      <input
                        //className="form-control"
                        type="text"
                        className={`${errors.state ? "error_border" : ""}`}
                        name="state"
                        {...register('state', { required: true })}
                        onChange={setStateFromInput}
                      />
                      <span className="error-message">
                        {errors.state && "select one state"}
                      </span>
                    </div> */}
                    {/* <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">Postal Code</div>
                      <input
                        //className="form-control"
                        type="text"
                        name="pincode"
                        className={`${errors.pincode ? "error_border" : ""}`}
                        {...register('pincode', { pattern: /\d+/ })}
                      />
                      <span className="error-message">
                        {errors.pincode && "Required integer"}
                      </span>
                    </div> */}
                    {/* <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <input
                        type="checkbox"
                        name="create_account"
                        id="account-option"
                      />
                      &ensp;{" "}
                      <label htmlFor="account-option">Create An Account?</label>
                    </div> */}
                  </div>
                </Col>
                <Col lg="6" sm="12" xs="12">
                  {cartItems && cartItems.length > 0 > 0 ? (
                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <div>
                            Productos <span>Total</span>
                          </div>
                        </div>
                        <ul className="qty">
                          {cartItems.map((item, index) => (
                            <li key={index}>
                              {item.title} × {item.qty}{" "}
                              <span>
                                {symbol}
                                {item.total}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <ul className="sub-total">
                          <li>
                            Subtotal{" "}
                            <span className="count">
                              {symbol}
                              {cartTotal}
                            </span>
                          </li>
                          {/* <li>
                            Shipping
                            <div className="shipping">
                              <div className="shopping-option">
                                <input
                                  type="checkbox"
                                  name="free-shipping"
                                  id="free-shipping"
                                />
                                <label htmlFor="free-shipping">
                                  Free Shipping
                                </label>
                              </div>
                              <div className="shopping-option">
                                <input
                                  type="checkbox"
                                  name="local-pickup"
                                  id="local-pickup"
                                />
                                <label htmlFor="local-pickup">
                                  Local Pickup
                                </label>
                              </div>
                            </div>
                          </li> */}
                        </ul>
                        <ul className="total">
                          <li>
                            Total{" "}
                            <span className="count">
                              {symbol}
                              {cartTotal}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="payment-box">
                        <div className="upper-box">
                          <div className="payment-options">
                            <ul>
                              <li>
                                <div className="radio-option stripe">
                                  <input
                                    type="radio"
                                    name="payment-group"
                                    id="payment-2"
                                    defaultChecked={true}
                                    onClick={() => checkhandle("efectivo")}
                                  />
                                  <label htmlFor="payment-2">Pago en efectivo</label>
                                </div>
                              </li>
                              <li>
                                <div className="radio-option paypal">
                                  <input
                                    type="radio"
                                    name="payment-group"
                                    id="payment-1"
                                    onClick={() => checkhandle("deposito")}
                                  />
                                  <label htmlFor="payment-1">
                                    Pago por depósito
                                    {/* <span className="image">
                                      <Media src={paypal.src} alt="" />
                                    </span> */}
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {cartTotal !== 0 ? (
                          <div className="text-end">
                            {payment === "deposito" && (
                              <>
                                <h6>Cuentas de banco</h6>
                                <h5>Banco industrial - 1850070754</h5>
                                <h5>Banrural - 3272026369</h5>


                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                  <div className="field-label"># de boleta</div>
                                  <input
                                    type="text"
                                    name="voucher"
                                    className={`${errors.voucher ? "error_border" : ""}`}
                                    {...register('voucher', { required: true })}
                                    value={userData.voucher}
                                    onChange={(event) => handleChange(event)}
                                  />
                                  <span className="error-message">
                                    {errors.voucher && "Ingrese una boleta válida"}
                                  </span>
                                </div>
                              </>

                              // <PayPalButton
                              //   amount="0.01"
                              //   onSuccess={(details, data) => {
                              //     alert("Transaction completed by " + details.payer.name.given_name);

                              //     return fetch("/paypal-transaction-complete", {
                              //       method: "post",
                              //       body: JSON.stringify({
                              //         orderID: data.orderID
                              //       })
                              //     });
                              //   }}
                              // />
                            )}

                            <button type="submit" className="btn-solid btn">
                              Completar pedido
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
