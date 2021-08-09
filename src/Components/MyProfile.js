import React from 'react'
import { useHistory } from 'react-router-dom';     //used in moving to different route
import Header from './Header';
import Image from '../Images/background.jpeg'
import { makeStyles } from '@material-ui/core/styles';
import Posts from './Posts';
const useStyles = makeStyles((theme) => ({
    profileContainer : {
        marginTop : "120px",
        display:"flex",
        alignItems : 'center',
        justifyContent : 'center',
        height : "10vh",
        marginBottom : '60px'

 }
  }));
function MyProfile() {
    const history = useHistory();
    const classes = useStyles();
    return (
        <div>
            <Header/>
            <div id="profile-container" className = {classes.profileContainer}>
               <img src = {Image} />
               <h2>MY name</h2>
            </div>
            <hr />
            <div id = "posts-container" className = {classes.postContainer}>
               <h3>Posts</h3>
               {/* <Posts userData = {userData}></Posts> */}
            </div>
            
        </div>
    )
}

export default MyProfile
