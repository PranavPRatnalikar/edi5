import { React, useState } from 'react';
import './SignUp.css'; // You can rename this to 'SignIn.css' if needed
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader'; 
import { toast, ToastContainer } from 'react-toastify';  // Import ToastContainer and toast


export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        console.log("User signed in:", user);
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);  
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="rectangle">
        <div className="inner">
          <h1>Sign In</h1>   
          <hr/><br/>
          <div className="formandimg">
            <div className="img">
              <img src="loginimg.png" alt="Login illustration"/>              
            </div>

            <div className="form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button onClick={handleSubmit} type="submit" className="submit-btn">Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
