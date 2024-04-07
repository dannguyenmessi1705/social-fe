import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const Container = styled.div`
  padding-top: 52px;
  max-width: 100dvw;
  background-color: #f5f5f5;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 25px;
  row-gap: 25px;
  max-width: 80%;
  margin: 20px auto;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

function AppLayout({ user }) {
  return (
    <>
      <Header user={user} />
      <Container>
        <Layout>
          <Outlet context={{ user }} />
        </Layout>
      </Container>
    </>
  );
}

export default AppLayout;
