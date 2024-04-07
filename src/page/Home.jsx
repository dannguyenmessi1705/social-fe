import { useOutletContext } from "react-router-dom";

import LeftSide from "../ui/LeftSide";
import Main from "../ui/Main";
import RightSide from "../ui/RightSide";


const Home = () => {
  const { user } = useOutletContext();
  document.title = "Feed | Linkedin";
  return (
    <>
      <LeftSide user={user} />
      <Main user={user} />
      <RightSide user={user} />
    </>
  );
};
export default Home;
