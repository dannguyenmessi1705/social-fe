import styled from "styled-components";

import Spinner from "./Spinner";
import useUser from "../features/authentication/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100dvh;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectRoute({ children }) {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !isLoading) navigate("/signin");
  }, [user, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (user) return children;
}

export default ProtectRoute;
