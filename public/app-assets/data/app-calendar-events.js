/**
 * App Calendar Events
 */

'use strict';

var date = new Date();
var nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
// prettier-ignore
var nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1);
// prettier-ignore
var prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1);

var events = [];

$.ajax(
  {
    url: `${BACKEND_API}api/v1/rent/calendar`,
    type: 'GET',
    success: function (result) {
      events = result.data.events;
    },
    error: function (error) {
      console.log(error);
    }
  }
);
