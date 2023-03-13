import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";

var url = process.env.REACT_APP_URL || "http://localhost:3000/";

const LoginForm = () => {

  const { userState, dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let loginRequest = {
      email,
      password,
    };


    userService.login(loginRequest, dispatch);
  };

  return (
    <div>
   


        <div class="login-page2">
          <div class="image-div">
            <img
              src={'./assets/img/logo.png'}
              alt="Logo"
              style={{ maxWidth: "130px", width: "100%", marginBottom: "30px" }}
            ></img>
          </div>
          <div class="form">
            <h4 style={{ fontSize: 20 }} >Welcome back </h4>
            <br/>
            <form method="post" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  required
                  name="email"
                  style={{ height: "50px" }}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  style={{ height: "50px" }}
                  required
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div
                className="form-group text-center"
                style={{ color: "red", fontSize: "0.8em" }}
                hidden={!userState.loginError.showError}
              >
                {userState.loginError.errorMessage}
              </div>
              <div
                className="form-group text-center"
                style={{ color: "red", fontSize: "0.8em" }}
              >
                <a href = "#/forgotPassword" style ={{border: "0px"}}> Forgot password? </a>
              </div>
              <input
                className="btn btn-primary btn-block"
                type="submit"
                id="kayitol"
                style={{ background: "#5e90f6" }}
                value="Log in"
              />
            </form>
          </div>
        </div>
    </div>
  );
};

export default LoginForm;
