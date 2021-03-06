import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useHistory } from 'react-router-dom';     //used in moving to different route
import { storage, database } from "../firebase";
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Image from '../Images/background.jpeg'

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signUp } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const history = useHistory()
    const {currentUser} =useContext(AuthContext);
    // console.log(signup);
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signUp(email, password);
            let uid = res.user.uid;
            console.log(uid);
            const uploadTaskListener = storage
                .ref(`users/${uid}/profileImage`)
                .put(file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            // fn 1 -> progress tracking
            // fn2 -> error
            // fn3 -> success
            uploadTaskListener.on("state_changed", fn1, fn2, fn3);
            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            }
            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('')
                }, 2000);
                setLoading(false)
            }
            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log(downloadUrl);
                await database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: []
                })
            }
            setLoading(false);
            history.push('/');
        } catch (err) {
            console.log(err);
         }
    };
    const handleFileSubmit = (e) => {
        let file = e.target.files[0];
        if (file != null) {
            setFile(file);
        }
    };
    const moveToSignIn = (e) => {
        history.push('/signin');
    }

    useEffect(()=>{
          if(currentUser){
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
                    <h2>Sign Up</h2>
                </Grid>
                <TextField label='Name' type = "text" value = {name}  onChange={(e) => setName(e.target.value)}  fullWidth required/>
                <TextField label='Username' type = "email" value = {email}  onChange={(e) => setEmail(e.target.value)} fullWidth required/>
                <TextField label='Password' value = {password} type='password' onChange={(e) => setPassword(e.target.value)} fullWidth required/>
                <TextField label='Profile Image'  accept="image/*" type='file' onChange={handleFileSubmit} fullWidth required/>
               
                <Button type='submit' color='primary' variant="contained" onClick = {handleSignup} style={btnstyle} fullWidth>Sign Up</Button>
                <div style = {{color : "blue" , fontWeight : "bold",cursor : "pointer"}} onClick = {moveToSignIn} >Already have an account ? Sign In</div>

               
            </Paper>
        </div>
    )
   
}
export default SignUp;
