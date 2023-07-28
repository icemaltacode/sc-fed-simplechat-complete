import styled from "styled-components";
import fancyTime from "../util/FancyTime";
import getUserColor from "../util/UserColor";
import UserIcon from "../util/UserIcon";

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

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  min-width: 100px;

  --r: 25px; /* the radius */
  --t: 20px; /* the size of the tail */

  margin: 0;
  max-width: 300px;
  padding: 15px;
  -webkit-mask: radial-gradient(var(--t) at var(--_d) 0, #0000 98%, #000 102%)
      var(--_d) 100% / calc(100% - var(--r)) var(--t) no-repeat,
    conic-gradient(at var(--r) var(--r), #000 75%, #0000 0) calc(var(--r) / -2)
      calc(var(--r) / -2) padding-box,
    radial-gradient(50% 50%, #000 98%, #0000 101%) 0 0 / var(--r) var(--r) space
      padding-box;

  ${({ $usertype }) =>
    $usertype && $usertype === "user"
      ? `  --_d: 100%;
  border-right: 16px solid #0000;
  margin-left: var(--t);
  place-self: end;`
      : $usertype === "system"
      ? ""
      : `--_d: 0%;
    border-left: 16px solid #0000;
    margin-right: var(--t);
    place-self: start;`};

  ${({ $bgcolor }) => $bgcolor && `background: ${$bgcolor.color}`};

  .senderName {
    font-size: 8pt;
    font-weight: bold;
    ${({ $bgcolor }) =>
      $bgcolor &&
      `color: ${
        $bgcolor.isLight ? "rgba(143, 48, 4, 1)" : "rgba(255, 208, 64, 1)"
      }`};
  }

  .messageTime {
    font-size: 7pt;
    color: rgba(0, 0, 0, 0.5);
  }
`;

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
