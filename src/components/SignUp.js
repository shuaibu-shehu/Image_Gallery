import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/form.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const register = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const user = await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      console.log(user);
      console.log('user signed up');
      navigate('/Gallery');
    } catch (error) {
      setError('Check your registration credentials');
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or failure
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      register();
    }
  };

  return (
    <div className='form'>
      <h2>Sign Up</h2>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={register} disabled={isLoading}>
        {isLoading ? 'Signing up...' : 'Sign Up'} {/* Display loading text while loading */}
      </button>
      {error && <p className='error'>{error}</p>}
      <p>
        Already have an account? <Link to='/'>Sign In</Link>
      </p>
    </div>
  );
}

export default SignUp;
