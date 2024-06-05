!/**
 * Highstock JS v11.4.3 (2024-05-22)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/indicators/accumulation-distribution",["highcharts","highcharts/modules/stock"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function i(e,t,i,o){e.hasOwnProperty(t)||(e[t]=o.apply(null,i),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:e[t]}})))}i(t,"Stock/Indicators/AD/ADIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t){let{sma:i}=e.seriesTypes,{error:o,extend:s,merge:n}=t;class a extends i{static populateAverage(e,t,i,o,s){let n=t[o][1],a=t[o][2],r=t[o][3],u=i[o];return[e[o],r===n&&r===a||n===a?0:(2*r-a-n)/(n-a)*u]}getValues(e,t){let i,s,n;let r=t.period,u=e.xData,l=e.yData,c=t.volumeSeriesID,d=e.chart.get(c),h=d&&d.yData,p=l?l.length:0,f=[],m=[],g=[];if(!(u.length<=r)||!p||4===l[0].length){if(!d){o("Series "+c+" not found! Check `volumeSeriesID`.",!0,e.chart);return}for(s=r;s<p;s++)i=f.length,n=a.populateAverage(u,l,h,s,r),i>0&&(n[1]+=f[i-1][1]),f.push(n),m.push(n[0]),g.push(n[1]);return{values:f,xData:m,yData:g}}}}return a.defaultOptions=n(i.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume"}}),s(a.prototype,{nameComponents:!1,nameBase:"Accumulation/Distribution"}),e.registerSeriesType("ad",a),a}),i(t,"masters/indicators/accumulation-distribution.src.js",[t["Core/Globals.js"]],function(e){return e})});