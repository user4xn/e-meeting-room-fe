(function (window, undefined) {
  'use strict';
  
  const jwtToken = localStorage.getItem('jwtToken');
  const nextCheckToken = localStorage.getItem('nextCheckToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  // CLEARING
  localStorage.removeItem('nextRedirect');
  
  if (!jwtToken) {
    window.location.href = LOGIN_ROUTE;
  }
  
  $('#auth-user-name').html(userData.username);
  $('#auth-user-role').html(userData.role);

  async function hitEndpoint() {
    try {
      const response = await axios.get(`${BACKEND_API}api/v1/auth/get-profile`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

    } catch (error) {
      if(error.response.status === 401) { 
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('nextCheckToken');
        localStorage.removeItem('isOtp');
        window.location.href = LOGIN_ROUTE;
      } else {
        console.error('Error fetching profile data:', error);
      }
    }
  }

  function updateNextTokenCheck() {
    const currentTimestamp = new Date().getTime();
    const nextCheckTimestamp = currentTimestamp + 60 * 60 * 1000; // Add an hour in milliseconds
    localStorage.setItem('nextCheckToken', new Date(nextCheckTimestamp).toISOString());
  }

  if (!nextCheckToken) {
    hitEndpoint();
    updateNextTokenCheck();
  } else {
    const nextCheckTimestamp = new Date(nextCheckToken).getTime();
    const currentTimestamp = new Date().getTime();
    
    if (nextCheckTimestamp < currentTimestamp) {
      hitEndpoint();
      updateNextTokenCheck();
    }
  }

  $('.button-logout').on('click', function(){
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('nextCheckToken');
    localStorage.removeItem('isOtp');
    window.location.href = LOGIN_ROUTE;
  });
})(window);
