import React from 'react'
import "./DoctorFeedbackList.css"
import { useLocation } from 'react-router-dom'
export const DoctorFeedbackList = () => {
    const location = useLocation()
    const feedbacks = location?.state
    return (
        <>
            <div style={{ padding: '50px' }} >

                {feedbacks?.map((ele, index) =>
                    < div className="feedbacksectiondoctorcard flex" >
                        <div><img src="/images/man.jpg" alt="" /></div>
                        <div className='flex feedbacksectiondoctorcarddata'>
                            <div className='flex feedbacksectiondoctorcardstar'>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <i
                                        key={num}
                                        style={{ color: ele?.rating >= num ? '#FA8D0D' : undefined }}
                                        className="ri-star-fill"
                                    />
                                ))}
                            </div>
                            <h4>{ele?.message}</h4>
                            <div className='flex feedbacksectiondoctorcardname'>
                                <i class="fi fi-ss-octagon-check"></i>
                                <h3 style={{ marginLeft: "10px" }}>{ele?.userid?.name}</h3>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}
