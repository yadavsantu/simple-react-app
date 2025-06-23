import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function Home() {
  return (
    <>
    <Navbar/>

    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">Welcome to the Home Page!</h1>
      <p>You are now logged in.</p>
    </div>
    <Footer/>
    </>
  );
}

export default Home;
