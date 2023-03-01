import { Grid, Typography } from "@mui/material";
import PublicTables from "../components/PublicTable";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";

const stateList = [
  { label: "ANDHRAPRADESH" },
  { label: "ARUNACHALPRADESH" },
  { label: "ASSAM" },
  { label: "BIHAR" },
  { label: "CHHATTISGARH" },
  { label: "GOA" },
  { label: "GUJARAT" },
  { label: "HARYANA" },
  { label: "HIMACHALPRADESH" },
  { label: "JHARKHAND" },
  { label: "KARNATAKA" },
  { label: "KERALA" },
  { label: "MADHYAPRADESH" },
  { label: "MAHARASHTRA" },
  { label: "MANIPUR" },
  { label: "MEGHALAYA" },
  { label: "MIZORAM" },
  { label: "NAGALAND" },
  { label: "ODISHA" },
  { label: "PUNJAB" },
  { label: "RAJASTHAN" },
  { label: "SIKKIM" },
  { label: "TAMILNADU" },
  { label: "TELANGANA" },
  { label: "TRIPURA" },
  { label: "UTTARAKHAND" },
  { label: "UTTARPRADESH" },
  { label: "WESTBENGAL" },
  { label: "ALL" },
];

const Dashboard = () => {
  const [value, setValue] = useState({ label: "ALL" });
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item sm={10}>
          <Typography style={{ marginTop: "20px" }} align="center" variant="h4">
            COIVD DATA OF ALL STATES
          </Typography>
          <hr />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={stateList}
            sx={{ width: 300 }}
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            renderInput={(params) => <TextField {...params} label="State" />}
          />

          <PublicTables searchState={value} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
