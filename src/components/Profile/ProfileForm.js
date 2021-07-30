import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPassInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const { token, apiToken } = authCtx;
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPassInputRef.current.value;

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiToken}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        // const result = res.json().then((r) => console.log("30 ", r));
        console.log("30 res", res);
        history.replace("/");
      })
      .catch((error) => {
        console.log("32 ", error.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPassInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
