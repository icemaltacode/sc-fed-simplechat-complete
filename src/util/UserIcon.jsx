import { useMemo } from "react";
import styled from "styled-components";
import { minidenticon } from "minidenticons";

const IconImg = styled.img`
    border-radius: 50%;
    background: lightgray;
    width: 32px;
    height: 32px;
    align-self: flex-end;
    ${({ $usertype }) => $usertype && $usertype === 'user' ? 'order: 2' : ''};
`;

const UserIcon = ({ userName, userId, userType }) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(userId, 90, 20)),
    [userId]
  );
  return userId === 'system' ? null : <IconImg $usertype={userType} src={svgURI} alt={userName} />;
};

export default UserIcon;
