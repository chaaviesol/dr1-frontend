import React, { Fragment, useEffect, useState } from "react";
import "./chatbot.css";
import { CircularProgress } from "@mui/material";
import { port } from "../../../../../../config";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

export default function Chatbot() {
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
    navigate("/");
  };
  return (
    <div>
      <div className="container botmobhead flex">
        <div className="flex">
          <img src="./images/doconelogo.jpg" alt="" />
          <div>
            <h2>
              Medical Ai <i class="ri-bard-fill"></i>
            </h2>
            <h4 style={{ color: "#777777" }}>Powerded by Dr1</h4>
          </div>
        </div>
        <button onClick={CloseAndClear}>
          <i class="ri-close-line"></i>
        </button>
      </div>

      <div className="mobmessagesdata">
        {Chats?.map((ele, index) => (
          <Fragment key={index}>
            <div className="container">
              {ele?.bot && (
                <div className="aidatadiv flex">
                  <div className="ai-profile flex">
                    <h2>Ai</h2>
                  </div>
                  <h4>{ele?.bot}</h4>
                </div>
              )}
              <div className="userdatadivsec flex">
                {ele?.user && (
                  <div className="userdatadiv">
                    <h4>{ele?.user}</h4>
                  </div>
                )}
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      <div className="container botinputboxsec flex">
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
        >
          {fetchBotCallResultMutation.isPending ? (
            <CircularProgress size="1.5rem" sx={{ color: "white" }} />
          ) : (
            <i class="ri-send-plane-fill"></i>
          )}
        </button>
      </div>
    </div>
  );
}
