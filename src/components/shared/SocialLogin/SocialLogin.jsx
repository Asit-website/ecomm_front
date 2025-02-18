import { useContext, useState } from 'react';
import { auth, googleAuthProvider } from '../../../firebase';
import { signInWithPopup } from 'firebase/auth';
import router from "next/router";
import { CartContext } from "pages/_app";

export const SocialLogin = () => {
  const { setToken, setUserDetails, fetchAllCartItem, fetchAllWishlistItem } =
    useContext(CartContext);

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;

      const idToken = await user.getIdToken();
      const res = await fetch('https://ecomm-backend-aopz.onrender.com/api/v1/LoginWithGoogle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const formattedResponse = await res.json();

      if (!formattedResponse.success) {
        alert(formattedResponse.message);
      } else {
        alert(formattedResponse.message);

        var userObjectString = JSON.stringify(formattedResponse.user);

        localStorage.setItem("ecomm_userToken", formattedResponse?.token);

        setToken(formattedResponse?.token);
        setUserDetails(formattedResponse?.user);
        localStorage.setItem("ecomm_user", userObjectString);
        fetchAllCartItem();
        fetchAllWishlistItem();
        router.push("/");
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      setError('Error during Google login. Please try again.');
    }
  };

  return (
    <div>
      <ul className='login-form__social'>
        <li>
          <a href='#'>
            <i className='icon-facebook'></i>
          </a>
        </li>
        <li>
          <a href='#'>
            <i className='icon-twitter'></i>
          </a>
        </li>
        <li>
          <a href='#'>
            <i className='icon-insta'></i>
          </a>
        </li>
        <li>
          <a onClick={handleLogin}>
            <i className='icon-google'></i>
          </a>
        </li>
      </ul>
    </div>
  );
};
