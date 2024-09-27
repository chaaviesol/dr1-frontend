import React from 'react'
import { HospitalFiltering } from '../WebMobile/HospitalFiltering'
import { MobileHosFiltering } from '../MobileHospital/MobileHosFiltering'
export const Hosconnect = () => {
    return (
        <>
            <div className='ConnectWeb'>
                <HospitalFiltering />
            </div>
            <div className='ConnectMob'>
                <MobileHosFiltering />
            </div>
        </>
    )
}
