import React, { Fragment, useEffect, useRef, useState } from 'react'
import "./ChatBot.css"
import { Button, Modal } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram';
import { Navigate, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import { port } from '../../config';
const ChatBot = () => {
    const [ChatSec, setChatSec] = useState(false)
    const [Chats, setChats] = useState([{
        bot: "Hello, Thank you for your interest in partnering with us.",
        ExtraBot: 'Please choose the category',
        Qnm: 1
    }])
    const inpRef = useRef(null)
    const [TempUserInput, setTempUserInput] = useState()
    const navigate = useNavigate()

    const ChatTrue = () => {
        if (ChatSec) {
            setChatSec(false)
            setTempUserInput('')
            if (Chats.find(ele => ele.Qnm === 1 && ele.answer === "Doctor")) {
                if (Chats.find(ele => ele.Qnm === 4)) {
                    setFirstMessage()
                }
            } else if (Chats.find(ele => ele.Qnm === 1 && ele.answer === "Hospital" || ele.answer === "Laboratory")) {
                if (Chats.find(ele => ele.Qnm === 5)) {
                    setFirstMessage()
                }
            }

        } else {
            setChatSec(true)
        }
    }
    console.log("Chats>>>", Chats)
    const ChooseFn = (e) => {
        const value = e?.target?.value
        console.log("value>>>>", value)
        let TempChat = [...Chats]
        const index = TempChat?.length - 1
        if (value === 'Doctor') {
            TempChat[index] = { ...TempChat[index], user: value, answer: value }
        } else {
            TempChat[index] = { ...TempChat[index], user: value, answer: value }
        }
        setChats(TempChat)
        UpdatingMsgs(TempChat)
    }


    useEffect(() => {
        // UpdatingMsgs()
        const chatContainer = document.getElementById('chatContainer');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer?.scrollHeight;
        }
    }, [Chats, TempUserInput])

    const InputField = (e) => {
        const value = e?.target?.value
            ? (e?.target?.value[0]?.toUpperCase() + e?.target?.value?.slice(1))  // Capitalize first letter
            : '';                                           // Set to empty string if no value
        setTempUserInput(value);
    }
    const ConfirmInput = () => {
        let TempChats = Chats
        const tempChatFilter = TempChats.filter(ele => ele?.Qnm)
        const FinalQnm = tempChatFilter[tempChatFilter?.length - 1]?.Qnm
        const FInalQnmIndex = TempChats.findIndex(ele => ele.Qnm === FinalQnm)
        TempChats[FInalQnmIndex] = { ...TempChats[FInalQnmIndex], answer: TempUserInput }
        TempChats[TempChats?.length - 1] = { ...TempChats[TempChats?.length - 1], user: TempUserInput }
        setChats(TempChats)
        setTempUserInput('')
        UpdatingMsgs(TempChats)
    }

    const UpdatingMsgs = (tmepchats) => {
        let TempChat = tmepchats
        const findFirstQ = TempChat?.find(ele => ele?.Qnm === 1)
        const botHos1Q = 'Please enter the Hospital name.'
        const botLab1Q = 'Please enter the Laboratory name.'
        const botDoc1Q = 'Please enter your name.'
        const who = findFirstQ?.answer
        if (who && !TempChat?.find(ele => ele?.bot === botHos1Q || ele?.bot === botLab1Q || ele?.bot === botDoc1Q)) {
            console.log("who>>>>", who)
            switch (who) {
                case 'Doctor':
                    TempChat = [
                        ...TempChat,
                        {
                            bot: botDoc1Q,
                            Qnm: 2
                        }]
                    break;
                case 'Hospital':
                    TempChat = [
                        ...TempChat,
                        {
                            bot: botHos1Q,
                            Qnm: 2
                        }]
                    break;
                case 'Laboratory':
                    TempChat = [...TempChat,
                    {
                        bot: botLab1Q,
                        Qnm: 2
                    }]
                    break;
            }
        }
        const findSecondQ = TempChat?.find(ele => ele?.Qnm === 2)
        const botHos2Q = `Please enter your contact number.`
        const botLab2Q = `Please enter your contact number. `
        const botDoc2Q = `Hello Dr. ${findSecondQ?.answer}, Please enter your contact number. `
        if (findSecondQ?.Qnm === 2 && findSecondQ?.answer && !TempChat?.find(ele => ele.bot === botHos2Q || ele.bot === botLab2Q || ele.bot === botDoc2Q)) {
            switch (who) {
                case 'Doctor':
                    TempChat =
                        [...TempChat,
                        {
                            bot: botDoc2Q
                            , Qnm: 3
                        }]

                    break;
                case 'Hospital':
                    TempChat = [
                        ...TempChat,
                        {
                            bot: botHos2Q
                            , Qnm: 3
                        }
                    ]
                    break;
                case 'Laboratory':
                    TempChat = [
                        ...TempChat,
                        {
                            bot: botLab2Q
                            , Qnm: 3
                        }
                    ]
                    break;
            }
        }
        if (findFirstQ?.answer === "Doctor") {
            const findThirdQ = TempChat?.find(ele => ele?.Qnm === 3)
            const botRes3Q = "Thank you for providing your details. We have assigned a relationship manager for you. You will receive call from them soon."
            const error = 'Please enter a valid phone number.'
            const PatternMob = /^[6-9]\d{9}$/
            if (findThirdQ && findThirdQ.answer && !TempChat?.find(ele => ele.bot === botRes3Q)) {
                if (PatternMob?.test(findThirdQ?.answer)) {
                    TempChat.push({ bot: botRes3Q, Qnm: 4 });
                } else {
                    if (!TempChat?.find(ele => ele?.bot?.error === error)) {
                        TempChat.push({ bot: error });
                    }
                }
            }
        } else {
            const findThirdQ = TempChat?.find(ele => ele?.Qnm === 3)
            const botRes3Q = "Would you like to receive a call from our relationship manager?."
            const error = 'Please enter a valid phone number.'
            const PatternMob = /^[6-9]\d{9}$/
            if (findThirdQ && findThirdQ.answer && !TempChat?.find(ele => ele.bot === botRes3Q)) {
                if (PatternMob?.test(findThirdQ?.answer)) {
                    TempChat.push({ bot: botRes3Q, Qnm: 4 });
                } else {
                    if (!TempChat?.find(ele => ele?.bot?.error === error)) {
                        TempChat.push({ bot: error });
                    }
                }
            }
        }
        const findFourQ = TempChat?.find(ele => ele?.Qnm === 4)
        const botRes3Q = "Thank you for providing your details. We have assigned a relationship manager for you. You will receive call from them soon."
        const botRes3QNo = "Please click the button to access the registration page.";
        if (findFourQ && findFourQ?.answer && !TempChat?.find(ele => ele.bot === botRes3QNo)) {
            if (findFourQ?.answer === "Thru relationship manager") {
                TempChat.push({ bot: botRes3Q, Qnm: 5 });
            }
        }
        let FinalData = ''
        TempChat?.map(ele => {
            if (ele.Qnm === 1) {
                FinalData = { ...FinalData, type: ele?.answer }
            }
            if (ele.Qnm === 2) {
                FinalData = { ...FinalData, name: ele?.answer }
            }
            if (ele.Qnm === 3) {
                FinalData = { ...FinalData, contact_number: parseInt(ele?.answer) }
            }
        })
        console.log("findAllhAnswers>>>>", FinalData)
        const CheckingNull = !FinalData?.contact_number || !FinalData?.name || !FinalData?.type
        if (FinalData.type === "Doctor") {
            const FindCheckAnswer = TempChat.find(ele => ele.Qnm === 4)
            if (FindCheckAnswer?.bot && !CheckingNull) {
                axios.post(`${port}/admin/messagesave`, FinalData).then((res => {
                    console.log("res>>>>>", res)
                }))
            }
        } else if (FinalData.type === "Hospital" || FinalData.type === "Laboratory") {
            const FindCheckAnswer = TempChat.find(ele => ele.Qnm === 5)
            console.log("FindCheckAnswer>>>>", FindCheckAnswer)
            if (FindCheckAnswer?.bot && !CheckingNull) {
                axios.post(`${port}/admin/messagesave`, FinalData).then((res => {
                    console.log("res>>>>>", res)
                }))
            }
        }

        setTimeout(() => {
            setChats(TempChat)
        }, 400);

    }

    const handleClick = (event) => {
        if (event.key === 'Enter') {
            ConfirmInput()
        }
    }
    const CloseAndClear = () => {
        setChatSec(false)
        setFirstMessage()
    }

    const setFirstMessage = () => {
        setChats([{
            bot: "Hello, Thank you for your interest in partnering with us.",
            ExtraBot: 'Please choose the category',
            Qnm: 1
        }])
    }
    return (
        <>

            <div className='ChatBotAlignBotIcon'>
                <Modal
                    open={ChatSec}
                    onClose={() => { ChatTrue() }}
                    className={ChatSec ? 'ChatBotAlignBotChatModal open' : 'ChatBotAlignBotChatModal'}
                >
                    <div className='ChatBotAlignBotChat'>
                        <div className='ChatBotChatHeader'>
                            <img className='ChatBotChatHeaderImg' src="./images/TempDocImg.jpg" alt="" />
                            <div className='ChatBotChatHeaderText'>
                                <p className='ChatBotChatHeaderTextPtag1'>Chat with</p>
                                <p className='ChatBotChatHeaderTextPtag2'>Doctor One BOT</p>
                            </div>
                            <button onClick={CloseAndClear} className='ChatBotChatHeaderClose'>
                                <CloseIcon id="ChatBotChatHeaderCloseIcon" />
                            </button>
                        </div>
                        <div id="chatContainer" className='ChatBotChatsSec'>
                            {Chats?.map((ele,index) =>
                                <Fragment key={index}>
                                    <div className='ChatBotChatsSecAlign'>
                                        {ele?.bot &&
                                            <>
                                                <div className='ChatBotChatsSecChatBot'>
                                                    <p>{ele?.bot}</p>
                                                </div>
                                                {ele?.ExtraBot &&
                                                    <div className='ChatBotChatsSecChatBot'>
                                                        <p>{ele?.ExtraBot}</p>
                                                    </div>
                                                }

                                                {ele?.Qnm == 1 &&
                                                    <div className='ChatBotChatsSecSuggetions'>
                                                        <button value="Doctor"
                                                            disabled={Chats?.find(ele => ele.Qnm === 2 || ele.Qnm === 3 || ele.Qnm === 4) ? true : false}
                                                            onClick={ChooseFn} className='ChatBotChatsSecSuggetionsBtn'
                                                        >Doctor</button>
                                                        <button value="Hospital"
                                                            disabled={Chats?.find(ele => ele.Qnm === 2 || ele.Qnm === 3 || ele.Qnm === 4) ? true : false}
                                                            onClick={ChooseFn} className='ChatBotChatsSecSuggetionsBtn'
                                                        >Hospital</button>
                                                        <button value="Laboratory"
                                                            disabled={Chats?.find(ele => ele.Qnm === 2 || ele.Qnm === 3 || ele.Qnm === 4) ? true : false}
                                                            onClick={ChooseFn}
                                                            className='ChatBotChatsSecSuggetionsBtn'
                                                        >Laboratory</button>
                                                    </div>
                                                }
                                                {/* {ele?.Qnm == 3 &&
                                                    <div className='ChatBotChatsSecSuggetions'>
                                                        <button value="No"
                                                            disabled={Chats?.find(ele => ele.Qnm === 4) ? true : false}
                                                            onClick={ChooseFn}
                                                            className='ChatBotChatsSecSuggetionsBtn'>NO</button>
                                                        <button value="Yes"
                                                            disabled={Chats?.find(ele => ele.Qnm === 4) ? true : false}
                                                            onClick={ChooseFn}
                                                            className='ChatBotChatsSecSuggetionsBtn'>YES</button>
                                                    </div>
                                                } */}
                                                {ele?.Qnm == 4 && Chats.find(ele => ele.Qnm === 1 && ele?.answer === "Hospital" || ele?.answer === "Laboratory") &&
                                                    < div className='ChatBotChatsSecSuggetions'>
                                                        {ele?.Qnm === 4 && Chats.find(ele => ele.Qnm === 1 && ele?.answer === "Hospital")
                                                            ?
                                                            <div className='ChatBotChatsSecSuggetions'>
                                                                <button
                                                                    disabled={Chats?.find(ele => ele.Qnm === 5) ? true : false}
                                                                    value="Yes" onClick={() => { navigate("/hospitaladminregistration1") }}
                                                                    className='ChatBotChatsSec3QnmBtn'>Registration link</button>
                                                            </div>
                                                            :
                                                            ele?.Qnm === 4 && Chats.find(ele => ele.Qnm === 1 && ele?.answer === "Laboratory") ?

                                                                <div className='ChatBotChatsSecSuggetions'>
                                                                    <button
                                                                        disabled={Chats?.find(ele => ele.Qnm === 5) ? true : false}
                                                                        value="Yes" onClick={() => { navigate("/labadminregistration1") }}
                                                                        className='ChatBotChatsSec3QnmBtn'>Registration link</button>
                                                                </div>
                                                                : ''
                                                        }
                                                        <button value="Thru relationship manager"
                                                            disabled={Chats?.find(ele => ele.Qnm === 5) ? true : false}
                                                            onClick={ChooseFn}
                                                            className='ChatBotChatsSec3QnmBtn'>Thru relationship manager</button>
                                                    </div>
                                                }
                                                {/* {ele?.Qnm === 4 && Chats.find(ele => ele.Qnm === 3 && ele?.answer === "No") ? (
                                                    ele?.Qnm === 4 && Chats.find(ele => ele.Qnm === 1 && ele?.answer === "Doctor") ?
                                                        <div className='ChatBotChatsSecSuggetions'>
                                                            <button value="Yes" onClick={() => { navigate("/doctoradminregistration1") }} className='ChatBotChatsSecSuggetionsLong'>Registration</button>
                                                        </div>

                                                        :
                                                        ele?.Qnm === 4 && Chats.find(ele => ele.Qnm === 1 && ele?.answer === "Hospital")
                                                            ?
                                                            <div className='ChatBotChatsSecSuggetions'>
                                                                <button value="Yes" onClick={() => { navigate("/hospitaladminregistration1") }} className='ChatBotChatsSecSuggetionsLong'>Registration</button>
                                                            </div>
                                                            :
                                                            ele?.Qnm === 4 && Chats.find(ele => ele.Qnm === 1 && ele?.answer === "Lab") ?

                                                                <div className='ChatBotChatsSecSuggetions'>
                                                                    <button value="Yes" onClick={() => { navigate("/labadminregistration1") }} className='ChatBotChatsSecSuggetionsLong'>Registration</button>
                                                                </div>
                                                                : ''
                                                ) : null} */}


                                            </>
                                        }
                                    </div >
                                    {ele?.user &&
                                        <div className='ChatBotChatsSecUserBot'>
                                            <p>{ele?.user}</p>
                                        </div>
                                    }
                                </Fragment>
                            )}
                        </div>
                        <div className='ChatBotInputSec'>
                            <input maxLength={40}
                                disabled={
                                    Chats[Chats?.length - 1]?.Qnm === 1 ||
                                        Chats[Chats?.length - 1]?.Qnm === 5 ||
                                        Chats?.find(ele => ele.Qnm === 4
                                        ) ?
                                        true : false}
                                onKeyDown={handleClick}
                                onChange={InputField}
                                ref={inpRef}
                                value={TempUserInput}
                                placeholder={Chats[Chats?.length - 1]?.Qnm === 1 || Chats[Chats?.length - 1]?.Qnm === 4 && !Chats.find(ele => ele.Qnm === 1 && ele.answer === "Doctor") ? 'Please select the Buttons...'
                                    :
                                    'Type your message here...'
                                } type={Chats[Chats?.length - 1]?.Qnm === 3 ? "number" : "text"}
                                name="UserInput" id="" />
                            <button onClick={ConfirmInput} value="confirm" className='ChatBotInputSecIcon'>
                                <TelegramIcon id="ChatBotInputSecOrgIcon" />
                            </button>
                        </div>
                    </div>
                </Modal >
                {
                    (window.innerWidth >= 799 || !ChatSec) && (
                        <div
                            onClick={ChatTrue}
                            className={ChatSec ? 'ChatBotAlignBotShape' : 'ChatBotAlignBotShape annimation'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM6 7C5.44772 7 5 7.44772 5 8V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V8C19 7.44772 18.5523 7 18 7H13H11H6ZM2 10H0V16H2V10ZM22 10H24V16H22V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM15 14.5C15.8284 14.5 16.5 13.8284 16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5Z"></path>
                            </svg>
                            <p>Want to partner with us ?</p>
                        </div>
                    )
                }

            </div >
        </>
    )
}

export default ChatBot
