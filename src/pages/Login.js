import React, { useState } from "react";
import {
  Button,
  Alert,
  Typography,
  Input,
  InputLabel,
  FormControl,
  FormGroup,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { storeToken, storeUser } from "../services/LocalStorageService.js";

import { loginUser } from "../services/api.js";

const initialValue = {
  username: "",
  password: "",
  role: "",
};

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const [user, setUser] = useState(initialValue);
  const { username, password } = user;

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!user.username || !user.password) {
      setError({ status: true, msg: "All fields are required", type: "error" });
    } else {
      const res = await loginUser(user);
      console.log(res);
      if (res.data.status === "success") {
        //set token
        storeToken(res.data.token);

        const userstring = JSON.stringify(res.data.user);

        storeUser(userstring);
        setError({ status: true, msg: "Login Successfully", type: "success" });

        // login pr dashboard me nhi redirect app.js ya login.js me useEffect try krk dekhna 

        //  setTimeout(()=>{
        navigate(`/${res.data.user.role}`);
        // window.location.reload();
        // }, 500)
      } else {
        setUser(initialValue);
        setError({ status: true, msg: res.data.message, type: "error" });
      }
    }
  };

  return (
    <>
      <Container>
        <Typography variant="h4" textAlign="center">
          User/Admin Login
        </Typography>

        <FormControl>
          <InputLabel htmlFor="my-input">Username</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="username"
            value={username}
            id="my-input"
            required="true"
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="my-input">Password</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="password"
            value={password}
            id="my-input"
            required="true"
          />
        </FormControl>

        <FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
        </FormControl>
        {error.status && (
          <Alert
            onClose={() => {
              setError({ status: false });
            }}
            severity={error.type}
            sx={{ mt: 3 }}
          >
            {error.msg}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default Login;
