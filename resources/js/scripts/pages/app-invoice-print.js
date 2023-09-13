/*=========================================================================================
    File Name: app-invoice-print.js
    Description: app-invoice-print Javascript
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy HTML Admin Template
   Version: 1.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

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
  areaFile = $('#areaFile');

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
          
          if(imageFile.length > 0) {
            areaImg.empty();
            imageFile.forEach(img => {
              var template = `
                <div class="col-4 my-1">
                  <img class="w-100 h-100" style="object-fit:cover" src="${img.path}" alt="${img.created_at}">
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

          setTimeout(() => {
            var css = '@page { size: letter; }',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

            style.type = 'text/css';
            style.media = 'print';

            if (style.styleSheet){
              style.styleSheet.cssText = css;
            } else {
              style.appendChild(document.createTextNode(css));
            }

            head.appendChild(style);

            window.print();
          }, 2000);
        },
        error: function (error) {
          console.log(error);
        }
      }
    );
  }

  fetchDetail();
});
