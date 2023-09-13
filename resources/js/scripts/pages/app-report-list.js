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
        url: `${BACKEND_API}api/v1/report/list-rent`,
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
          { data: 'user_responsible'},
          { data: 'date_start'},
          { data: 'time_start'},
          { data: 'is_completed'},
      ],
      columnDefs: [
        {
          targets: 5,
          render: function (data, type, full, meta) {
            return (
              `<div class="badge p-1 rounded-pill ${full.is_completed === true ? 'bg-light-success' : 'bg-light-secondary'}">` +
                (full.is_completed === true ? 'Selesai' : 'Belum Selesai') +
              '</div>'
            );
          }
        },
        {
          targets: 2,
          render: function (data, type, full, meta) {
            return (
              `<span class='bullet ${full.event_organization === 'Internal' ? 'bullet-info' : 'bullet-success'}` +
              " bullet-sm me-50'> " +
              '</span>' + full.user_responsible
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
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
    });
  }

  table.on('click', 'tbody tr td:not(:last-child)', function () {
    var rowData = table.row(this).data();
    location.href = DETAIL_URL+`/${rowData.id}`;
  });

  $('#detailParticipant').on('hide.bs.modal', function () {
    
  });

});
