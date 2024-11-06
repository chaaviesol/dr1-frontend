import React, { Fragment, useEffect, useState } from "react";
import "../../../../../../components/ChatBot/ChatBot.css";
import { CircularProgress, IconButton, Modal } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import CloseIcon from "@mui/icons-material/Close";
import { port } from "../../../../../../config";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

export default function Chatbot() {
  const [ChatSec, setChatSec] = useState(true);
  const [Chats, setChats] = useState([]);
  const [TempUserInput, setTempUserInput] = useState();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const InputField = (e) => {
    const value = e?.target?.value;
    setTempUserInput(value);
  };
  useEffect(() => {
    const chatContainer = document.getElementById("chatContainer");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer?.scrollHeight;
    }
  }, [Chats, TempUserInput]);
  const ConfirmInput = () => {
    let TempChats = Chats;
    TempChats[TempChats?.length - 1] = {
      ...TempChats[TempChats?.length - 1],
      user: TempUserInput,
    };

    setChats(TempChats);
    fetchBotCallResultMutation.mutateAsync(TempUserInput);
  };
  const fetchBotResult = async (query) => {
    const payload = {
      message: query,
    };
    const response = await axiosPrivate.post(`${port}/bot/chatbot`, payload);

    return response.data;
  };
  const fetchBotCallResultMutation = useMutation({
    mutationKey: ["fetchBotCallResultMutation"],
    mutationFn: (query) => fetchBotResult(query),
    onSuccess: (data) => {
      BotRes(data.message);
    },
    onError: (error) => {
      // console.log("popo")
    },
  });

  const BotRes = (response) => {
    let TempChats = Chats;
    TempChats = [...TempChats, { bot: response } || ""];
    setChats(TempChats);
    setTempUserInput("");
  };

  useEffect(() => {
    const intialMessage = "Hi";
    fetchBotCallResultMutation.mutateAsync(intialMessage);
  }, []);

  const handleClick = (event) => {
    if (event.key === "Enter") {
      ConfirmInput();
    }
  };
  const CloseAndClear = () => {
    setChatSec(false);
    navigate("/");
  };
  return (
    <div>
      <Modal
        open={ChatSec}
        onClose={() => {
          setChatSec(false);
        }}
        className={
          ChatSec ? "ChatBotAlignBotChatModal open" : "ChatBotAlignBotChatModal"
        }
      >
        <div className="ChatBotAlignBotChat">
          <div className="ChatBotChatHeader">
            <img
              className="ChatBotChatHeaderImg"
              src="./images/TempDocImg.jpg"
              alt=""
            />
            <div className="ChatBotChatHeaderText">
              <p className="ChatBotChatHeaderTextPtag1">Chat with</p>
              <p className="ChatBotChatHeaderTextPtag2">Doctor One BOT</p>
            </div>
            <button onClick={CloseAndClear} className="ChatBotChatHeaderClose">
              <IconButton>
                <CloseIcon id="ChatBotChatHeaderCloseIcon" />
              </IconButton>
            </button>
          </div>
          <div id="chatContainer" className="ChatBotChatsSec">
            {Chats?.map((ele, index) => (
              <Fragment key={index}>
                <div className="ChatBotChatsSecAlign">
                  {ele?.bot && (
                    <>
                      <div className="ChatBotChatsSecChatBot">
                        <p>{ele?.bot}</p>
                      </div>
                    </>
                  )}
                  {ele?.user && (
                    <div className="ChatBotChatsSecUserBot">
                      <p>{ele?.user}</p>
                    </div>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
          <div className="ChatBotInputSec">
            <input
              onKeyDown={handleClick}
              onChange={InputField}
              placeholder="Input your queries"
              type="text"
              value={TempUserInput}
              name="UserInput"
              id=""
            />
            <button
              type="button"
              onClick={ConfirmInput}
              disabled={!TempUserInput || fetchBotCallResultMutation.isPending}
              value="confirm"
              className="ChatBotInputSecIcon"
            >
              {fetchBotCallResultMutation.isPending ? (
                <CircularProgress size="1.5rem" sx={{ color: "white" }} />
              ) : (
                <TelegramIcon id="ChatBotInputSecOrgIcon" />
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
