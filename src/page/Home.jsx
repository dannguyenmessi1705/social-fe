import LeftSide from "../ui/LeftSide";
import Main from "../ui/Main";
import RightSide from "../ui/RightSide";

/*________________________________________________________________________________*/

const Home = (props) => {
  document.title = "Feed | Linkedin";
  return (
    <>
      <LeftSide />
      <Main />
      <RightSide />
    </>
  );
};
export default Home;
