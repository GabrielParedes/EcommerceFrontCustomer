import React, { Fragment } from 'react';
import Link from 'next/link';

const LogoImage = ({ logo }) => {
    return (
        <Fragment>
            <Link href={'/shop/list_view'} >
                <a>
                    {/* <img src={`/assets/images/icon/${logo?logo:'logo.png'}`} alt="" className="img-fluid" /> */}
                    <img src={`/assets/images/icon/logo/logo.jpg`} alt="" className="img-fluid" />
                </a>
            </Link>
        </Fragment>
    )
}

export default LogoImage;