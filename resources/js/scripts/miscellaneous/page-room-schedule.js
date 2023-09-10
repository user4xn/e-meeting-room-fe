(function (window, undefined) {
  'use strict';
  var item,
  spinner = $('.loading-overlay'),
  roomQr = $('#room-qrcode'),
  timelineArea = $('.timeline'),
  timeNow = $('#time-now'),
  roomDesc = $('#room-desc'),
  roomDatetime = $('#room-datetime'),
  roomParticipant = $('#room-participant-max'),
  eventTitleCurrent = $('#event-title-current'),
  eventDescCurrent = $('#event-desc-current'),
  eventStartCurrent = $('#event-start-current'),
  eventEndCurrent = $('#event-end-current'),
  eventSubCurrent = $('#event-sub-current'),
  eventCurrent = $('#event-current'),
  eventCurrentContainer = $('#event-current-container'),
  eventCurrentNone = $('#event-current-none'),
  roomName = $('#room-name'),
  end;

  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const currentTime = `${hours}:${minutes}`;
    
    // Update the DOM element with the current time
    timeNow.html(currentTime);
  }

  updateClock();
  setInterval(updateClock, 1000);

  function fetchStatus() {
    $.ajax(
      {
        url: `${G_BACKEND_API}api/v1/room/schedule/${ROOM_ID}`,
        type: 'GET',
        success: function (result) {
          var data = result.data;

          $('#state-invalid').addClass('d-none');
          
          roomName.html(data.room_name);
          roomDesc.html(data.room_desc);
          roomDatetime.html(data.date_now);
          roomParticipant.html((data.current_event !== null ? data.current_event.guest_count : '0' )+'/'+data.room_capacity+' Peserta');
          eventTitleCurrent.html((data.current_event !== null ? data.current_event.event_name : '-'));
          eventDescCurrent.html((data.current_event !== null ? data.current_event.event_desc : '-'));
          roomQr.attr('src', data.qrcode);
          
          if(data.current_event === null) {
            eventCurrentContainer.removeClass('bg-primary')
            eventCurrentContainer.addClass('bg-secondary')
            eventCurrent.addClass('d-none');
            eventCurrentNone.removeClass('d-none');
          } else {
            if(data.current_event.date_start !== data.current_event.date_end) {
              eventStartCurrent.html(data.current_event.date_start ? indoMonth(data.current_event.date_start) : 'undefined');
              eventEndCurrent.html(data.current_event.date_end ? indoMonth(data.current_event.date_end) : 'undefined');
              eventSubCurrent.removeClass('d-none');
              if(data.current_event.time_start !== data.current_event.time_end) {
                eventSubCurrent.html(data.current_event.time_start.substr(0,5) +' - '+ data.current_event.time_end.substr(0,5));
              } else {
                eventSubCurrent.addClass('d-none');
              }
            } else {
              eventStartCurrent.html(data.current_event.time_start ? data.current_event.time_start.substr(0,5) : '00:00');
              eventEndCurrent.html(data.current_event.time_end ? data.current_event.time_end.substr(0,5) : '00:00');
              eventSubCurrent.addClass('d-none');
            }
            
            eventCurrentContainer.removeClass('bg-secondary')
            eventCurrentContainer.addClass('bg-primary')
            eventCurrent.removeClass('d-none');
            eventCurrentNone.addClass('d-none');
          }

          if(data.next_events.length > 0){
            appendTimeline(data.next_events);
          } else {
            var nodata = `
              <div class='text-center fw-bold'>
                Belum ada jadwal
              </div>
            `
            timelineArea.addClass('ms-0')
            timelineArea.html(nodata);
          }

          $(".loading-overlay").addClass("fade-out");
          setTimeout(function(){
            $('.loading-overlay').hide();
          }, 1000);
        },
        error: function (error) {
          $('#state-invalid').removeClass('d-none');
          console.log(error);
        }
      }
    );
  }

  fetchStatus();

  setInterval(() => {
    fetchStatus();
  }, 30000);

  function appendTimeline(array) {
    timelineArea.empty();
    var eventName = array[0].event_name;
    var today = moment().format('YYYY-MM-DD');

    array.forEach(item => {
        var timeReform = item.date_start !== today ? indoDate(item.date_start) : timeAgo(item.time_start);
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

  function indoDate(dateString) {
    var monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    
    // Define an array of day names in Bahasa Indonesia
    var dayNames = [
      "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
    ];

    // Parse the date string
    var parts = dateString.split("-");
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    var day = parseInt(parts[2]);
    
    // Create a JavaScript Date object
    var date = new Date(year, month - 1, day); // Note: month is 0-based
    
    // Format the date
    var formattedDate = dayNames[date.getDay()] + ", " + day + " " + monthNames[month - 1] + " " + year;
    return formattedDate;
  }

  function indoMonth(dateString) {
    var monthMinName = [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
      "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ];

    // Parse the date string
    var parts = dateString.split("-");
    var month = parseInt(parts[1]);
    var day = parseInt(parts[2]);
    
    // Format the date
    var formattedDate = day + " " + monthMinName[month - 1];
    return formattedDate;
  }
})(window);