import { ZoomMtg } from "@zoomus/websdk";

import { useEffect, useState } from "react"; // Added useState
const Buffer = require("buffer").Buffer;
const CryptoJS = require("crypto-js");

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  return new Promise((res, rej) => {
    const timestamp = new Date().getTime() - 30000;
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
      "base64"
    );
    const hmac = CryptoJS.HmacSHA256(msg, apiSecret); // Create HMAC SHA-256 hash
    const signature = `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hmac.toString(
      CryptoJS.enc.Base64
    )}`;
    res(signature);
  });
}

const Zoom = () => {
  const [signature, setSignature] = useState(""); // Use state to store the signature

  useEffect(() => {
    async function initZoom() {
      try {
        showZoomDiv();
        ZoomMtg.setZoomJSLib("https://source.zoom.us/2.10.1/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareWebSDK();

        const signature = await generateSignature(
          apiKey,
          apiSecret,
          meetingNumber,
          0
        );
        setSignature(signature); // Set the signature in state
        initiateMeeting();
      } catch (error) {
        console.error("Error initializing Zoom Web SDK:", error);
      }
    }

    initZoom();
  }, []);

  const showZoomDiv = () => {
    document.getElementById("zmmtg-root").style.display = "block";
  };

  const initiateMeeting = () => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
            handleError(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
        handleError(error);
      },
    });
  };

  const handleError = (error) => {
    console.error("error------", error);
  };

  const signatureEndpoint = "http://localhost:3000";
  const apiKey = "YOUR_JWT_API_KEY"; // Replace with your API key
  const meetingNumber = 123456789;
  const role = 0;
  const leaveUrl = "http://localhost:4000";
  const userName = "WebSDK";
  const userEmail = "";
  const passWord = "";
  const apiSecret = "YOUR_ZOOM_API_SECRET_KEY"; // Replace with your API secret key

  // var apiKey = "MVfVOSCEQwGZNKFD2slZ-w";
  // var apiSecret = "dXNpRJHw9Oeme5tqiNEvpBsJ8EfOh0UDBB25";
  // var meetingNumber = 88159642391;
  // var leaveUrl = "http://localhost:3000"; // our redirect url
  // var userName = "WebSDK";
  // var userEmail = "test@gmail.com";
  // var passWord = "4ZFu37";

  return <div className="App">Zoom</div>;
};

export default Zoom;
