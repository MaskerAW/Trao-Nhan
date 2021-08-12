import { validate_email, validate_password, validate_field}  from '../js/auth.js';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA-eLlsoZxQQZFmhoWql8dZ-UIW5tD-lvE",
    authDomain: "trao-nhan.firebaseapp.com",
    databaseURL: "https://trao-nhan-default-rtdb.firebaseio.com",
    projectId: "trao-nhan",
    storageBucket: "trao-nhan.appspot.com",
    messagingSenderId: "401951748327",
    appId: "1:401951748327:web:2a5aa84b890123e0f77242",
    measurementId: "G-C5Q128BY1S"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
export const auth = firebase.auth()
const database = firebase.database()

function save() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var username = document.getElementById('username').value
    var say_something = document.getElementById('say_something').value
    var favourite_food = document.getElementById('favourite_food').value

    database.ref('users/' + username).set({
        email: email,
        password: password,
        username: username,
        say_something: say_something,
        favourite_food: favourite_food
    })

    alert('Saved')
}

function get() {
    var username = document.getElementById('username').value

    var user_ref = database.ref('users/' + username)
    user_ref.on('value', function (snapshot) {
        var data = snapshot.val()

        alert(data.email)

    })

}

function update() {
    var username = document.getElementById('username').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    var updates = {
        email: email,
        password: password
    }

    database.ref('users/' + username).update(updates)

    alert('updated')
}

function remove() {
    var username = document.getElementById('username').value

    database.ref('users/' + username).remove()

    alert('deleted')
}


// Set up our register function
function register() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    favourite_song = document.getElementById('favourite_song').value
    milk_before_cereal = document.getElementById('milk_before_cereal').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }
    if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
        alert('One or More Extra Fields is Outta Line!!')
        return
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email: email,
                full_name: full_name,
                favourite_song: favourite_song,
                milk_before_cereal: milk_before_cereal,
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)

            // DOne
            alert('User Created!!')
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

// Set up our login function
function login(email, password) {

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)

            // DOne
            alert('User Logged In!!')

        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

export { login }