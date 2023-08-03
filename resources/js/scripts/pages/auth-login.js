/*=========================================================================================
  File Name: auth-login.js
  Description: Auth login js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
  'use strict';

  var pageLoginForm = $('.auth-login-form');

  // jQuery Validation
  // --------------------------------------------------------------------
  if (pageLoginForm.length) {
    pageLoginForm.validate({
      rules: {
        'login-username': {
          required: true,
        },
        'login-password': {
          required: true
        }
      }
    });

    pageLoginForm.on('submit', function(e){
      e.preventDefault();

      if (pageLoginForm.valid()) {
        var username = $('#login-username').val();
        var password = $('#login-password').val();

        axios.post(login_url, {
          username: username,
          password: password
        })
        .then(function (response) {
          console.log(response.code);
          if (response.code != 200) {
            console.log('invalid auth');
            var errors = {};
            errors['login-username'] = 'Invalid credentials';
            validator.showErrors(errors);
            return;
          }

          var token = response.data.token;
          
          localStorage.setItem('jwtToken', token);

          console.log('Logged in successfully. Redirecting...');
          window.location.href = "{{ route('dashboard-analytics') }}";
        })
        .catch(function (error) {
          console.error('Login failed:', error);
        });
      }
    });
  }
});
