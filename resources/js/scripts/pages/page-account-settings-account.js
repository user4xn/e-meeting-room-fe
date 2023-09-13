$(function () {
  ('use strict');

  // variables
  var form = $('.validate-form');

  function fetchSetting() {
    $.ajax(
      {
        url: `${BACKEND_API}api/v1/setting`,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        success: function (result) {
          var data = result.data;

          $('#officePhone').val(data.office_number);
          $('#officeAddress').val(data.address);
        },
        error: function (error) {
          console.log(error);
        }
      }
    );
  }

  fetchSetting();

  $('.button-cancel').on('click', function(){
    fetchSetting();
  });

  if (form.length) {
    form.each(function () {
      var $this = $(this);

      $this.validate({
        rules: {
          officePhone: {
            required: true
          },
          officeAddress: {
            required: true
          },
        }
      });

      $this.on('submit', function (e) {
        e.preventDefault();
        $.ajax(
          {
            url: `${BACKEND_API}api/v1/setting/store`,
            type: 'POST',
            data: {
              address: $('#officeAddress').val(),
              office_number: $('#officePhone').val()
            },
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
            },
            success: function (result) {
              toastr['success'](
                'Berhasil mengupdate pemgaturan',
                'Sukses!',
                {
                  closeButton: true,
                  tapToDismiss: false
                }
              );

              fetchSetting();
            },
            error: function (error) {
              console.log(error);
            }
          }
        );
      });
    });
  }

});
