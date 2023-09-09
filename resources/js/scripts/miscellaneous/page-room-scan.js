(function (window, undefined) {
  'use strict';
  var item,
  spinner = $('.loading-overlay'),
  buttonBooking = $('.booking-button'),
  buttonForm = $('.form-button'),
  timelineArea = $('.timeline'),
  roomName = $('#room-name'),
  roomDesc = $('#room-desc'),
  roomDatetime = $('#room-datetime'),
  roomParticipant = $('#room-participant-max'),
  eventTitleCurrent = $('#event-title-current'),
  roomName = $('#room-name'),
  currEvent;

  function fetchStatus() {
    $.ajax(
      {
        url: `${G_BACKEND_API}api/v1/room/check-meeting/${ROOM_ID}`,
        type: 'GET',
        success: function (result) {
          var data = result.data;
          currEvent = data.current_event;
          roomName.html(data.room_name);
          roomDesc.html(data.room_desc);
          roomDatetime.html('Agenda : '+data.date_now);
          roomParticipant.html((data.current_event !== null ? data.current_event.guest_count : '0' )+'/'+data.room_capacity+' Peserta');
          eventTitleCurrent.html((data.current_event !== null ? data.current_event.event_name : '<span class="text-muted"> belum ada agenda </span>'));
          
          if(data.current_event !== null) {
            if(data.room_capacity === data.current_event.guest_count) {
              buttonForm.html('Penuh!');
              buttonForm.attr('disabled', true);
            } else {
              buttonForm.attr('disabled', false);
            }
          } else {
            buttonForm.attr('disabled', true);
          }

          if(data.next_events.length > 0){
            appendTimeline(data.next_events);
          } else {
            var nodata = `
              <div class="text-center fw-bold pb-2">
                Belum ada jadwal
              </div>
            `
            timelineArea.addClass('ms-0')
            timelineArea.html(nodata);
          }

          spinner.addClass("fade-out");
          setTimeout(function(){
            spinner.hide();
          }, 1000);
          },
        error: function (error) {
          console.log(error);
        }
      }
    );
  }

  fetchStatus();

  function appendTimeline(array) {
    timelineArea.empty();
    var eventName = array[0].event_name;
    array.forEach(item => {
        var timeReform = timeAgo(item.time_start);
        var template = `
          <li class="timeline-item">
              <span class="timeline-point timeline-point-indicator ${item.event_name !== eventName ? 'timeline-point-secondary' : null  }"></span>
              <div class="timeline-event">
                  <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
                      <h6>${item.event_name}</h6>
                      <span class="timeline-event-time"><span class="text-primary ${item.is_status === true ? null : 'd-none'}">Sedang Berjalan</span> ${item.is_status === true ? '-' : ''} ${timeReform}</span>
                  </div>
                  <p class="text-start pt-1">
                    ${item.event_desc}
                  </p>
                  <div class="text-start">
                    <span class="badge ${item.organization === 'Internal' ? 'bg-light-success' : 'bg-light-danger'} rounded-pill bg-glow">${item.organization === 'Internal' ? 'Internal KKP' : 'Eksternal'}</span>
                    ${item.time_start !== item.time_end ? '<span class="badge bg-light-warning rounded-pill bg-glow">'+item.time_start.substr(0,5)+' - '+item.time_end.substr(0,5)+'</span>' : ''}
                  </div>
              </div>
          </li>
        `;

        timelineArea.append(template);
    });
  }

  function timeAgo(timeString) {
    const currentTime = new Date();
    const givenTimeParts = timeString.split(":");
    const givenTime = new Date();
    givenTime.setHours(givenTimeParts[0]);
    givenTime.setMinutes(givenTimeParts[1]);
    givenTime.setSeconds(givenTimeParts[2]);

    if (currentTime < givenTime) {
      const hours = givenTime.getHours().toString().padStart(2, '0');
      const minutes = givenTime.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    const timeDifferenceInSeconds = Math.floor((currentTime - givenTime) / 1000);

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} seconds ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutesAgo} menit yang lalu`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hoursAgo} jam yang lalu`;
    } else {
      const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
      return `${daysAgo} hari  yang lalu`;
    }
  }

  buttonBooking.on('click', function(){
    if(localStorage.getItem('jwtToken')) {
      window.location.href = RENT_ROUTE;
    } else {
      localStorage.setItem('nextRedirect', RENT_ROUTE);
      window.location.href = LOGIN_ROUTE;
    }
  });

  buttonForm.on('click', function(){
    console.log(JSON.stringify(currEvent));
    localStorage.setItem('currEvent', JSON.stringify(currEvent));
    window.location.href = FORM_ROUTE;
  });
})(window);