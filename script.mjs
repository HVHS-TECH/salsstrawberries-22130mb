//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by <Your Name Here>, Term 2 202?
//
// All variables & function begin with fb_  all const with FB_
  
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c scrip.mjs',
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
/**************************************************************/
// EXPORT FUNCTIONS
var fb_gameDB;
var fb_uid;
// List all the functions called by code or html outside of this module
function fb_authenticate() {
    console.log('%c fb_initialise(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    console.log("hello world");
    const FB_GAMECONFIG = {
        apiKey: "AIzaSyCHDtQ5nuCxgp_XCL_RtR7YVHv8mO1rhmc",
        authDomain: "comp-2025-max-bergman-4bb13.firebaseapp.com",
        databaseURL: "https://comp-2025-max-bergman-4bb13-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "comp-2025-max-bergman-4bb13",
        storageBucket: "comp-2025-max-bergman-4bb13.firebasestorage.app",
        messagingSenderId: "75891205088",
        appId: "1:75891205088:web:9ce6dd10fe8f59fb6f8185",
        measurementId: "G-860HVWZ49V"
    };

    const FB_GAMEAPP = initializeApp(FB_GAMECONFIG);
    fb_gameDB = getDatabase(FB_GAMEAPP);

    console.info(fb_gameDB);



    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();

    // The following makes Google ask the user to select the account

    PROVIDER.setCustomParameters({

        prompt: 'select_account'
    });
    signInWithPopup(AUTH, PROVIDER).then((result) => {
        console.log(result);
        console.log(result.user.uid);
        fb_uid = result.user.uid;
    })
    .catch((error) => {
        console.log(error);
    });
}

 function fb_writeto(){
    const dbReference = ref(fb_gameDB, ("Users/" + fb_uid));
    var _name = document.getElementById("name").value;
    var _favoriteFruit = document.getElementById("favoriteFruit").value;
    var _fruitQuantity = document.getElementById("fruitQuantity").value;
    var UserInformation = {name: _name, favoriteFruit: _favoriteFruit, _fruitQuantity: _fruitQuantity };
    set(dbReference, UserInformation).then(() => {

        console.log("written the following indformation to the database");
        console.log(UserInformation);
    }).catch((error) => {

        console.log("write error");
        console.log(error);
    });
}

function login_text(){
    if(fb_uid != null){
        alert("You must be logged in to view email.");
    }
    else{
        //calls read and waits for promise to return before changing email text
        fb_readall().then((fb_data) => {
            emailTemplate = `
                <div style="background: #fff0f5; border: 1px solid #ccc; padding: 1rem; border-radius: 8px;">
                    <p>Kia ora ${fb_data.Name},</p>
                    <p>Thank you for joining us at Sal’s Strawberry Saloon (and other fruit products)! We're thrilled to have you as a customer!</p>
                    <p>Based on your preferences, we’ll be sending you personalized recommendations for tasty and healthy treats made with the freshest fruit — especially those ${fb_data.FavoriteFruit} we heard you love!</p>
                    <p>At the moment, we want to offer you a deal to get fresh ${fb_data.FavoriteFruit} ${fb_data.FruitQuantity}x a week!!</p>
                    <p>Ngā mihi nui,</p>
                    <p><em>The Sal’s Strawberry Saloon Team</em></p>
                </div>`
            document.getElementById("emailOutput").innerHTML = emailTemplate;
        }).catch((error) => {
            console.log("error")
        });
    }
}


function fb_readall() {
    const dbReference = ref(fb_gameDB, "Users/UserID");

    get(dbReference).then((snapshot) => {

        var fb_data = snapshot.val();

        if (fb_data != null) {

            console.log("read all success")
            console.log(fb_data);
        } else {

            console.log("no record found")
            console.log(fb_data);
        }

    }).catch((error) => {

        console.log("read all error")
        console.log(error);
    });
}

    
    
    
    export {
 
  fb_authenticate,
  fb_writeto,
  login_text,
  fb_readall
};