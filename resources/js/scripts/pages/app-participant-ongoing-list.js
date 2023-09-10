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
        url: `${BACKEND_API}api/v1/participant/list-rent/ongoing`,
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
          { data: 'event_name'},
          { data: 'date_start'},
          { data: 'time_start'},
          { data: 'total_guest'},
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
          className: 'btn btn-outline-secondary dropdown-toggle',
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
    
    $.ajax(
      {
        url: `${BACKEND_API}api/v1/participant/list-guest/${rowData.id}`,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        success: function (result) {
          var data = result.data;
          $('#event-title').html(rowData.room_name+' - '+rowData.event_name);
          $('#user-res-name').html(data.user_responsible);
          $('#user-res-nip').html(data.nip_responsible);
          $('#user-res-phone').tooltip('dispose');
          $('#user-res-phone').attr('title', rowData.user_phone);
          $('#user-res-phone').tooltip();
          $('#guest-count').html(rowData.total_guest);
          $('#max-capacity').html(rowData.room_capacity);
          
          $('#area-guest').empty();
          if(data.list_guests.length > 0) {
            var no = 1;
            data.list_guests.forEach(guest => {
              var template = `
                <tr>
                  <td class="text-primary fw-bolder w-25 py-2" style="width:50px!important">#${no}</td>
                  <td>${guest.name}</td>
                  <td>${guest.position}</td>
                  <td>${guest.work_unit}</td>
                  <td>${guest.created_at}</td>
                  <td class="w-25 text-end"><img height="100px" src="${guest.signature}"></td>
                </tr>
              `;

              $('#area-guest').append(template);
              no += 1;
            });
          } else {
            $('#area-guest').append('<tr><td colspan="6" class="text-center text-muted">belum ada data</td></tr>');
          }
          setTimeout(function(){
            $('.modal-loading-overlay').addClass('fade-out');
            setTimeout(function(){
              $('.modal-loading-overlay').hide();
            }, 1000);
          }, 500);
          $('#detailParticipant').modal('show');
        },
        error: function (error) {
          console.log(error);
        }
      }
    );

    console.log(rowData);
  });

  $('#detailParticipant').on('hide.bs.modal', function () {
    $('.modal-loading-overlay').removeClass('fade-out');
    setTimeout(function(){
      $('.modal-loading-overlay').show();
    }, 500)
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
