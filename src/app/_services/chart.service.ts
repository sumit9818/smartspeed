import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';

@Injectable({ providedIn: 'root' })
export class ChartService {

  constructor() {
  }

	Chart(xAxis, data ) {
		Highcharts.chart('athlete-chart', {
			chart: {
				type: 'spline',
				backgroundColor: '#F1F8DB',
				renderTo: 'container',
			},
			title: null,
			xAxis: { categories: xAxis },
			yAxis: { title: null },
			plotOptions: {
				series: {
					cursor: 'pointer',
					enableMouseTracking: true,
					marker: {
						lineColor: '#9ECA01'
					},
				}
			},
			tooltip: {
				useHTML: true,
				headerFormat: '',
				pointFormat: '<p style="margin-bottom: 8px;font-weight: 600;"><span class="date">Date: {point.date}</span></br><span class="speed">Speed: {point.speed}</span> In <span class="time">{point.time}</span><span class="vid" style="display:none;">{point.video}</span><span class="poster" style="display:none;">{point.thumbnail}</span></p><p class="w-vid"  style="color:#9ECA01;margin-bottom: 0px">View</p>',
			},
			series: [{
				type: 'spline',
				name: 'Stats Chart',
				data: data,
				pointStart: 0,
				marker: {
					symbol: 'circle',
				},
				color: '#9ECA01',
			}]

		})
	}
	
	JumpChart(xAxis, data ) {
		Highcharts.chart('athlete-chart', {
			chart: {
				type: 'spline',
				backgroundColor: '#F1F8DB',
				renderTo: 'container',
			},
			title: null,
			xAxis: { categories: xAxis },
			yAxis: { title: null },
			plotOptions: {
				series: {
					cursor: 'pointer',
					enableMouseTracking: true,
					marker: {
						lineColor: '#9ECA01'
					},
				}
			},
			tooltip: {
				useHTML: true,
				headerFormat: '',
				pointFormat: '<p style="margin-bottom: 8px;font-weight: 600;"><span class="date">Date: {point.date}</span></br><span class="speed">Distance: {point.jump}</span> <span class="vid" style="display:none;">{point.video}</span><span class="poster" style="display:none;">{point.thumbnail}</span></p><p class="w-vid"  style="color:#9ECA01;margin-bottom: 0px">View</p>',
			},
			series: [{
				type: 'spline',
				name: 'Stats Chart',
				data: data,
				pointStart: 0,
				marker: {
					symbol: 'circle',
				},
				color: '#9ECA01',
			}]

		})
	}
}
