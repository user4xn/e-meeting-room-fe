$(function () {
  'use strict';

  // Variables
  const jwtToken = localStorage.getItem('jwtToken');
  const isOtpEnabled = localStorage.getItem('isOtp');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const redirect = localStorage.getItem('nextRedirect');

  // Redirect based on conditions
  if (jwtToken) {
    if (userData.email_verified_at !== null) {
      if (isOtpEnabled === 'false') {
        if(!redirect) { 
          window.location.href = DASHBOARD_ROUTE;
        } else {
          window.location.href = redirect;
        }
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
            resendVerificationEmail(email);
            window.location.href = EMAIL_ROUTE;
          } else {
            if (isOtp) {
              resendOtp(email);
              window.location.href = OTP_ROUTE;
            } else {
              if(!redirect) { 
                window.location.href = DASHBOARD_ROUTE;
              } else {
                window.location.href = redirect;
              }
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
    
    // Function to resend verification email
    function resendVerificationEmail(email) {
      try {
        axios.post(BACKEND_API + "api/v1/auth/resend/verification", {
          email: email
        });
      } catch (error) {
        console.error("Error resending verification email:", error);
      }
    }
    
    // Function to resend OTP
    function resendOtp(email) {
      try {
        axios.post(BACKEND_API + "api/v1/auth/resend/otp", {
          email: email
        });
      } catch (error) {
        console.error("Error resending OTP:", error);
      }
    }
  }

  var primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-primary');

  $('#button-schedule').on('click', function () {
    // Fetch room data and update the Swal input options
    fetchRoom().then(function (roomData) {
      if (roomData) {
        // Create an object to store the room options
        var roomOptions = {};
  
        // Populate the room options object with room data
        roomData.forEach(function (room) {
          roomOptions[room.id] = room.room_name;
        });
  
        // Create a Swal dialog with updated select input options
        Swal.fire({
          title: 'Pilih Ruangan',
          input: 'select',
          inputOptions: roomOptions, // Update the input options here
          inputPlaceholder: 'Pilih Ruangan',
          showCancelButton: true,
          confirmButtonText: 'Buka',
          cancelButtonText: 'Batal',
          confirmButtonColor: primaryColor,
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value !== '') {
                resolve();
              } else {
                resolve('Mohon pilih ruangan');
              }
            });
          },
        }).then(function (result) {
          if (result.isConfirmed) {
            var roomId = result.value;
            window.location.href = SCHEDULE_ROUTE+`/${roomId}`;
          }
        });
      }
    }).catch(function (error) {
      console.error("Error fetching room data:", error);
    });
  });
  
  function fetchRoom() {
    try {
      return axios.get(BACKEND_API + "api/v1/guest/list/room")
        .then(function (response) {
          return response.data.data; // Return the room data
        })
        .catch(function (error) {
          console.error("Error fetching room data:", error);
          return null;
        });
    } catch (error) {
      console.error("Error resending OTP:", error);
      return null;
    }
  }
  
});
