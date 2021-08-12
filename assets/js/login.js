import { login, auth } from '../js/firebase.js';

auth.onAuthStateChanged((user) => {
    if (user) {
        location.replace('dashboard.html');
    } else {
        var btnLogin = document.querySelector('.btn.login');
        var forgot = document.querySelector('.fgt');
        var btnReset = document.querySelector('.btn.sent');

        btnLogin.addEventListener('click', () => {
            var email = document.querySelector('.user-email').value;
            var password = document.querySelector('.user-password').value;

            login(email, password);
        });

        forgot.addEventListener('click', () => {
            document.querySelector('.Form.login').style.display = 'none';
            document.querySelector('.Form.reset').style.display = 'flex';
        });

        btnReset.addEventListener('click', () => {
            var email = document.querySelector('.reset-email').value;

            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    alert("Check your mail");
                    location.reload();
                })
                .catch((error) => {
                    var errorCode = error.code;
                    alert(error.message);
                });
        });
    }
})