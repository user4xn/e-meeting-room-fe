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
  const userData = JSON.parse(localStorage.getItem('userData'));

  if(userData){
    if (userData.email_verified_at !== null) {
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

      axios.post(BACKEND_API + "api/v1/auth/resend/verification", {
        email: userData.email
      });
    }
  });
})
