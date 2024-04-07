import useUser from "../features/authentication/useUser";
import LeftSide from "../ui/LeftSide";
import Main from "../ui/Main";
import RightSide from "../ui/RightSide";
import Spinner from "../ui/Spinner";

/*________________________________________________________________________________*/

const Home = (props) => {
  document.title = "Feed | Linkedin";
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  return (
    <>
      <LeftSide user={user} />
      <Main user={user} />
      <RightSide user={user} />
    </>
  );
};
export default Home;
