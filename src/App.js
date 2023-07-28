import styled from "styled-components";
import { useState } from "react";
import RegisterUser from "./ui/RegisterUser";
import ChatView from "./ui/ChatView";
import SendMessage from "./ui/SendMessage";

const FlexContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

function App() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const handleRegisterUser = (userId, userName) => {
    setUserId(userId);
    setUserName(userName);
  }

  return (
    <FlexContainer>
      {userId === "" ? (
        <RegisterUser userRegHandler={handleRegisterUser} />
      ) : (
        <>
          <ChatView userId={userId} />
          <SendMessage senderId={userId} senderName={userName} />
        </>
      )}
    </FlexContainer>
  );
}

export default App;
