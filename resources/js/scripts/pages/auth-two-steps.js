/*=========================================================================================
	File Name: auth-two-steps.js
	Description: Two Steps verification.
	----------------------------------------------------------------------------------------
	Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: PIXINVENT
	Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
  'use strict';

  var isRtl = $('html').attr('data-textdirection') === 'rtl';
  const isOtpEnabled = localStorage.getItem('isOtp');
  const userData = JSON.parse(localStorage.getItem('userData'));

  if(userData){
    if (isOtpEnabled === 'false') {
      window.location.href = DASHBOARD_ROUTE;
    }
  } else {
    window.location.href = LOGIN_ROUTE;
  }

  // Mask the email
  const maskedEmail = maskEmail(userData.email);

  // Display the masked email
  $('#emailText').text(maskedEmail);

  // Function to mask email
  function maskEmail(email) {
    const parts = email.split('@');
    const username = parts[0];
    const domain = parts[1];
    
    const maskedUsername = username.substring(0, 3) + '*'.repeat(username.length - 3);
    
    return maskedUsername + '@' + domain;
  }

  const resendButton = $('.resend-button');

  const cooldownDuration = 30 * 1000; // 30 seconds in milliseconds
  let cooldownEndTime = parseInt(localStorage.getItem('cooldownEndTime')) || 0;

  function updateResendButtonState() {
    const currentTime = new Date().getTime();
    const remainingCooldown = Math.max(0, cooldownEndTime - currentTime);

    if (remainingCooldown > 0) {
      const secondsRemaining = Math.ceil(remainingCooldown / 1000);
      resendButton.prop('disabled', true);
      resendButton.text(`Resend (${secondsRemaining}s)`);
      setTimeout(updateResendButtonState, 1000);
    } else {
      resendButton.prop('disabled', false);
      resendButton.text('Resend');
    }
  }

  updateResendButtonState();

  resendButton.on('click', function() {
    if (!resendButton.prop('disabled')) {
      const currentTime = new Date().getTime();
      cooldownEndTime = currentTime + cooldownDuration;
      localStorage.setItem('cooldownEndTime', cooldownEndTime);

      updateResendButtonState();

      axios.post(BACKEND_API + "api/v1/auth/resend/otp", {
        email: userData.email
      });
    }
  });
  
  let completeOtp;

  const otpInput = $('.otp-input');
  const buttonVerify = $('.button-verify');
  const buttonLoading = $('.button-loading');

  otpInput.on('input', function() {    
    const otpValues = otpInput.map(function() {
      return $(this).val();
    }).get();

    completeOtp = otpValues.join('');
    if(completeOtp.length === 6) {
      buttonVerify.prop('disabled', false);
    } else {
      buttonVerify.prop('disabled', true);
    }
  });

  buttonVerify.on('click', async function(e){
    e.preventDefault();
    buttonVerify.addClass('d-none');
    buttonLoading.removeClass('d-none');
    
    try{
      const response = await axios.post(BACKEND_API + "api/v1/auth/verification/otp", {
        email: userData.email,
        otp: completeOtp
      });

      if (response.status === 200) {
        toastr['success'](
          'You are being redirected, please wait...',
          'Successfully Verify OTP',
          {
            closeButton: true,
            tapToDismiss: false,
            rtl: isRtl
          }
        );

        localStorage.setItem('isOtp', false);

        setTimeout(function () {
          window.location.href = DASHBOARD_ROUTE;
        }, 2000);
      }
      
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toastr['error'](
          'Please insert valid OTP code from your email!',
          'Invalid OTP!',
          {
            closeButton: true,
            tapToDismiss: false,
            rtl: isRtl
          }
        );

        otpInput.val('');
        otpInput[0].focus();
      }
      buttonLoading.addClass('d-none');
      buttonVerify.removeClass('d-none');
    }
  });
})


var inputContainer = document.querySelector('.auth-input-wrapper');

// Get focus on next element after max-length reach
inputContainer.onkeyup = function (e) {
  var target = e.srcElement;
  var maxLength = parseInt(target.attributes['maxlength'].value, 10);
  var currentLength = target.value.length;

  if (e.keyCode === 8) {
    if (currentLength === 0) {
      var next = target;
      while ((next = next.previousElementSibling)) {
        if (next == null) break;
        if (next.tagName.toLowerCase() == 'input') {
          next.focus();
          break;
        }
      }
    }
  } else {
    if (currentLength >= maxLength) {
      var next = target;

      while ((next = next.nextElementSibling)) {
        if (next == null) break;
        if (next.tagName.toLowerCase() == 'input') {
          next.focus();
          break;
        }
      }
    }
  }
};

//  Two Steps Verification
const numeralMask = document.querySelectorAll('.numeral-mask');

// Verification masking
if (numeralMask.length) {
  numeralMask.forEach(e => {
    new Cleave(e, {
      numeral: true
    });
  });
}
