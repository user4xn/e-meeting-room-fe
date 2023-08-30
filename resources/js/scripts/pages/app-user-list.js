$(function (window) {
  ('use strict');
  
  var dtTable = $('.user-list-table'), 
    saveButton = $('.data-save'), 
    submitButton = $('.data-submit');

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
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="btn-group">' +
              '<a href="javascript:;" data-id="'+full.id+'" class="dropdown-item delete-record">' +
                feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
                'Delete</a></div>' +
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
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search..'
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
          text: 'Add New User',
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

  table.on('click', 'tbody tr td:not(:last-child)', function () {
    var rowData = table.row(this).data(); // Get data for the clicked row
    
    // Populate modal fields with data
    $('.modal-title').text('Detail of '+rowData.user_detail.name);
    $('#user-id').val(rowData.id);
    $('#user-username').val(rowData.username);
    $('#user-email').val(rowData.email);
    $('#user-nik').val(rowData.user_detail.nik);
    $('#user-name').val(rowData.user_detail.name);
    $('#user-phone').val(rowData.user_detail.phone_number);
    $('#user-address').val(rowData.user_detail.address);

    // Show the modal
    $('#modals-slide-in-detail').modal('show');
  });

  saveButton.on('click', function(){
    var state = saveButton.data('state');

    if (state === 'edit') {
      $('#user-username').prop('disabled', false);
      $('#user-email').prop('disabled', false);
      $('#user-nik').prop('disabled', false);
      $('#user-name').prop('disabled', false);
      $('#user-phone').prop('disabled', false);
      $('#user-address').prop('disabled', false);
      $('#area-hidden').removeClass('d-none');
      
      saveButton.text('Save');
      saveButton.data('state', 'save'); // Update the state to 'save'
    } else if (state === 'save') {
      var userId = $('#user-id').val(); 
      var updatedData = {
        username: $('#user-username').val(),
        email: $('#user-email').val(),
        nik: $('#user-nik').val(),
        name: $('#user-name').val(),
        phone_number: $('#user-phone').val(),
        address: $('#user-address').val(),
        password: $('#user-password').val(),
      };
      
      $.ajax({
        url: `${BACKEND_API}api/v1/users/update/${userId}`,
        method: 'POST', 
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        data: updatedData,
        success: function (response) {
          $('#modals-slide-in-detail').modal('hide');

          toastr['success'](
            'User successfully updated',
            'Agreed!',
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
            'Update Failed!',
            {
              closeButton: true,
              tapToDismiss: false
            }
          );
        }
      });
    }
  });

  submitButton.on('click', function() {
    var insertData = {
      username: $('#add-user-username').val(),
      email: $('#add-user-email').val(),
      nik: $('#add-user-nik').val(),
      name: $('#add-user-name').val(),
      phone_number: $('#add-user-phone').val(),
      address: $('#add-user-address').val(),
      password: $('#add-user-password-confirm').val(),
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
          'Successfully add user',
          'Certainly!',
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
          'Update Failed!',
          {
            closeButton: true,
            tapToDismiss: false
          }
        );
      }
    });
  });

  $('#modals-slide-in-detail').on('hidden.bs.modal', function () {
    $('#user-username').prop('disabled', true);
    $('#user-email').prop('disabled', true);
    $('#user-nik').prop('disabled', true);
    $('#user-name').prop('disabled', true);
    $('#user-phone').prop('disabled', true);
    $('#user-address').prop('disabled', true);
    $('#area-hidden').addClass('d-none');
    
    // Reset the button state and text
    saveButton.text('Edit');
    saveButton.data('state', 'edit'); // Update the state to 'edit'
  });

  $('#modals-slide-in').on('hidden.bs.modal', function () {
    $('#add-user-username').val('');
    $('#add-user-email').val('');
    $('#add-user-nik').val('');
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
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: primaryColor,
      cancelButtonColor: secondaryColor,
      confirmButtonText: 'Yes, delete it!'
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
              'User successfully deleted',
              'Very Well!',
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
              'Error deleting user',
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
