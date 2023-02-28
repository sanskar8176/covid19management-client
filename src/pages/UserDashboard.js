import { Grid, Button, Typography } from "@mui/material";
import UserTables from "../components/UserTable";
import { getUser } from '../services/LocalStorageService';

const UserDashboard = () => {
    
    const user = JSON.parse(getUser());

   return <>
    <Grid container  justifyContent='center' >
    <Grid item sm={10}>
       <Typography style={{marginTop:'20px'}} align="center" variant="h4">COVID DATA FOR {user.state} </Typography>
        <hr />      
        <Button style={{padding:'10px', margin:'10px', width:'100%'}} href="addstatecoviddata" >Add {user.state} covid data for today</Button>      

      <UserTables/>
      </Grid>
    </Grid>
  </>;
};

export default UserDashboard;
