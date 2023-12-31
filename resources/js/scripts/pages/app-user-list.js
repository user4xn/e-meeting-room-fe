$(function (window) {
  ('use strict');
  
  var dtTable = $('.user-list-table'), 
    saveButton = $('.data-save'), 
    submitButton = $('.data-submit'),
    eventForm = $("#jquery-val-form");

  function fetchAndPopulateMenuOptions() {
    // Make an AJAX request to fetch menu data from the API
    $.ajax({
        url: `${BACKEND_API}api/v1/menu/list`,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        method: "GET",
        success: function (response) {
            if (response.meta.status === "success") {
                // Clear any existing menu options
                $('.add-menu-checkboxes').empty();

                // Iterate through the menu data and create checkboxes
                $.each(response.data, function (index, menuItem) {
                    var menuId = menuItem.id;
                    var menuName = menuItem.menu_name;

                    // Create a checkbox for each menu item
                    var $checkbox = $('<div class="form-check mb-1">').append(
                        $('<input>').attr({
                            type: 'checkbox',
                            id: 'add-user-menu-' + menuId,
                            class: 'form-check-input',
                            name: 'add-user-menu[]',
                            value: menuId,
                        }),
                        $('<label>').attr('for', 'add-user-menu-' + menuId).addClass('form-check-label').text(menuName)
                    );

                    // Append the checkbox to the menu-checkboxes container
                    $('.add-menu-checkboxes').append($checkbox);
                });

                $('.menu-checkboxes').empty();

                // Iterate through the menu data and create checkboxes
                $.each(response.data, function (index, menuItem) {
                    var menuId = menuItem.id;
                    var menuName = menuItem.menu_name;

                    // Create a checkbox for each menu item
                    var $checkbox = $('<div class="form-check mb-1">').append(
                        $('<input>').attr({
                            type: 'checkbox',
                            id: 'user-menu-' + menuId,
                            class: 'form-check-input',
                            name: 'user-menu[]',
                            value: menuId,
                            disabled: true,
                        }),
                        $('<label>').attr('for', 'user-menu-' + menuId).addClass('form-check-label').text(menuName)
                    );

                    // Append the checkbox to the menu-checkboxes container
                    $('.menu-checkboxes').append($checkbox);
                });
            } else {
                console.error('Failed to fetch menu data:', response.meta.message);
            }
        },
        error: function (error) {
            console.error('Failed to fetch menu data:', error);
        }
    });
  }
  
  fetchAndPopulateMenuOptions();

  if (dtTable.length) {
    var table = dtTable.DataTable({
      processing: true,
      serverSide: true,
      ajax: {
        url: `${BACKEND_API}api/v1/users/list`,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        dataSrc: function (response) {
          // Extract recordsTotal and recordsFiltered from the server response
          var recordsTotal = response.data.recordsTotal;
          var recordsFiltered = response.data.recordsFiltered;
  
          // Set the values for DataTables
          response.recordsTotal = recordsTotal;
          response.recordsFiltered = recordsFiltered;
  
          // Return the data array from the response
          return response.data.data;
        },
      },
      columns: [
          { data: 'no'},
          { data: 'user_detail.name'},
          { data: 'username'},
          { data: 'email'},
          { data: 'user_detail.phone_number'},
          { data: 'id'},  
      ],
      columnDefs: [
        {
          targets: -1,
          title: 'Aksi',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="btn-group">' +
              '<a href="javascript:;" data-id="'+full.id+'" class="dropdown-item delete-record">' +
                feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
                'Hapus</a></div>' +
              '</div>'
            );
          }
        }
      ],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: 'Tampilkan _MENU_',
        search: 'Pencarian',
        searchPlaceholder: 'Cari...'
      },
      // Buttons with Dropdown
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-outline-secondary dropdown-toggle me-2',
          text: feather.icons['external-link'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
          buttons: [
            {
              extend: 'print',
              text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4] }
            },
            {
              extend: 'csv',
              text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4] }
            },
            {
              extend: 'excel',
              text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4] }
            },
            {
              extend: 'pdf',
              text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4] }
            },
            {
              extend: 'copy',
              text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4] }
            }
          ],
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
            $(node).parent().removeClass('btn-group');
            setTimeout(function () {
              $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex mt-50');
            }, 50);
          }
        },
        {
          text: 'Tambah User Baru',
          className: 'add-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#modals-slide-in'
          },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }
      ],
      responsive: true,
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
    });
  }

  table.on('click', 'tbody tr td:not(:last-child, :first-child)', function () {
    var rowData = table.row(this).data();
    
    $('.modal-title').text('Detail of '+rowData.user_detail.name);
    $('#user-id').val(rowData.id);
    $('#user-username').val(rowData.username);
    $('#user-email').val(rowData.email);
    $('#user-nip').val(rowData.user_detail.nip);
    $('#user-name').val(rowData.user_detail.name);
    $('#user-phone').val(rowData.user_detail.phone_number);
    $('#user-address').val(rowData.user_detail.address);

    $('#modals-slide-in-detail').modal('show');

    $('input[name="user-menu[]"]').map(function () {
      $(this).prop('checked', false);
    }).get();

    $.ajax({
      url: `${BACKEND_API}api/v1/users/detail/${rowData.id}`,
      method: 'GET', 
      beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
      },
      success: function (response) {
        var menuAccess = response.data.menu_access;
        menuAccess.forEach(menu => {
          $('#user-menu-'+menu.master_menu_id).prop('checked', true);
        });
      },
      error: function (error) {
          console.error('Update failed:', error);
          toastr['error'](
              error.statusText,
              'Gagal!',
              {
                  closeButton: true,
                  tapToDismiss: false
              }
          );
      }
  });
  });

  saveButton.on('click', function(){
    var state = saveButton.data('state');

    if (state === 'edit') {
      $('#user-username').prop('disabled', false);
      $('#user-email').prop('disabled', false);
      $('#user-nip').prop('disabled', false);
      $('#user-name').prop('disabled', false);
      $('#user-phone').prop('disabled', false);
      $('#user-address').prop('disabled', false);
      $('#area-hidden').removeClass('d-none');
      $('input[name="user-menu[]"]').map(function () {
        $(this).attr('disabled', false);
      }).get();
      
      saveButton.text('Simpan');
      saveButton.data('state', 'save'); // Update the state to 'save'
    } else if (state === 'save') {
      var userId = $('#user-id').val(); 
      var selectedMenuID = $('input[name="user-menu[]"]:checked').map(function () {
        return $(this).val();
      }).get();

      var updatedData = {
        username: $('#user-username').val(),
        email: $('#user-email').val(),
        nip: $('#user-nip').val(),
        name: $('#user-name').val(),
        phone_number: $('#user-phone').val(),
        address: $('#user-address').val(),
        password: $('#user-password').val(),
        menu_access: selectedMenuID.join(',')
      };

      saveButton.text('Meyimpan..');
      saveButton.attr('disabled', true);
      
      $.ajax({
        url: `${BACKEND_API}api/v1/users/update/${userId}`,
        method: 'POST', 
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        data: updatedData,
        success: function (response) {
          saveButton.attr('disabled', false);

          $('#modals-slide-in-detail').modal('hide');

          toastr['success'](
            'Berhasil update pengguna!',
            'Sukses!',
            {
              closeButton: true,
              tapToDismiss: false
            }
          );
          
          table.ajax.reload();
        },
        error: function (error) {
          console.error('Update failed:', error);
          toastr['error'](
            error.statusText,
            'Error!',
            {
              closeButton: true,
              tapToDismiss: false
            }
          );
        }
      });
    }
  });

  eventForm.validate({
    rules: {
        'add-user-nip': {
            required: true
        },
        'add-user-username': {
            required: true
        },
        'add-user-name': {
            required: true
        },
        'add-user-phone': {
            required: true
        },
        'add-user-email': {
            required: true,
            email: true
        },
        'add-user-address': {
            required: true
        },
        'add-user-password': {
            required: true
        },
        'add-user-password-confirm': {
            required: true,
            equalTo: "#add-user-password" // Ensure it matches the password field
        },
        'add-user-menu[]': {
            required: true
        }
    },
    messages: {
        'add-user-nip': {
            required: 'NIP wajib diisi'
        },
        'add-user-username': {
            required: 'Username wajib diisi'
        },
        'add-user-name': {
            required: 'Nama Lengkap wajib diisi'
        },
        'add-user-phone': {
            required: 'Nomor Telepon wajib diisi'
        },
        'add-user-email': {
            required: 'Email wajib diisi',
            email: 'Masukkan alamat email yang valid'
        },
        'add-user-address': {
            required: 'Alamat wajib diisi'
        },
        'add-user-password': {
            required: 'Password wajib diisi'
        },
        'add-user-password-confirm': {
            required: 'Konfirmasi Password wajib diisi',
            equalTo: 'Konfirmasi Password harus sama dengan Password'
        },
        'add-user-menu[]': {
            required: 'Pilih setidaknya satu Menu'
        }
    },
  });

  submitButton.on('click', function() {
    if (eventForm.valid()) {
      var selectedMenuID = $('input[name="add-user-menu[]"]:checked').map(function () {
          return $(this).val();
      }).get();

      var insertData = {
          username: $('#add-user-username').val(),
          email: $('#add-user-email').val(),
          nip: $('#add-user-nip').val(),
          name: $('#add-user-name').val(),
          phone_number: $('#add-user-phone').val(),
          address: $('#add-user-address').val(),
          password: $('#add-user-password-confirm').val(),
          menu_access: selectedMenuID.join(',')
      };
      
      $.ajax({
          url: `${BACKEND_API}api/v1/users/store`,
          method: 'POST', 
          beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
          },
          data: insertData,
          success: function (response) {
              $('#modals-slide-in').modal('hide');
      
              toastr['success'](
                  'Berhasil menambahkan pengguna baru',
                  'Oke!',
                  {
                      closeButton: true,
                      tapToDismiss: false
                  }
              );
              
              table.ajax.reload();
          },
          error: function (error) {
              console.error('Update failed:', error);
              toastr['error'](
                  error.statusText,
                  'Gagal!',
                  {
                      closeButton: true,
                      tapToDismiss: false
                  }
              );
          }
      });
    }
});


  $('#modals-slide-in-detail').on('hidden.bs.modal', function () {
    $('#user-username').prop('disabled', true);
    $('#user-email').prop('disabled', true);
    $('#user-nip').prop('disabled', true);
    $('#user-name').prop('disabled', true);
    $('#user-phone').prop('disabled', true);
    $('#user-address').prop('disabled', true);
    $('#area-hidden').addClass('d-none');
    $('input[name="user-menu[]"]').map(function () {
      $(this).attr('disabled', true);
    }).get();
    
    // Reset the button state and text
    saveButton.text('Edit');
    saveButton.data('state', 'edit'); // Update the state to 'edit'
  });

  $('#modals-slide-in').on('hidden.bs.modal', function () {
    $('#add-user-username').val('');
    $('#add-user-email').val('');
    $('#add-user-nip').val('');
    $('#add-user-name').val('');
    $('#add-user-phone').val('');
    $('#add-user-address').val('');
    $('#add-user-password').val('');
    $('#add-user-password-confirm').val('');
  });

  var primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-primary');
  var secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-secondary');

  table.on('click', '.delete-record', function () {
    var id = $(this).data('id');

    Swal.fire({
      title: 'Apa anda yakin?',
      text: 'Anda tidak bisa mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: primaryColor,
      cancelButtonColor: secondaryColor,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Jangan'
    }).then((result) => {
      if (result.isConfirmed) {
        // Send DELETE request
        $.ajax({
          url: `${BACKEND_API}api/v1/users/delete/${id}`,
          type: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
          },
          success: function (response) {
            // Use Toastr for success message
            toastr['success'](
              'Pengguna Berhasil Dihapus',
              'Ok!',
              {
                closeButton: true,
                tapToDismiss: false
              }
            );
            table.ajax.reload();
          },
          error: function (xhr, textStatus, errorThrown) {
            // Use Toastr for error message
            toastr['error'](
              errorThrown,
              'Error menghapus pengguna!',
              {
                closeButton: true,
                tapToDismiss: false
              }
            );
          },
        });
      }
    });
  });

});
