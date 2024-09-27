import React from 'react'
import "./ConnectSites.css"
import { LabFiltering } from '../WebMobile/LabFiltering'
import { MobileLabFilter } from '../MobileLab/MobileLabFilter'
export const Connect = () => {
    return (
        <>
            <div className='ConnectWeb'>
                <LabFiltering />
            </div>
            <div className='ConnectMob'>
                <MobileLabFilter />
            </div>
        </>
    )
}
