//import Nav from '../../components/Nav/Nav';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import { useMainContext } from '../../components/Context/Context';
import Dash from '../Dash/Dash';

const Home = () => {
  const { user, setUser } = useMainContext();

  return (
    <>
    {user?._id ? (
        <Dash/>
      ) : (
        <>
          <Hero></Hero>
          <Features></Features>
        </>
      )
    }
    </>
  )
}

export default Home;