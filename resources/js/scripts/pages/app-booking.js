(function (window, undefined) {
  'use strict';
  var unapprovedCount = 0,
  approvedCount = 0, 
  rejectedCount = 0,
  doneCount = 0,
  start,end,
  filter = {
    search: null,
    start_date: null,
    start_end: null,
  },
  modalRentCreated = $('#modal-rent-created'),
  modalUserResName = $('#modal-user-res-name'),
  modalUserResPhone = $('#modal-user-res-phone'),
  modalUserResNip = $('#modal-user-res-nip'),
  modalRentTitle = $('#modal-rent-title'),
  modalRentDate = $('#modal-rent-date'),
  modalRentTime = $('#modal-rent-time'),
  modalRentDesc = $('#modal-rent-desc'),
  modalRentNotes = $('#modal-rent-notes'),
  searchFilter = $('.search-filter'),
  applyFilter = $('.apply-filter'),
  resetFilter = $('.reset-filter'),
  startDate = $('#start-filter-date'),
  endDate = $('#end-filter-date'),
  loadingState = $('.loading-state'),
  areaUnapprovedCount = $('#count-unconfirmed'),
  areaApprovedCount = $('#count-approved'),
  areaRejectedCount = $('#count-rejected'),
  areaDoneCount = $('#count-done'),
  areaUnapproved = $('#area-unconfirmed'),
  areaApproved = $('#area-approved'),
  areaRejected = $('#area-rejected'),
  areaDone = $('#area-done');

  if (startDate.length) {
    start = startDate.flatpickr({
      enableTime: false,
      altFormat: 'Y-m-d',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      },
      onChange: function(selectedDates, dateStr, instance) {
        if (endDate.length) {
          end.set('minDate', selectedDates[0]);
        }
      }
    });
  }
  
  if (endDate.length) {
    end = endDate.flatpickr({
      enableTime: false,
      altFormat: 'Y-m-d',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  function fetchEvent(filter){
    $.ajax(
      {
        url: `${BACKEND_API}api/v1/rent`,
        type: 'GET',
        data: filter,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        success: function (result) {
          unapprovedCount = 0;
          approvedCount = 0;
          rejectedCount = 0;
          doneCount = 0;

          result.data.forEach(item => {
            if(item.status === 'unapproved') {
              unapprovedCount += 1;
            } else if(item.status === 'approved') {
              approvedCount += 1;
            } else if(item.status === 'rejected') {
              rejectedCount += 1;
            } else if(item.status === 'done') {
              doneCount += 1;
            }
          }); 
          
          appendElement(result.data);
        },
        error: function (error) {
          console.log(error);
        }
      }
    );
  }

  fetchEvent();

  function appendElement(array){
    areaApproved.empty();
    areaUnapproved.empty();
    areaRejected.empty();
    areaDone.empty();

    array.forEach(item => {
      var container = item.status === 'unapproved' ? areaUnapproved : (item.status === 'approved' ? areaApproved : (item.status === 'done' ? areaDone : areaRejected));
      var partsStart = item.date_start.split(' ');
      var partsEnd = item.date_end.split(' ');

      var dateStart = partsStart[0];
      var timeStart = partsStart[1].substr(1, 4);
      var dateEnd = partsEnd[0];
      var timeEnd = partsEnd[1].substr(1, 4);
      var reformedDateRange = formatDateRange(dateStart, dateEnd);

      var template = `
        <div class="col-xl-4 py-1">
        <div class="card border border-body h-100">
          <div class="card-header border-bottom">
            <h4 class="card-title text-truncate" id="rent-name" style="max-width:400px;">${item.event_name}</h4>
          </div>
          <div class="card-body py-2">
            <div class="row h-100">
              <div class="col-10 d-flex flex-column justify-content-between">
                <div class="text-start h-100 d-flex align-items-center fw-bold">
                  <div class="badge rounded bg-light-primary p-1 me-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar font-medium-3"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                  <div class="d-flex flex-column">
                    <span id="rent-date">
                      ${reformedDateRange}
                    </span>
                    <span style="font-size: 12px!important" class="text-muted" id="rent-time">${timeStart} - ${timeEnd}</span>
                  </div>
                </div>
                <div class="text-start h-100 d-flex align-items-center">
                  <div class="badge rounded bg-light-primary p-1 me-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-3"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <div class="d-flex flex-column">
                    <span id="rent-user-resposible">${item.user_name}</span>
                    <span style="font-size: 12px!important" class="text-muted" id="rent-user-phone">${item.user_phone}</span>
                  </div>
                </div>
              </div>
              <div class="col pt-0">
                <a href="#" class="button-detail" data-id="${item.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search font-large-1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </a>
              </div>
            </div>
          </div>
          <div class="card-footer py-1 d-flex ${item.status !== 'unapproved' ? 'd-none' : null}">
            <button class="btn btn-success flex-grow-1 me-2" id="button-approve" data-id="${item.id}">SETUJU</button>
            <button class="btn btn-outline-danger" id="button-decline" data-id="${item.id}">TOLAK</button>
          </div>
          <div class="card-footer py-1 d-flex ${item.status !== 'unapproved' ? null : 'd-none'}">
            <button class="btn btn-outline-danger flex-grow-1" id="button-delete" data-id="${item.id}">HAPUS</button>
          </div>
        </div>
        </div>
      `;
      
      container.append(template);
      container.removeClass('d-none');
    });
    
    if(unapprovedCount < 1) {
      areaUnapproved.removeClass('d-none');
      areaUnapproved.html(`<span class="text-muted py-4">(Belum ada data)</span>`);
    }
    
    if(approvedCount < 1) {
      areaApproved.removeClass('d-none');
      areaApproved.html(`<span class="text-muted py-4">(Belum ada data)</span>`);
    }
    
    if(rejectedCount < 1) {
      areaRejected.removeClass('d-none');
      areaRejected.html(`<span class="text-muted py-4">(Belum ada data)</span>`);
    }

    if(doneCount < 1) {
      areaDone.removeClass('d-none');
      areaDone.html(`<span class="text-muted py-4">(Belum ada data)</span>`);
    }

    areaApprovedCount.html(' ('+approvedCount+')');
    areaUnapprovedCount.html(' ('+unapprovedCount+')');
    areaRejectedCount.html(' ('+rejectedCount+')');
    areaDoneCount.html(' ('+doneCount+')');
    loadingState.addClass('d-none');
  }

  function formatDateRange(startDateStr, endDateStr) {
    // Parse the input date strings
    var startDate = new Date(startDateStr);
    var endDate = new Date(endDateStr);
  
    // Define arrays for day and month names
    var dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "Mee", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  
    // Get day, month, and year components for both start and end dates
    var startDayName = dayNames[startDate.getDay()];
    var startDay = startDate.getDate();
    var startMonthName = monthNames[startDate.getMonth()];
    var startYear = startDate.getFullYear();
  
    var endDayName = dayNames[endDate.getDay()];
    var endDay = endDate.getDate();
    var endMonthName = monthNames[endDate.getMonth()];
    var endYear = endDate.getFullYear();
  
    // Format the date range string
    var formattedDateRange = startDayName + ", " + startDay + " " + startMonthName + " s/d " + endDayName + ", " + endDay + " " + endMonthName + " " + endYear;
  
    return formattedDateRange;
  }
  
  $('body').on('click', '.button-detail', function(event) {
    var itemId = $(this).data('id');
    $.ajax(
      {
        url: `${BACKEND_API}api/v1/rent/detail/${itemId}`,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        success: function (result) {
          var partsStart = result.data.date_start.split(' ');
          var partsEnd = result.data.date_end.split(' ');
    
          var dateStart = result.data.date_start;
          var timeStart = result.data.time_start.substr(1, 4);
          var dateEnd = result.data.date_end;
          var timeEnd = result.data.time_end.substr(1, 4);
          var reformedDateRange = formatDateRange(dateStart, dateEnd);

          modalRentCreated.html(result.data.created_at);
          modalRentTitle.html(result.data.event_name);
          modalRentDate.html(reformedDateRange);
          modalRentTime.html(timeStart+' - '+timeEnd);
          modalRentDesc.html(result.data.event_desc);
          modalUserResName.html(result.data.user_name);
          modalUserResPhone.tooltip('dispose')
          modalUserResPhone.attr('title', result.data.user_phone);
          modalUserResPhone.tooltip();
          modalUserResNip.html('NIP : '+result.data.user_nip);
          if(result.data.notes){
            modalRentNotes.removeClass('d-none');
            modalRentNotes.html('Catatan Penolakan : '+result.data.notes);
          } else {
            modalRentNotes.addClass('d-none');
          }
          
          if(result.data.status === 'unapproved') {
            $('#modal-button-delete').addClass('d-none');
            $('#modal-button-approve').removeClass('d-none');
            $('#modal-button-decline').removeClass('d-none');
          } else {
            $('#modal-button-approve').addClass('d-none');
            $('#modal-button-decline').addClass('d-none');
            $('#modal-button-delete').removeClass('d-none');
          }

          $('#modal-button-approve').data('rent-id', result.data.id);
          $('#modal-button-decline').data('rent-id', result.data.id);
          $('#modal-button-delete').data('rent-id', result.data.id);
        },
        error: function (error) {
          console.log(error);
        }
      }
    );
    $('#detailRent').modal('show');
    setTimeout(function(){
      $('.modal-loading-overlay').hide();
    }, 1000)
  });
  
  $('body').on('click', '#button-approve', function(event) {
    var itemId = $(this).data('id');
    $.ajax(
      {
        url: `${BACKEND_API}api/v1/rent/update/status/${itemId}`,
        type: 'POST',
        data: {
          status: 'approved',
          notes: null,
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        success: function (result) {
          toastr['success'](
            'Berhasil menyetujui agenda',
            'Sukses!',
            {
              closeButton: true,
              tapToDismiss: false
            }
          );

          filterData();
        },
        error: function (error) {
          toastr['error'](
            'Waktu sudah digunakan oleh meeting lain, harap ganti jam meeting',
            'Gagal',
            {
              closeButton: true,
              tapToDismiss: false
            }
          );
          console.log(error.responseJSON);
        }
      }
    );
  });

  $('#modal-button-approve').on('click', function(){
    var itemId = $(this).data('rent-id');
    $.ajax(
      {
        url: `${BACKEND_API}api/v1/rent/update/status/${itemId}`,
        type: 'POST',
        data: {
          status: 'approved',
          notes: null,
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        success: function (result) {
          toastr['success'](
            'Berhasil menyetujui agenda',
            'Sukses!',
            {
              closeButton: true,
              tapToDismiss: false
            }
          );
          $('#detailRent').modal('hide');
          filterData();
        },
        error: function (error) {
          console.log(error);
        }
      }
    );
  });

  var primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--bs-primary');

  $('body').on('click', '#button-decline', function(event) {
    var itemId = $(this).data('id');
    Swal.fire({
      title: 'Masukan Catatan Penolakan',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Tolak',
      confirmButtonColor: primaryColor,
      showLoaderOnConfirm: true,
      preConfirm: (note) => {
        return $.ajax(
          {
            url: `${BACKEND_API}api/v1/rent/update/status/${itemId}`,
            type: 'POST',
            data: {
              status: 'rejected',
              notes: note,
            },
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
            },
            success: function (result) {
              if (!result) {
                throw new Error(result.meta.message)
              }
              return result
            },
            error: function (error) {
              console.log(error);
            }
          }
        );
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        toastr['success'](
          'Berhasil menolak agenda',
          'Sukses!',
          {
            closeButton: true,
            tapToDismiss: false
          }
        );

        filterData();
      }
    })
  });

  $('#modal-button-decline').on('click', function(){
    var itemId = $(this).data('rent-id');
    $('#detailRent').modal('hide');
    Swal.fire({
      title: 'Masukan Catatan Penolakan',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Tolak',
      confirmButtonColor: primaryColor,
      showLoaderOnConfirm: true,
      preConfirm: (note) => {
        return $.ajax(
          {
            url: `${BACKEND_API}api/v1/rent/update/status/${itemId}`,
            type: 'POST',
            data: {
              status: 'rejected',
              notes: note,
            },
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
            },
            success: function (result) {
              if (!result) {
                throw new Error(result.meta.message)
              }
              return result
            },
            error: function (error) {
              console.log(error);
            }
          }
        );
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        toastr['success'](
          'Berhasil menolak agenda',
          'Sukses!',
          {
            closeButton: true,
            tapToDismiss: false
          }
        );
        filterData();
      }
    })
  });
  
  $('body').on('click', '#button-delete', function(event) {
    var itemId = $(this).data('id');
    Swal.fire({
      title: 'Konfirmasi Hapus?',
      text: "Anda tidak dapat mengembalikan data ini lagi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Jangan'
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax(
          {
            url: `${BACKEND_API}api/v1/rent/delete/${itemId}`,
            type: 'DELETE',
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
            },
            success: function (result) {
              toastr['success'](
                'Berhasil menghapus agenda',
                'Sukses!',
                {
                  closeButton: true,
                  tapToDismiss: false
                }
              );

              filterData();
            },
            error: function (error) {
              console.log(error);
            }
          }
        );
      }
    })
  });

  $('#modal-button-decline').on('click', function(){
    var itemId = $(this).data('rent-id');
    $.ajax(
      {
        url: `${BACKEND_API}api/v1/rent/delete/${itemId}`,
        type: 'DELETE',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        success: function (result) {
          toastr['success'](
            'Berhasil menghapus agenda',
            'Sukses!',
            {
              closeButton: true,
              tapToDismiss: false
            }
          );
          $('#detailRent').modal('hide');
          filterData();
        },
        error: function (error) {
          console.log(error);
        }
      }
    );
  });

  $('#detailRent').on('hide.bs.modal', function () {
    setTimeout(function(){
      $('.modal-loading-overlay').show();
    }, 500)
  });

  function filterData(search, date_start, date_end) {
    filter.search = search ?? filter.search;
    filter.start_date = date_start ?? filter.start_date;
    filter.end_date = date_end ?? filter.end_date;

    fetchEvent(filter);
  }

  var debounceTimer;

  searchFilter.on('keyup', function() {
    var val = searchFilter.val();

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      filterData(val, null, null);
    }, 500); 
  }); 

  function resetValue() {
    startDate.val('');
    endDate.val('');
    searchFilter.val('');
  }

  applyFilter.on('click', function(){
    filterData(null, startDate.val(), endDate.val());
  });

  resetFilter.on('click', function(){
    resetValue();
    fetchEvent();
  });
})(window);