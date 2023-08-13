$(function () {
  'use strict';

  // Variables
  const jwtToken = localStorage.getItem('jwtToken');
  const isOtpEnabled = localStorage.getItem('isOtp');
  const userData = JSON.parse(localStorage.getItem('userData'));

  // Redirect based on conditions
  if (jwtToken) {
    if (userData.email_verified_at !== null) {
      if (isOtpEnabled === 'false') {
        window.location.href = DASHBOARD_ROUTE;
      }
    }
  }

  // Form and button references
  const pageLoginForm = $('.auth-login-form');
  const buttonLogin = $('.button-login-form');
  const buttonLoading = $('.button-login-loading-form');

  // jQuery Validation
  if (pageLoginForm.length) {
    const validator = pageLoginForm.validate({
      rules: {
        'login-username': { required: true },
        'login-password': { required: true }
      }
    });

    pageLoginForm.on('submit', async function (e) {
      e.preventDefault();
      buttonLogin.addClass('d-none');
      buttonLoading.removeClass('d-none');

      if (validator.valid()) {
        try {
          // Authentication request
          const response = await axios.post(BACKEND_API + "api/v1/auth/login", {
            username: $('#login-username').val(),
            password: $('#login-password').val()
          });

          // Handle successful login
          const responseData = response.data.data;
          const token = responseData.data_auth.access_token;
          const emailVerified = responseData.data_auth.data.email_verified_at;
          const isOtp = responseData.is_verification_otp;
          const email = responseData.data_auth.data.email;
          
          localStorage.setItem('isOtp', isOtp);
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('userData', JSON.stringify(responseData.data_auth.data));

          if (emailVerified === null) {
            await axios.post(BACKEND_API + "api/v1/auth/resend/verification", {
              email: email
            });
            window.location.href = EMAIL_ROUTE;
          } else {
            if (isOtp) {
              await axios.post(BACKEND_API + "api/v1/auth/resend/otp", {
                email: email
              });
              window.location.href = OTP_ROUTE;
            } else {
              window.location.href = DASHBOARD_ROUTE;
            }
          }
        } catch (error) {
          // Handle errors
          if (error.message === 'Request failed with status code 401') {
            var errors = {};
            errors['login-username'] = 'Invalid credentials';
            errors['login-password'] = '';
            validator.showErrors(errors);
          } else {
            console.log(error);
          }
        }

        buttonLoading.addClass('d-none');
        buttonLogin.removeClass('d-none');
      }
    });
  }
});
