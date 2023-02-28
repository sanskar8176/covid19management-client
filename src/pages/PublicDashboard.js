import { Grid, Typography } from "@mui/material";
import PublicTables from "../components/PublicTable";

const Dashboard = () => {
  
   return <>
    <Grid container  justifyContent='center' >
    <Grid item sm={10}>
        <Typography style={{marginTop:'20px'}} align="center" variant="h4">COIVD DATA FOR ALL STATES </Typography>
        <hr />
    
      <PublicTables/>
      
      </Grid>
    </Grid>
  </>;
};

export default Dashboard;
