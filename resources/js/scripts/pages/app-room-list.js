$(function (window) {
  ('use strict');
  
  var dtTable = $('.room-list-table'), 
    saveButton = $('.data-save'), 
    submitButton = $('.data-submit'),
    downloadButton = $('.download-button');

  if (dtTable.length) {
    var table = dtTable.DataTable({
      processing: true,
      serverSide: true,
      ajax: {
        url: `${BACKEND_API}api/v1/room`,
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
          { data: 'room_name'},
          { data: 'room_desc'},
          { data: 'room_capacity'},
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
          text: 'Tambah Ruangan Baru',
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
    var rowData = table.row(this).data(); // Get data for the clicked row
    // Populate modal fields with data
    console.log(rowData.qrcode);
    $('.modal-title').text('Detail of '+rowData.room_name);
    $('#room-id').val(rowData.id);
    $('#room-name').val(rowData.room_name);
    $('#room-description').val(rowData.room_desc);
    $('#room-capacity').val(rowData.room_capacity);
    $('#room-created-at').val(rowData.created_at);
    $('#room-qrcode').attr('src', rowData.qrcode);
    $('#room-qrcode').data('room', rowData.room_name+'-'+rowData.id);

    // Show the modal
    $('#modals-slide-in-detail').modal('show');
  });

  saveButton.on('click', function(){
    var state = saveButton.data('state');

    if (state === 'edit') {
      $('#room-name').prop('disabled', false);
      $('#room-description').prop('disabled', false);
      $('#room-capacity').prop('disabled', false);
      
      saveButton.text('Simpan');
      saveButton.data('state', 'save'); // Update the state to 'save'
    } else if (state === 'save') {
      var roomId = $('#room-id').val(); 
      var updatedData = {
        room_name: $('#room-name').val(),
        room_desc: $('#room-description').val(),
        room_capacity: $('#room-capacity').val()
      };
      
      $.ajax({
        url: `${BACKEND_API}api/v1/room/update/${roomId}`,
        method: 'POST', 
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        data: updatedData,
        success: function (response) {
          $('#modals-slide-in-detail').modal('hide');

          toastr['success'](
            'Berhasil update ruangan',
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
            'Update Gagal!',
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
      room_name: $('#add-room-name').val(),
      room_desc: $('#add-room-description').val(),
      room_capacity: $('#add-room-capacity').val()
    };
    
    $.ajax({
      url: `${BACKEND_API}api/v1/room/store`,
      method: 'POST', 
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
      },
      data: insertData,
      success: function (response) {
        $('#modals-slide-in').modal('hide');

        toastr['success'](
          'Berhasil menambah ruangan baru',
          'Ok!',
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
          'Gagal menambah ruangan!',
          {
            closeButton: true,
            tapToDismiss: false
          }
        );
      }
    });
  });

  $('#modals-slide-in-detail').on('hidden.bs.modal', function () {
    $('#room-name').prop('disabled', true);
    $('#room-description').prop('disabled', true);
    $('#room-capacity').prop('disabled', true);
    
    // Reset the button state and text
    saveButton.text('Edit');
    saveButton.data('state', 'edit'); // Update the state to 'edit'
  });

  $('#modals-slide-in').on('hidden.bs.modal', function () {
    $('#add-room-name').val('');
    $('#add-room-description').val('');
    $('#add-room-capacity').val('');
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
          url: `${BACKEND_API}api/v1/room/delete/${id}`,
          type: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
          },
          success: function (response) {
            // Use Toastr for success message
            toastr['success'](
              'Ruangan berhasil dihapus',
              'Sukses!',
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
              'Error menghapus ruangan',
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

  downloadButton.on('click', function(e){
    e.preventDefault();
    const image = $('#room-qrcode');
    const label = image.data('room');
    const link = document.createElement('a');
    link.href = image.attr('src');
    link.download = 'sirupat-qr-'+label+'.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

});
