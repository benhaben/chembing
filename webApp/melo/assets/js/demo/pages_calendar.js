/*
 * pages_calendar.js
 *
 * Demo JavaScript used on dashboard and calendar-page.
 */

"use strict";

$(document).ready(function(){

	//===== Calendar =====//
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	var h = {};

	if ($('#calendar').width() <= 400) {
		h = {
			left: 'title',
			center: '',
			right: 'prev,next'
		};
	} else {
		h = {
			left: 'prev,next',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};
	}

	$('#calendar').fullCalendar({
		disableDragging: false,
		header: h,
		editable: true,
		events: [{
				title: '订购盐酸',
				start: new Date(y, m, 1),
				backgroundColor: App.getLayoutColorCode('yellow')
			}, {
				title: '库存清理',
				start: new Date(y, m, d - 5),
				end: new Date(y, m, d - 2),
				backgroundColor: App.getLayoutColorCode('green')
			}, {
				title: '订购烧瓶',
				start: new Date(y, m, d - 3, 16, 0),
				allDay: false,
				backgroundColor: App.getLayoutColorCode('red')
			}, {
				title: '盐酸入库信息',
				start: new Date(y, m, d + 4, 16, 0),
				allDay: false,
				backgroundColor: App.getLayoutColorCode('green')
			}, {
				title: '领导审批订单1',
				start: new Date(y, m, d, 10, 30),
				allDay: false
			}, {
				title: '实验室1的新需求',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				backgroundColor: App.getLayoutColorCode('grey'),
				allDay: false
			}, {
				title: '实验室2的新需求',
				start: new Date(y, m, d + 1, 19, 0),
				end: new Date(y, m, d + 1, 22, 30),
				backgroundColor: App.getLayoutColorCode('purple'),
				allDay: false
			}, {
				title: '百度的新产品介绍',
				start: new Date(y, m, 28),
				end: new Date(y, m, 29),
				backgroundColor: App.getLayoutColorCode('yellow'),
				url: 'http://baidu.com/'
			}
		]
	});

});