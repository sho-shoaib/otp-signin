import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "./Firebase";
import PhoneInput from "react-phone-number-input";
import { CircularProgress } from "@mui/material";

function App() {
  const [mobile, setMobile] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [isSignedIn, setIsSignedIn] = useState("");

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-verifier",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const requestOtp = (e) => {
    e.preventDefault();
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    setIsOtpSent("loading");
    signInWithPhoneNumber(authentication, mobile, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
        console.log("success", confirmationResult);
        setIsOtpSent("sent");
      })
      .catch((error) => {
        console.log("failed", error);
        setIsOtpSent("error");
      });
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otpInput.length === 6) {
      setIsSignedIn("loading");
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otpInput)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(user);
          setIsSignedIn("success");
          // ...
        })
        .catch((error) => {
          console.log(error);
          setIsSignedIn("error");
        });
    } else {
      setIsSignedIn("error");
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-7 p-8 bg-purple-50 w-max rounded-xl'>
        <h2 className='text-3xl font-semibold text-center'>Sign-In Form</h2>

        <div className='flex flex-col gap-7'>
          <form action='' onSubmit={(e) => requestOtp(e)}>
            <div id='sign-in-button'></div>
            <div className='flex gap-5'>
              <PhoneInput
                placeholder='Enter phone number'
                value={mobile}
                onChange={setMobile}
                international
                defaultCountry='IN'
                className='flex flex-col gap-1'
                countryCallingCodeEditable={false}
              />
              <button
                type='submit'
                className='px-4 py-2 text-lg bg-purple-600 text-white rounded-lg border-0 shadow-md hover:shadow-lg transition hover:scale-105 duration-300 active:scale-100 active:shadow-md self-end w-full'
              >
                Submit
              </button>
            </div>
            <div id='recaptcha-verifier'></div>
          </form>
          {isOtpSent === "loading" && (
            <div>
              <CircularProgress />
            </div>
          )}
          {isOtpSent === "sent" && (
            <form onSubmit={(e) => verifyOtp(e)}>
              <div className='flex gap-5'>
                <input
                  type='number'
                  className='PhoneInputInput'
                  placeholder='Enter OTP'
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                />
                <button
                  type='submit'
                  className='px-4 py-2 text-lg bg-purple-600 text-white rounded-lg border-0 shadow-md hover:shadow-lg transition hover:scale-105 duration-300 active:scale-100 active:shadow-md self-end'
                >
                  Verify OTP
                </button>
              </div>
            </form>
          )}
          {isOtpSent === "error" && (
            <div>
              <h4 className='font-semibold text-red-700 text-center'>
                Error Signing In
              </h4>
            </div>
          )}
          {isSignedIn === "success" && (
            <div className='mt-2'>
              <h4 className='font-semibold text-purple-700 text-center'>
                Sign In successfull!
              </h4>
            </div>
          )}
          {isSignedIn === "error" && (
            <div>
              <h4 className='font-semibold text-red-700 text-center'>
                Error Signing In
              </h4>
            </div>
          )}
          {isSignedIn === "loading" && (
            <div>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
