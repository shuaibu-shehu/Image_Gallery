import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/form.css';
import SignUp from './SignUp';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const login = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const user = await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      console.log(user);
      console.log('user signed in');
      navigate('/Gallery');
    } catch (error) {
      setError('Use the correct credentials');
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or failure
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className='form'>
      <h2>Login</h2>
      <div className='input-div'>
        <label>Email</label>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <label>Password</label>

      <div className='input-div'>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div onClick={togglePasswordVisibility} className='eye-icon'>
          <ion-icon name={showPassword ? 'eye-off' : 'eye'}></ion-icon>
        </div>
      </div>
      <button onClick={login} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'} {/* Display loading text while loading */}
      </button>
      {error && <p className='error'>{error}</p>}
      <p>
        Don't have an account? <Link to='/SignUp'>Register</Link>
      </p>
    </div>
  );
}

export default SignIn;
