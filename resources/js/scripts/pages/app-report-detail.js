Dropzone.autoDiscover = false;

$(function () {
  'use strict';
  var officeAddress = $('#officeAddress'),
  phoneAddress = $('#officePhone'),
  createdAt = $('#createdAt'),
  crashId = $('#crashId'),
  eventName = $('#eventName'),
  eventDate = $('#eventDate'),
  eventTime = $('#eventTime'),
  eventGuest = $('#eventGuest'),
  eventDescription = $('#eventDescription'),
  userResponsible = $('#userResponsible'),
  nipResponsible = $('#nipResponsible'),
  userValidator = $('#userVerificator'),
  dateValidator = $('#dateVerificator'),
  areaImg = $('#areaImg'),
  cardFiles = $('#cardFiles'),
  areaFile = $('#areaFile'),
  multipleFiles = $('#dpz-multiple-files'),
  processUpload = $('.btn-process-upload'),
  end;

  function fetchDetail(){
    $.ajax(
      {
        url: `${BACKEND_API}api/v1/report/detail-report/${EVENT_ID}`,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        success: function (result) {
          var data = result.data;
          
          officeAddress.html(data.setting.address);
          phoneAddress.html(data.setting.office_number);
          createdAt.html(data.created_at);
          crashId.html('#'+data.id);
          eventName.html(data.event_name);
          eventDate.html(data.date_start);
          eventDescription.html(data.event_desc);
          eventTime.html(data.time_start);
          eventGuest.html(data.guest_count+' Tamu');
          userResponsible.html(data.user_responsible.name);
          nipResponsible.html("NIP: "+data.user_responsible.nip);
          userValidator.html(data.user_verificator ? data.user_verificator.name : '-');
          dateValidator.html(data.user_verificator ? data.user_verificator.created_at : '-');

          var imageFile = data.report_file.filter(item => item.type === 'image');
          var docFile = data.report_file.filter(item => item.type === 'doc');
          
          if(imageFile.length > 0) {
            areaImg.empty();
            imageFile.forEach(img => {
              var template = `
                <div class="col-4 my-1 position-relative">
                  <img class="w-100 h-100" style="object-fit:cover" src="${img.path}" alt="${img.created_at}">
                  <button type="button" class="bg-primary delete-button btn-close" data-file-id="${img.id}" aria-label="Close"></button>
                </div>
              `;

              areaImg.append(template);
            });
          } else {
            areaImg.html(`
            <div class="col-3 text-center w-100 text-muted">
              <i>belum ada dokumentasi agenda</i>
            </div>
            `)
          }

          if(docFile.length > 0) {
            cardFiles.removeClass('d-none');
            areaFile.empty();
            docFile.forEach(doc => {

              var parts = doc.path.split("/");

              var fileName = parts[parts.length - 1];

              var template = `
              <div class="card file-manager-item file border p-1">
                <div class="card-img-top file-logo-wrapper">
                  <div class="d-flex justify-content-end">
                    <a href="#" data-file-id="${doc.id}" class="delete-file-button text-muted ms-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </a>
                    <a href="#" data-file-path="${doc.path}" class="download-file-button text-muted ms-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </a>
                  </div>
                  <div class="d-flex align-items-center justify-content-center w-100">
                    <img src="${ASSET_DOC}" alt="file-icon" height="35" />
                  </div>
                </div>
                <div class="card-body text-center p-1">
                  <div class="content-wrapper">
                    <p class="card-text file-name mb-0">${fileName}</p>
                  </div>
                </div>
              </div>
              `;

              areaFile.append(template);
            });
          } else {
            areaFile.empty();
            cardFiles.addClass('d-none');
          }

          $('.delete-button').on('click', function(){
            var id = $(this).data('file-id');
            deleteFiles(id);
          });
        
          $('.delete-file-button').on('click', function(){
            var id = $(this).data('file-id');
            deleteFiles(id);
          });
        
          $('.download-file-button').on('click', function(){
            var path = $(this).data('file-path');
            downloadFiles(path);
          });
        },
        error: function (error) {
          console.log(error);
        }
      }
    );
  }

  fetchDetail();

  var myDropzone = new Dropzone(multipleFiles.get(0), {
    paramName: 'files[]',
    url: `${BACKEND_API}api/v1/report/rent/upload/${EVENT_ID}`,
    maxFilesize: 3,
    clickable: true,
    autoProcessQueue: false,
    addRemoveLinks: true,
    autoQueue:true,
    acceptedFiles: ".pdf,.jpg,.png,.docx,.jpeg,.docs,.doc,.xls,.xlsx",
    dictRemoveFile: "Hapus",
    dictCancelUpload: "Batalkan Upload",
    dictCancelUploadConfirmation: "Konfirmasi",
    parallelUploads: 10,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    }
  });

  myDropzone.on("complete", function(file) {
    myDropzone.removeFile(file);
    processUpload.prop('disabled', false);
    fetchDetail();
  });

  processUpload.on('click', function(){
    myDropzone.processQueue();
    processUpload.prop('disabled', true);
  }) 

  function deleteFiles(id) {
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
            url: `${BACKEND_API}api/v1/report/rent/upload/delete/${id}`,
            type: 'DELETE',
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
            },
            success: function (result) {
              fetchDetail();
            },
            error: function (error) {
              console.log(error);
            }
          }
        );
      }
    })
  }

  function downloadFiles(path) {
    window.open(path, '_blank');
  }
});
