import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSessionStatus } from "../../../helpers/another";

const TopBarDark = ({ topClass, fluid }) => {
  const router = useRouter();
  const [isSessionActive, setIsSessionActive] = useState(getSessionStatus())

  // useEffect(() => {
  //   setIsSessionActive(getSessionStatus())
  // }, [])

  useEffect(() => {
    // setIsSessionActive(getSessionStatus())

    console.log('==================================asdfasdfasdfasd===================')
    console.log(isSessionActive)
    console.log(typeof(isSessionActive))
  }, [getSessionStatus()])



  const firebaseLogout = () => {
    localStorage.setItem('user', false)
    localStorage.setItem('isSessionActive', false)
    setIsSessionActive(false)
    router.push('/shop/list_view');
  };

  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>Bienvenido a Algo Bonito</li>
                <li>
                  <i className="fa fa-whatsapp text-white" aria-hidden="true"></i>5986 6459 / 4217 3533
                </li>
                <li>
                  <i className="fa fa-instagram text-white" aria-hidden="true"></i>Algo_bonito_502
                </li>
                <li>
                  <i className="fa fa-facebook text-white" aria-hidden="true"></i>Algo_bonito_502
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-end">
            <ul className="header-dropdown">
              {/* <li className="mobile-wishlist">
                <Link href="/page/account/wishlist">
                  <a>
                    <i className="fa fa-heart" aria-hidden="true"></i> wishlist
                  </a>
                </Link>
              </li> */}
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> Mi cuenta
                <ul className="onhover-show-div">
                  {
                    isSessionActive == 'true' ? (
                      <li onClick={() => firebaseLogout()}>
                        <a>Cerrar sesión</a>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link href={`/page/account/login`}>
                            <a>Acceder</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={`/page/account/register`}>
                            <a>Registrar</a>
                          </Link>
                        </li>
                      </>
                    )
                  }


                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
