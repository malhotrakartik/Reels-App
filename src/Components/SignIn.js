
import React,{useState,useContext,useEffect} from 'react'
import { useHistory } from 'react-router-dom';     //used in moving to different route
import {AuthContext} from '../Context/AuthProvider';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const {logIn} =useContext(AuthContext);
    const {currentUser} =useContext(AuthContext);
    // const history = useHistory();
    const history = useHistory();
     const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
          console.log('Logging in user')
          setLoading(true)
          console.log(email,password)
          await logIn(email, password)
          console.log('user logged in')
          history.push('/')
          setLoading(false)
          
        } catch {
          setError("Failed to log in")
          setTimeout(()=>setError(''),2000)
          setLoading(false)
         
        }
      }
      useEffect(()=>{
        if(currentUser)
        {
          history.push('/')
        }
      },[])
   
   
    const paperStyle={padding :20,height:'70vh',width:280, margin:"0px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'20px 0'}
    const gridStyle = {
        boxSizing : 'border-box',
        backgroundImage : `url(${Image})`,
        height : '100vh',
        width : '100vw',
        marginTop : '0',
        paddingTop : '40px',
        backgroundSize : 'cover'
    }
    return(
        <div style = {gridStyle}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' type = "email" value = {email}  onChange={(e) => setEmail(e.target.value)} fullWidth required/>
                <TextField label='Password' value = {password} type='password' onChange={(e) => setPassword(e.target.value)} fullWidth required/>
               
                <Button type='submit' color='primary' variant="contained" onClick = {handleSubmit} style={btnstyle} fullWidth>Sign In</Button>
               
            </Paper>
        </div>
    )
              

      
    
}
export default SignIn
