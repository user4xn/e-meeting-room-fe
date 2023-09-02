/**
 * App Calendar
 */

/**
 * ! If both start and end dates are same Full calendar will nullify the end date value.
 * ! Full calendar will end the event on a day before at 12:00:00AM thus, event won't extend to the end date.
 * ! We are getting events from a separate file named app-calendar-events.js. You can add or remove events from there.
 **/

'use-strict';


var direction = 'ltr',
  assetPath = '../../../app-assets/';
if ($('html').data('textdirection') == 'rtl') {
  direction = 'rtl';
}

if ($('body').attr('data-framework') === 'laravel') {
  assetPath = $('body').attr('data-asset-path');
}

$(document).on('click', '.fc-sidebarToggle-button', function (e) {
  $('.app-calendar-sidebar, .body-content-overlay').addClass('show');
});

$(document).on('click', '.body-content-overlay', function (e) {
  $('.app-calendar-sidebar, .body-content-overlay').removeClass('show');
});

document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar'),
  eventToUpdate,
  sidebar = $('.event-sidebar'),
  calendarsColor = {
    Internal: 'warning',
    Eksternal: 'success',
    Unapproved: 'secondary',
  },
  eventForm = $('.event-form'),
  addEventBtn = $('.add-event-btn'),
  cancelBtn = $('.btn-cancel'),
  updateEventBtn = $('.update-event-btn'),
  toggleSidebarBtn = $('.btn-toggle-sidebar'),
  eventSidebarTitle = $('.event-sidebar-title'),
  eventTitle = $('#title'),
  eventLabel = $('#select-label'),
  eventRoom = $('#select-room'),
  eventResponsible = $('#select-responsible-user'),
  startDate = $('#start-date'),
  endDate = $('#end-date'),
  eventUrl = $('#event-url'),
  eventGuests = $('#event-guests'),
  eventLocation = $('#event-location'),
  allDaySwitch = $('.allDay-switch'),
  selectAll = $('.select-all'),
  calEventFilter = $('.calendar-events-filter'),
  filterInput = $('.input-filter'),
  btnDeleteEvent = $('.btn-delete-event'),
  eventDescription = $('#event-description-editor'),
  start,end;

  $('.add-event button').on('click', function (e) {
    $('.event-sidebar').addClass('show');
    $('.sidebar-left').removeClass('show');
    $('.app-calendar .body-content-overlay').addClass('show');
  });

  if (eventLabel.length) {
    function renderBullets(option) {
      if (!option.id) {
        return option.text;
      }
      var $bullet =
        "<span class='bullet bullet-" +
        $(option.element).data('label') +
        " bullet-sm me-50'> " +
        '</span>' +
        option.text;

      return $bullet;
    }
    eventLabel.wrap('<div class="position-relative"></div>').select2({
      placeholder: 'Select Organization',
      dropdownParent: eventLabel.parent(),
      templateResult: renderBullets,
      templateSelection: renderBullets,
      minimumResultsForSearch: -1,
      escapeMarkup: function (es) {
        return es;
      }
    });
  }

  if (eventRoom.length) {
    eventRoom.select2({
      placeholder: 'Select Room',
      dropdownParent: eventRoom.parent(),
      minimumResultsForSearch: -1,
      escapeMarkup: function (es) {
        return es;
      }
    });
  }

  if (eventResponsible.length) {
    eventResponsible.select2({
      placeholder: 'Select User',
      dropdownParent: eventResponsible.parent(),
      minimumResultsForSearch: -1,
      escapeMarkup: function (es) {
        return es;
      }
    });
  }
 
  if (startDate.length) {
    start = startDate.flatpickr({
      enableTime: true,
      altFormat: 'Y-m-dTH:H:i:S', // Use 'H' for 24-hour format
      time_24hr: true,
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      },
      onChange: function(selectedDates, dateStr, instance) {
        // When the startDate changes, update the minDate of the endDate picker
        if (endDate.length) {
          end.set('minDate', selectedDates[0]);
        }
      }
    });
  }
  
  if (endDate.length) {
    end = endDate.flatpickr({
      enableTime: true,
      altFormat: 'Y-m-dTH:H:i:S', // Use 'H' for 24-hour format
      time_24hr: true,
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  function fetchRoom() {
    $.ajax(
      {
        url: `${BACKEND_API}api/v1/room`,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        success: function (result) {
          eventRoom.empty(); 
          var optionFirst = document.createElement("option");
          optionFirst.value = ''; 
          optionFirst.textContent = 'Select Room';
          eventRoom.append(optionFirst);
          result.data.data.forEach(function(item) { 
            var option = document.createElement("option");
            option.value = item.id; 
            option.textContent = item.room_name;
            eventRoom.append(option);
          });
        },
        error: function (error) {
          console.log(error);
        }
      }
    );
  }
  fetchRoom();

  function fetchUser() {
    $.ajax(
      {
        url: `${BACKEND_API}api/v1/rent/list-person-responsible`,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        success: function (result) {
          eventResponsible.empty(); 
          var optionFirst = document.createElement("option");
          optionFirst.value = ''; 
          optionFirst.textContent = 'Select User';
          eventResponsible.append(optionFirst);
          result.data.forEach(function(item) {
            var option = document.createElement("option");
            option.value = item.id; 
            option.textContent = item.name.replace(/\b[a-z]/g, function(letter) {
              return letter.toUpperCase();
            });
            eventResponsible.append(option);
          });
        },
        error: function (error) {
          console.log(error);
        }
      }
    );
  }
  fetchUser();

  function eventClick(info) {
    eventToUpdate = info.event;
    eventId = eventToUpdate.id;
    
    $.ajax(
      {
        url: `${BACKEND_API}api/v1/rent/detail/${eventId}`,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        success: function (result) {
          eventFetch = result.data;
          eventFetch.event_desc !== undefined ? eventDescription.val(eventFetch.event_desc) : null;
          sidebar.find(eventRoom).val(eventFetch.room.id).trigger('change');
          sidebar.find(eventLabel).val(eventFetch.organization).trigger('change');
          sidebar.find(eventResponsible).val(eventFetch.user_id).trigger('change');
          $('#badge-area').removeClass('d-none');
          if(eventFetch.status === 'approved'){
            $('.badge-unapprove').addClass('d-none');
            $('.badge-approve').removeClass('d-none');

            endDate.prop('disabled', true);
            startDate.prop('disabled', true);
            eventTitle.prop('disabled', true);
            allDaySwitch.prop('disabled', true);
            eventDescription.prop('disabled', true);
            eventRoom.prop('disabled', true);
            eventLabel.prop('disabled', true);
            eventResponsible.prop('disabled', true);
            
          } else {
            $('.badge-unapprove').removeClass('d-none');
            $('.badge-approve').addClass('d-none');

            updateEventBtn.removeClass('d-none');
            btnDeleteEvent.removeClass('d-none');
          }
        },
        error: function (error) {
          console.log(error);
        }
      }
    );

    if (eventToUpdate.url) {
      info.jsEvent.preventDefault();
      window.open(eventToUpdate.url, '_blank');
    }

    sidebar.modal('show');
    addEventBtn.addClass('d-none');
    cancelBtn.addClass('d-none');
    updateEventBtn.addClass('d-none');
    btnDeleteEvent.addClass('d-none');

    eventTitle.val(eventToUpdate.title);
    start.setDate(eventToUpdate.start, true, 'Y-m-d');
    eventToUpdate.allDay === true ? allDaySwitch.prop('checked', true) : allDaySwitch.prop('checked', false);
    eventToUpdate.end !== null
    ? end.setDate(eventToUpdate.end, true, 'Y-m-d')
    : end.setDate(eventToUpdate.start, true, 'Y-m-d');
    
    eventSidebarTitle.html('Detail Rental');

    btnDeleteEvent.on('click', function () {
      eventToUpdate.remove();
      
      sidebar.modal('hide');
      $('.event-sidebar').removeClass('show');
      $('.app-calendar .body-content-overlay').removeClass('show');
    });
  }

  function modifyToggler() {
    $('.fc-sidebarToggle-button')
      .empty()
      .append(feather.icons['menu'].toSvg({ class: 'ficon' }));
  }

  function selectedCalendars() {
    var selected = [];
    $('.calendar-events-filter input:checked').each(function () {
      selected.push($(this).attr('data-value'));
    });
    return selected;
  } 
  
  function fetchEvents(info, successCallback) {
    $.ajax(
      {
        url: `${BACKEND_API}api/v1/rent/calendar`,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        success: function (result) {
          
          var calendars = selectedCalendars();
          selectedEvents = result.data.events.filter(function (event) {
            return calendars.includes(event.extendedProps.calendar.toLowerCase());
          });
          
          successCallback(selectedEvents);
        },
        error: function (error) {
          console.log(error);
        }
      }
    );
  }

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: fetchEvents,
    editable: false,
    dragScroll: true,
    dayMaxEvents: 2,
    customButtons: {
      sidebarToggle: {
        text: 'Sidebar'
      }
    },
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    direction: direction,
    initialDate: new Date(),
    navLinks: true, 
    eventClassNames: function ({ event: calendarEvent }) {
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar];

      return [
        
        'bg-light-' + colorName
      ];
    },
    dateClick: function (info) {
      var date = moment(info.date).format('YYYY-MM-DD');
      resetValues();
      sidebar.modal('show');
      addEventBtn.removeClass('d-none');
      updateEventBtn.addClass('d-none');
      btnDeleteEvent.addClass('d-none');
      startDate.val(date);
      endDate.val(date);
    },
    eventClick: function (info) {
      eventClick(info);
    },
    datesSet: function () {
      modifyToggler();
    },
    viewDidMount: function () {
      modifyToggler();
    }
  });
  calendar.render();

  function refreshCalendarEvents() {
    fetchEvents().then(function (newEvents) {
      calendar.refetchEvents();
    }).catch(function (error) {
      console.error("Error fetching events:", error);
    });
  }
  
  modifyToggler();
  
  if (eventForm.length) {
    eventForm.validate({
      submitHandler: function (form, event) {
        event.preventDefault();
        if (eventForm.valid()) {
          sidebar.modal('hide');
        }
      },
      title: {
        required: true
      },
      rules: {
        'start-date': { required: true },
        'end-date': { required: true },
        'select-room': { required: true },
        'select-responsible-user': { required: true }
      },
      messages: {
        'select-responsible-user': { required: 'User is required' },
        'select-room': { required: 'Room is required' },
        'start-date': { required: 'Start Date is required' },
        'end-date': { required: 'End Date is required' }
      }
    });
  }

  if (toggleSidebarBtn.length) {
    toggleSidebarBtn.on('click', function () {
      cancelBtn.removeClass('d-none');
    });
  }

  function addEvent(eventData) {
    calendar.addEvent(eventData);
    calendar.refetchEvents();
  }

  function updateEvent(eventData) {
    var propsToUpdate = ['id', 'title', 'url'];
    var extendedPropsToUpdate = ['calendar', 'guests', 'location', 'description'];

    updateEventInCalendar(eventData, propsToUpdate, extendedPropsToUpdate);
  }

  function removeEvent(eventId) {
    removeEventInCalendar(eventId);
  }
  
  const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {
    const existingEvent = calendar.getEventById(updatedEventData.id);

    for (var index = 0; index < propsToUpdate.length; index++) {
      var propName = propsToUpdate[index];
      existingEvent.setProp(propName, updatedEventData[propName]);
    }

    existingEvent.setDates(updatedEventData.start, updatedEventData.end, { allDay: updatedEventData.allDay });

    for (var index = 0; index < extendedPropsToUpdate.length; index++) {
      var propName = extendedPropsToUpdate[index];
      existingEvent.setExtendedProp(propName, updatedEventData.extendedProps[propName]);
    }
  };

  function removeEventInCalendar(eventId) {
    calendar.getEventById(eventId).remove();
  }

  $(addEventBtn).on('click', function () {
    if (eventForm.valid()) {
      var newEvent = {
        id: calendar.getEvents().length + 1,
        title: eventTitle.val(),
        start: startDate.val(),
        end: endDate.val(),
        startStr: startDate.val(),
        endStr: endDate.val(),
        display: 'block',
        extendedProps: {
          location: eventLocation.val(),
          guests: eventGuests.val(),
          calendar: eventLabel.val(),
          description: eventDescription.val()
        }
      };
      if (allDaySwitch.prop('checked')) {
        newEvent.allDay = true;
      }

      var formData = {
        datetime_start: startDate.val(),
        datetime_end: endDate.val(),
        event_name: eventTitle.val(),
        is_all_day: allDaySwitch.val(),
        event_desc: eventDescription.val(),
        room_id: eventRoom.val(),
        organization: eventLabel.val(),
        user_id: eventResponsible.val(),
        guest_count: 0,
      }

      console.log(formData);

      $.ajax(
        {
          url: `${BACKEND_API}api/v1/rent/store`,
          type: 'POST',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
          },
          data: formData,
          success: function (result) {
            console.log(result);
            refreshCalendarEvents();
          },
          error: function (error) {
            console.log(error);
          }
        }
      );
      // addEvent(newEvent);
    }
  });

  updateEventBtn.on('click', function () {
    if (eventForm.valid()) {
      var eventData = {
        id: eventToUpdate.id,
        title: sidebar.find(eventTitle).val(),
        start: sidebar.find(startDate).val(),
        end: sidebar.find(endDate).val(),
        extendedProps: {
          calendar: eventLabel.val(),
          description: eventDescription.val()
        },
        display: 'block',
        allDay: allDaySwitch.prop('checked') ? true : false
      };
      
      updateEvent(eventData);
      sidebar.modal('hide');
    }
  });

  function resetValues() {
    endDate.val('');
    startDate.val('');
    eventTitle.val('');
    allDaySwitch.prop('checked', false);
    eventDescription.val('');
    eventRoom.val('').trigger('change');
    
    eventSidebarTitle.html('Add Rental');

    endDate.prop('disabled', false);
    startDate.prop('disabled', false);
    eventTitle.prop('disabled', false);
    allDaySwitch.prop('disabled', false);
    eventDescription.prop('disabled', false);
    eventRoom.prop('disabled', false);
    eventLabel.prop('disabled', false);
    eventResponsible.prop('disabled', false);
  }

  sidebar.on('hidden.bs.modal', function () {
    resetValues();
    $('#badge-area').addClass('d-none');
  });

  $('.btn-toggle-sidebar').on('click', function () {
    btnDeleteEvent.addClass('d-none');
    updateEventBtn.addClass('d-none');
    addEventBtn.removeClass('d-none');
    $('.app-calendar-sidebar, .body-content-overlay').removeClass('show');
  });
  
  if (selectAll.length) {
    selectAll.on('change', function () {
      var $this = $(this);

      if ($this.prop('checked')) {
        calEventFilter.find('input').prop('checked', true);
      } else {
        calEventFilter.find('input').prop('checked', false);
      }
      calendar.refetchEvents();
    });
  }

  if (filterInput.length) {
    filterInput.on('change', function () {
      $('.input-filter:checked').length < calEventFilter.find('input').length
        ? selectAll.prop('checked', false)
        : selectAll.prop('checked', true);
      calendar.refetchEvents();
    });
  }
});
