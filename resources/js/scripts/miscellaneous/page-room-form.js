(function (window, undefined) {
  'use strict';
  const canvas = document.querySelector('#signature-pad');
  const signaturePad = new SignaturePad(canvas);
  var guestForm = $('.guest-form');
  var addStoreBtn = $('.store-button');
  var eventTitle = $('.event-title');
  var spinner = $('.loading-overlay');
  var rentData = JSON.parse(localStorage.getItem('currEvent'));

  if(rentData === null || rentData.room_id != ROOM_ID) {
    window.location.href = LOGIN_ROUTE;
  }

  eventTitle.html(rentData.event_name);
  spinner.addClass("fade-out");
  setTimeout(function(){
    spinner.hide();
  }, 1000);

  function resizeCanvas() {
    const container = $('#signature-container');
    const canvas = $('#signature-pad')[0]; // Get the actual DOM element
    const aspectRatio = 480 / 200; // Width / Height

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

          $('.checkmark').removeClass('d-none');
          $('.spinner-border').addClass('d-none');
          spinner.removeClass("fade-out");
          spinner.show();

          setTimeout(() => {
            resetValue();
            spinner.addClass("fade-out");
            setTimeout(function(){
              spinner.hide();
            }, 1000);
          }, 3000);
        },
        error: function (error) {
          $(addStoreBtn).attr('disabled', false);
          $(addStoreBtn).html('Kirim');
          console.error('Error:', error);
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

  // Handle Form Submission
  $('#your-form-id').on('submit', function (e) {
      e.preventDefault();
      // Convert the signature to a data URL
      const signatureData = signaturePad.toDataURL();
      // Set the data URL as the value of the hidden input field
      $('#signature').val(signatureData);
      // Submit the form or handle the data as needed
      $(this).submit();
  });

  function resetValue(){
    signaturePad.clear();
    $('#guest-name').val('');
    $('#guest-phone').val('');
    $('#guest-position').val('');
    $('#work-unit').val('');
  }
})(window);