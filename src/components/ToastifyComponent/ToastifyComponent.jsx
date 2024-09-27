import React from 'react';
import { ToastContainer as OriginalToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastifyComponent = () => {
    return (
        <>
            <OriginalToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}
