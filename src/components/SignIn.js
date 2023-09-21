import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import "./styles/form.css"
import SignUp from './SignUp';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate=useNavigate()

  const login=async ()=>{
    try{
    const user =await signInWithEmailAndPassword(
     auth,
     email,
     password
    )
    setEmail('');
    setPassword('')
    console.log(user);
    console.log("user signed in");
    navigate('/Gallery')
    } catch(error){
        setError('Use the correct credentials');
    }
 }

  return (
    <div className='form'>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      {error && <p>{error}</p>}
      <p className='error'>Don't have an accout? <Link to='/SignUp'>Register</Link></p>
    </div>
  );
  console.log(email);
}

export default SignIn;
