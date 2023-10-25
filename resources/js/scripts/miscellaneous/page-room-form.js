(function (window, undefined) {
  'use strict';
  const canvas = document.querySelector('#signature-pad');
  const signaturePad = new SignaturePad(canvas);
  var guestForm = $('.guest-form');
  var addStoreBtn = $('.store-button');
  var eventTitle = $('.event-title');
  var spinnerContainer = $('.loading-container');
  var formContainer = $('.form-container');
  var rentData = JSON.parse(localStorage.getItem('currEvent'));

  if(rentData === null || rentData.room_id != ROOM_ID) {
    window.location.href = LOGIN_ROUTE;
  }

  eventTitle.html(rentData.event_name);
  setTimeout(function(){
    spinnerContainer.addClass('d-none');
    formContainer.removeClass('opacity-0');
  }, 1000);

  function resizeCanvas() {
    const container = $('#signature-container');
    const canvas = $('#signature-pad')[0]; // Get the actual DOM element
    const aspectRatio = 480 / 400; // Width / Height

    const containerWidth = container.width();
    const canvasWidth = containerWidth;
    const canvasHeight = canvasWidth / aspectRatio;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }

  $(window).on('resize', resizeCanvas);
  resizeCanvas();

  // Handle Clear Button Click
  $('#clear-signature').on('click', function (e) {
      e.preventDefault();
      signaturePad.clear();
  });

  if (guestForm.length) {
    guestForm.validate({
      rules: {
          'guest-name': { required: true },
          'guest-phone': { required: true },
          'guest-position': { required: true },
          'work-unit': { required: true },
      },
      messages: {
          'guest-name': { required: 'Nama wajib diisi' },
          'guest-phone': { required: 'No Handphone wajib diisi' },
          'guest-position': { required: 'Jabatan wajib diisi' },
          'work-unit': { required: 'Unit Kerja wajib diisi' },
      },
      submitHandler: function (form, event) {
          event.preventDefault();
      }
    });
  }

  $(addStoreBtn).on('click', function () {
    if (guestForm.valid() && !signaturePad.isEmpty()) {
      $('#signature-pad').removeClass('border-danger');
      $('.error-signature').addClass('d-none');
      $(this).attr('disabled', true);
      $(this).html('Loading..');

      const signatureData = signaturePad.toDataURL();

      var formData = {
        rent_id: rentData.event_id,
        guest_name: $('#guest-name').val(),
        guest_phone: $('#guest-phone').val(),
        guest_position: $('#guest-position').val(),
        guest_uuid: localStorage.getItem('uuid'),
        work_unit: $('#work-unit').val(),
        signature: signatureData,
      }

      $.ajax({
        type: 'POST',
        url: `${G_BACKEND_API}api/v1/guest/store`,
        data: formData,
        success: function (response) {
          $(addStoreBtn).attr('disabled', false);
          $(addStoreBtn).html('Kirim');

          formContainer.addClass('d-none');

          $('.crossmark-container').addClass('d-none');
          $('.checkmark-container').removeClass('d-none');
          $('.spinner-border').addClass('d-none');
          spinnerContainer.removeClass('d-none');
          formContainer.addClass('opacity-0')

          setTimeout(() => {
            resetValue();
            setTimeout(function(){
              spinnerContainer.addClass("d-none");
              formContainer.removeClass('opacity-0')
              formContainer.removeClass('d-none');
            }, 1000);
          }, 3000);
        },
        error: function (error) {
          $(addStoreBtn).attr('disabled', false);
          $(addStoreBtn).html('Kirim');
          
          formContainer.addClass('d-none');
          
          console.error('Error:', error.statusText);

          if(error.status != 400) {
            $('.text-crossmark').html('sistem error <br>'+ error.responseJSON.meta.message);
          }
          
          $('.checkmark-container').addClass('d-none');
          $('.crossmark-container').removeClass('d-none');
          $('.spinner-border').addClass('d-none');
          spinnerContainer.removeClass('d-none');
          formContainer.addClass('opacity-0')

          setTimeout(() => {
            resetValue();
            setTimeout(function(){
              spinnerContainer.addClass("d-none");
              formContainer.removeClass('opacity-0')
              formContainer.removeClass('d-none');
              $('.text-crossmark').html('anda sudah <br> absen');
            }, 1000);
          }, 3000);
        }
    });
      
    } else {
      if (signaturePad.isEmpty()) {
        $('#signature-pad').addClass('border-danger');
        $('.error-signature').removeClass('d-none');
      } else {
        $('#signature-pad').removeClass('border-danger');
        $('.error-signature').addClass('d-none');
      }
    }
  });

  function resetValue(){
    signaturePad.clear();
    $('#guest-name').val('');
    $('#guest-phone').val('');
    $('#guest-position').val('');
    $('#work-unit').val('');
  }

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }

  var storedUUID = localStorage.getItem('uuid');
  var storedExpiration = localStorage.getItem('uuid_expiration');

  if (!storedUUID || (storedExpiration && new Date(storedExpiration) < new Date())) {
    var newUUID = generateUUID();
    
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    
    localStorage.setItem('uuid', newUUID);
    localStorage.setItem('uuid_expiration', expirationDate.toISOString());
  }
})(window);