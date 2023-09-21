import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/form.css';
import SignIn from './SignIn';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      navigate('/gallery');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError('Check your login credentials');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPressed=(e)=>{
    if(e.key=='Enter'){
      register();
    }
  }

  return (
    <div className='form'>
      <h2>Sign Up</h2>
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
          onKeyDown={handleKeyPressed}
        />
        <div onClick={togglePasswordVisibility} className='eye-icon'>
          <ion-icon name={showPassword ? 'eye-off' : 'eye'}></ion-icon>
        </div>
      </div>
      <button onClick={register}>SignUp</button>
      {error && <p className='error'>{error}</p>}
      <p>
        Already have an account? <Link to='/'>SignIn</Link>
      </p>
    </div>
  );
}

export default SignUp;
