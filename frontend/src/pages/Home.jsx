import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserNameCard from '../components/UserNameCard';

function Home() {
  // Simulate getting email from login session/localStorage
  const email = localStorage.getItem('userEmail'); // You must save this at login

  return (
    <>
      <Navbar />

      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">Welcome to the Home Page!</h1>
        <p>You are now logged in.</p>
      </div>

      {/* Show user name card below */}
      <UserNameCard email={email} />

      <Footer />
    </>
  );
}

export default Home;