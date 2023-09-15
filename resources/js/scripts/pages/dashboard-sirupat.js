/*=========================================================================================
    File Name: dashboard-ecommerce.js
    Description: dashboard ecommerce page content with Apexchart Examples
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(window).on('load', function () {
  'use strict';

  var $barColor = '#f3f3f3';
  var $trackBgColor = '#EBEBEB';
  var $textMutedColor = '#b9b9c3';
  var $budgetStrokeColor2 = '#dcdae3';
  var $goalStrokeColor2 = '#51e5a8';
  var $strokeColor = '#ebe9f1';
  var $textHeadingColor = '#5e5873';
  var $earningsStrokeColor2 = '#28c76f66';
  var $earningsStrokeColor3 = '#28c76f33';

  var $statisticsOrderChart = document.querySelector('#statistics-order-chart');
  var $statisticsProfitChart = document.querySelector('#statistics-profit-chart');

  var statisticsOrderChartOptions;
  var statisticsProfitChartOptions;

  var statisticsOrderChart;
  var statisticsProfitChart;
  var isRtl = $('html').attr('data-textdirection') === 'rtl';
  

  var totalRoom = $('#total-room');
  var totalEvent = $('#total-event');
  var totalWaiting = $('#total-waiting');
  var totalUser = $('#total-user');
  var totalExpired = $('#total-expired');
  var totalDone = $('#total-done');
  
  var eventTable = $('#table-today-event');
  var areaEvent = $('#area-today-event');
  var cardNearlyExpired = $('#card-nearly-expired');
  var areaNearlyExpired = $('#area-nearly-expired');
  var nearlyExpiredCount = $('#nearly-expired-count');
  var buttonNearlyExpired = $('#button-nearly-expired');

  //------------ Statistics Bar Chart ------------
  //----------------------------------------------
  statisticsOrderChartOptions = {
    chart: {
      height: 70,
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false
      }
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        top: -15,
        bottom: -15
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20%',
        startingShape: 'rounded',
        colors: {
          backgroundBarColors: [$barColor, $barColor, $barColor, $barColor, $barColor],
          backgroundBarRadius: 5
        }
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    colors: [window.colors.solid.warning],
    series: [
      {
        name: '2020',
        data: [45, 85, 65, 45, 65]
      }
    ],
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      x: {
        show: false
      }
    }
  };
  statisticsOrderChart = new ApexCharts($statisticsOrderChart, statisticsOrderChartOptions);
  statisticsOrderChart.render();

  //------------ Statistics Line Chart ------------
  //-----------------------------------------------
  statisticsProfitChartOptions = {
    chart: {
      height: 70,
      type: 'line',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    grid: {
      borderColor: $trackBgColor,
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      padding: {
        top: -30,
        bottom: -10
      }
    },
    stroke: {
      width: 3
    },
    colors: [window.colors.solid.info],
    series: [
      {
        data: [0, 20, 5, 30, 15, 45]
      }
    ],
    markers: {
      size: 2,
      colors: window.colors.solid.info,
      strokeColors: window.colors.solid.info,
      strokeWidth: 2,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: 5,
          fillColor: '#ffffff',
          strokeColor: window.colors.solid.info,
          size: 5
        }
      ],
      shape: 'circle',
      radius: 2,
      hover: {
        size: 3
      }
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '0px'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      x: {
        show: false
      }
    }
  };
  statisticsProfitChart = new ApexCharts($statisticsProfitChart, statisticsProfitChartOptions);
  statisticsProfitChart.render();

  function fetchDashboard(){
    $.ajax(
      {
        url: `${BACKEND_API}api/v1/dashboard`,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
        },
        success: function (result) {
          var data = result.data;
          totalRoom.html(data.statistic.total_room);
          totalEvent.html(data.statistic.total_rent);
          totalUser.html(data.statistic.total_user);
          totalDone.html(data.statistic.event_done);
          totalWaiting.html(data.statistic.event_unapproved);
          totalExpired.html(data.statistic.event_expired);

          if(data.nearly_expired.length > 0){
            cardNearlyExpired.removeClass('d-none');
            eventTable.addClass('col-lg-8');
            areaNearlyExpired.empty();
            
            var nearlyExpired = data.nearly_expired;
            nearlyExpiredCount.html(nearlyExpired.length);

            var appended = 0;
            nearlyExpired.forEach(ne => {
              if(appended <=3 ){
                const list = `
                <div class="mt-2">
                  <div class="avatar float-start bg-light-warning rounded me-1">
                    <div class="avatar-content">
                      !
                    </div>
                  </div>
                  <div class="more-info">
                    <h6 class="mb-0 text-truncate" style="width: 300px" id="event-nearly-exp-title">${ne.event_name}</h6>
                    <small id="event-nearly-sub">${indoMonth(ne.date_start)} ${ne.time_start !== "00:00:00" ? ','+ne.time_start.substr(0,5) : ''} oleh Adam</small>
                  </div>
                </div>
                `;

                areaNearlyExpired.append(list);
                appended += 1;
              }
            });

            if(appended === 3) {
              buttonNearlyExpired.removeClass('d-none');
            } else {
              buttonNearlyExpired.addClass('d-none');
            }
          } else {
            cardNearlyExpired.addClass('d-none');
            eventTable.removeClass('col-lg-8');
          }

          if(data.today_events.length > 0){
            eventTable.removeClass('d-none');
            var todayEvent = data.today_events;

            areaEvent.empty();

            todayEvent.forEach(evt => {
              const template = `
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="fw-bolder">${evt.user_responsible}</div>
                      <div class="font-small-2 text-muted">${evt.user_email}</div>
                    </div>
                  </div>
                </td>
                <td style="max-width:117px; max-height:84px;" class="text-wrap text-truncate"> 
                  <div class="d-flex align-items-center">
                    <span>${evt.event_name}</span>
                  </div>
                </td>
                <td class="text-nowrap">
                  <div class="d-flex flex-column">
                    <span class="fw-bolder mb-25">s/d ${indoMonth(evt.date_end)}</span>
                    <span class="font-small-2 text-muted ${evt.time_start !== evt.time_end ? '' : 'd-none'}">${evt.time_start.substr(0,5)} - ${evt.time_end.substr(0,5)}</span>
                  </div>
                </td>
                <td style="max-width:117px; max-height:84px;" class="text-wrap text-truncate">
                  ${evt.room_name}
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <span class="fw-bolder me-1 badge rounded-pill bg-light-primary">${evt.guest_count}/${evt.room_capacity}</span>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <span class="fw-bolder me-1 badge rounded-pill ${evt.status === 'ongoing' ? 'bg-light-warning' : (evt.status === 'waiting' ? 'bg-light-secondary' : 'bg-light-success')} text-capitalize">${evt.status}</span>
                  </div>
                </td>
              </tr>
              `;

              areaEvent.append(template);
            });
          } else {
            areaEvent.html(`<td class="text-center" colspan="6"><h6 class="text-muted">tidak ada agenda hari ini</h6></td>`);
            eventTable.addClass('d-none');
          }
        },
        error: function (error) {
          console.log(error);
        }
      }
    );
  }

  fetchDashboard();

  function indoMonth(dateString) {
    var monthMinName = [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
      "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ];

    // Parse the date string
    var parts = dateString.split("-");
    var month = parseInt(parts[1]);
    var day = parseInt(parts[2]);
    
    // Format the date
    var formattedDate = day + " " + monthMinName[month - 1];
    return formattedDate;
  }
});
