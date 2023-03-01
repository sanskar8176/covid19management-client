import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
  Alert,
} from "@mui/material";
import { getToken, getUser } from "../services/LocalStorageService";
import { useState } from "react";
import { addStateCovidData } from "../services/api.js";
import { useNavigate } from "react-router-dom";

const initialValue = {
  totalcases: "",
  recovered: "",
  activecases: "",
  death: "",
  vaccinated: "",
  createdon: new Date(),
};

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddStateCovidData = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const [data, setData] = useState(initialValue);
  const { totalcases, recovered, activecases, death, vaccinated } = data;

  const token = getToken();
  const user = JSON.parse(getUser());
  const navigate = useNavigate();

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    const currentDate = new Date();
    const actualData = {
      totalcases,
      recovered,
      activecases,
      death,
      vaccinated,
      createdon: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        0,
        0,
        0,
        0
      ),
    };

    // logical check here

    if (!totalcases || !recovered || !activecases || !death || !vaccinated) {
      setError({ status: true, msg: "All fields required", type: "error" });
    } else if (
      parseInt(totalcases) < parseInt(recovered) ||
      parseInt(totalcases) < parseInt(activecases) ||
      parseInt(totalcases) < parseInt(death)
    ) {
      setError({ status: true, msg: "Data is not valid ", type: "error" });
    } else {
      const res = await addStateCovidData(actualData, user.state, token);

      if (res.data.status === "success") {
        setError({ status: true, msg: res.data.message, type: "success" });

        setTimeout(() => {
          navigate("/user");
        }, 500);
      } else {
        setError({ status: true, msg: res.data.message, type: "error" });
      }
    }
  };

  return (
    <>
      <Container>
        <Typography variant="h4">{user.state}</Typography>
        <FormControl>
          <InputLabel htmlFor="my-input">Total Cases</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="totalcases"
            value={totalcases}
            id="my-input"
            required="true"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Recovered</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="recovered"
            value={recovered}
            id="my-input"
            required="true"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Active Cases</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="activecases"
            value={activecases}
            id="my-input"
            required="true"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Death</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="death"
            value={death}
            id="my-input"
            required="true"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Vaccinated</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="vaccinated"
            value={vaccinated}
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
            Add Data
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

export default AddStateCovidData;
