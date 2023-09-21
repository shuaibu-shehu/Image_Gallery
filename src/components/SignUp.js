import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./styles/form.css"
import SignIn from './SignIn';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const register=async ()=>{
    try{
    const user =await createUserWithEmailAndPassword(
     auth,
     email,
     password
    )
    setEmail('');
    setPassword('')
    console.log(user);
    } catch(error){
        console.log(error);
    }
 }


  return (
    <div className='form'>
      <h2>Sign Up</h2>
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
      <button onClick={register}>SignUp</button>
      {error && <p>{error}</p>}
      <p>Already have an Acoount have an accout? <Link to='/'>SignIn</Link></p>
    </div>
  );

}

export default SignUp;
