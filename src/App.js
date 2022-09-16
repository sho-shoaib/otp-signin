import { useState } from "react";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";

function App() {
  const [mobile, setMobile] = useState(0);

  const auth = getAuth();
  window.recaptchaVerifier = new RecaptchaVerifier(
    "sign-in-button",
    {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
        console.log("Recaptca verified");
      },
    },
    auth
  );

  const onSignInSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = mobile;
    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  };

  return (
    <div className='flex flex-col gap-5 p-5'>
      <h2 className='text-3xl font-semibold'>Login Form</h2>

      <div>
        <form action='' onSubmit={() => onSignInSubmit()}>
          <div id='sign-in-button'></div>
          <div className='flex gap-5'>
            <input
              type='number'
              name='mobile'
              placeholder='Mobile Number'
              required
              className='w-92 p-2 bg-purple-200 border-2 border-purple-600 rounded-md'
              onChange={(e) => setMobile(e.target.value)}
            />
            <button
              type='submit'
              className='px-4 py-2 text-lg bg-purple-600 text-white rounded-lg border-0 shadow-md hover:shadow-lg transition hover:scale-105 duration-300 active:scale-100 active:shadow-md'
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
