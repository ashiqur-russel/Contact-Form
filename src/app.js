
//import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKnkyop6k_YqhZwpMR1OMkH7Tb09Ar_Vs",
  authDomain: "test-form-38681.firebaseapp.com",
  projectId: "test-form-38681",
  storageBucket: "test-form-38681.appspot.com",
  messagingSenderId: "742862748986",
  appId: "1:742862748986:web:d7e2c827bfcb5e1d91e403"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const auth=getAuth(firebaseApp);


// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let message = document.querySelector(".message").value;
  
  //console.log(name, email, message);

  saveContactInfo(name, email, message);

  //Reset Contact Form
  document.querySelector(".contact-form").reset();
}

// Save infos to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    message: message,
  });

  retrieveInfos();
}

//Retrieve Infos from database
function retrieveInfos(){
  let ref = firebase.database().ref("infos");
  ref.once('value',gotData);
}


function gotData(data){
  let info= data.val();
  let keys = Object.keys(info);

  for(let i=0; i<keys.length;i++){
      let infoData=keys[i];
      let name=info[infoData].name;
      let email = info[infoData].email;
      let message = info[infoData].message;

      console.log(name,email,message);

      let infosResult = document.querySelector(".InfosResult");

      infosResult.innerHTML+= `<div>
      <p><strong>Name:<strong/>${name}<br/>
          <a><strong>Email:<strong/>${email}</a><br/>
          <a><strong>Message:<strong/>${message}</a></p>
      </div>`;
    }
  }
