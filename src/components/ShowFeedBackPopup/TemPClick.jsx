import React, { useContext } from 'react'
import { PopupContext } from './ShowFeedBackPopupContext';

export const TemPClick = () => {
    const { showPopup } = useContext(PopupContext);

    const handleClick = () => {
        showPopup();
    };
    return (
        <>
            <button onClick={handleClick}>Click Me to Show Popup</button>
        </>
    )
}
