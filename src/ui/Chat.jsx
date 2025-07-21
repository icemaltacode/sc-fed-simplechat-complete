import styled from "styled-components";
import fancyTime from "../util/FancyTime.jsx";
import getUserColor from "../util/UserColor.jsx";
import UserIcon from "../util/UserIcon.jsx";

const ChatBoxContainer = styled.div`
  display: flex;
  align-self: ${({ $usertype }) => {
    if ($usertype === "system") {
      return "center";
    } else if ($usertype === "user") {
      return "flex-end";
    }
    return "flex-start";
  }};
  margin: 0 10px 10px 10px;
`;

const ChatBox = styled.div(({ $bgcolor, $usertype }) => `
  position: relative;
  padding: 15px;
  margin: 0;
  max-width: 300px;
  border-radius: 20px;
  background: ${$bgcolor?.color ?? "lightgrey"};
  color: ${$bgcolor?.isLight ? "black" : "white"};

  ${$usertype === "user" ? `
    align-self: flex-end;
    margin-left: 40px;

    &::after {
      content: "";
      position: absolute;
      right: -6px;
      bottom: 14px;
      width: 0;
      height: 0;
      z-index: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid ${$bgcolor?.color ?? "lightgrey"};
    }
  ` : $usertype === "system" ? `
    align-self: center;
    margin: 0 auto;
  ` : `
    align-self: flex-start;
    margin-right: 40px;

    &::after {
      content: "";
      position: absolute;
      left: -6px;
      bottom: 14px;
      width: 0;
      height: 0;
      z-index: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid ${$bgcolor?.color ?? "lightgrey"};
    }
  `}

  .senderName {
    font-size: 8pt;
    font-weight: bold;
    color: ${$bgcolor?.isLight
      ? "rgba(143, 48, 4, 1)"
      : "rgba(255, 208, 64, 1)"};
  }

  .messageTime {
    font-size: 7pt;
    color: rgba(0, 0, 0, 0.5);
  }
`);

const ChatBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChatBoxBody = styled.div`
  ${({ $bgcolor }) =>
      $bgcolor &&
      `color: ${
        $bgcolor.isLight ? "black" : "white"
      }`};
`;

function Chat({ messageTime, senderName, senderId, userId, children }) {
  const userType =
    senderId === "system" ? senderId : senderId === userId ? "user" : "other";
  const colorData = getUserColor(userType, senderId);

  return (
    <ChatBoxContainer $usertype={userType}>
      <UserIcon userName={senderName} userId={senderId} userType={userType} />
      <ChatBox $bgcolor={colorData} $usertype={userType}>
        <ChatBoxHeader>
          <p className="senderName">{senderName}</p>
          <p className="messageTime">{fancyTime(messageTime)}</p>
        </ChatBoxHeader>
        <ChatBoxBody $bgcolor={colorData}>{children}</ChatBoxBody>
      </ChatBox>
    </ChatBoxContainer>
  );
}

export default Chat;
