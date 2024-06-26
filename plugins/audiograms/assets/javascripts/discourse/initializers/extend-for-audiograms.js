import { withPluginApi } from "discourse/lib/plugin-api";
import loadScript from "discourse/lib/load-script";

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup-trigger-audiogram')) {
    openAudiogramPopup(e);
  } else if (e.target.classList.contains('submit-audiogram')) {
    submitAudiogramForm(e);
  }
  else if (e.target.classList.contains('audiogram-link')) {
    displayAudiogram(e);
  }
  else if (!e.target.classList.contains('audiogram-div')) {
    const audiogram_div_list = document.getElementsByClassName('audiogram-div');
    for (var audiogram_div of audiogram_div_list) {
      if (audiogram_div) {
        audiogram_div.style.display = 'none';
      };
    };
  };
});

//show the audiogram form when the button is clicked
function openAudiogramPopup(e) {
  e.preventDefault();
  const popup = document.querySelector('.popup-audiogram');
  popup.style.display = 'block';
};

//close the audiogram form when close is clicked
function closeAudiogramPopup(e) {
  e.preventDefault();
  const popup = document.querySelector('.popup-audiogram');
  popup.style.display = 'none';
};

//submit and save the audiogram form as custom user field
function submitAudiogramForm(e) {
  e.preventDefault();
  const form = document.getElementById('edit_audio_3746');

  var date_tested = document.querySelector('input[name="audio[test_date]"]').value;
  //left ear HLT
  var le_hlt_250hz = document.querySelector('select[name="audio[acl250hz]"]').value;
  var le_hlt_500hz = document.querySelector('select[name="audio[acl500hz]"]').value;
  var le_hlt_750hz = document.querySelector('select[name="audio[acl750hz]"]').value;
  var le_hlt_1000hz = document.querySelector('select[name="audio[acl1000hz]"]').value;
  var le_hlt_1500hz = document.querySelector('select[name="audio[acl1500hz]"]').value;
  var le_hlt_2000hz = document.querySelector('select[name="audio[acl2000hz]"]').value;
  var le_hlt_3000hz = document.querySelector('select[name="audio[acl3000hz]"]').value;
  var le_hlt_4000hz = document.querySelector('select[name="audio[acl4000hz]"]').value;
  var le_hlt_6000hz = document.querySelector('select[name="audio[acl6000hz]"]').value;
  var le_hlt_8000hz = document.querySelector('select[name="audio[acl8000hz]"]').value;

  //right ear HLT
  var re_hlt_250hz = document.querySelector('select[name="audio[acr250hz]"]').value;
  var re_hlt_500hz = document.querySelector('select[name="audio[acr500hz]"]').value;
  var re_hlt_750hz = document.querySelector('select[name="audio[acr750hz]"]').value;
  var re_hlt_1000hz = document.querySelector('select[name="audio[acr1000hz]"]').value;
  var re_hlt_1500hz = document.querySelector('select[name="audio[acr1500hz]"]').value;
  var re_hlt_2000hz = document.querySelector('select[name="audio[acr2000hz]"]').value;
  var re_hlt_3000hz = document.querySelector('select[name="audio[acr3000hz]"]').value;
  var re_hlt_4000hz = document.querySelector('select[name="audio[acr4000hz]"]').value;
  var re_hlt_6000hz = document.querySelector('select[name="audio[acr6000hz]"]').value;
  var re_hlt_8000hz = document.querySelector('select[name="audio[acr8000hz]"]').value;

  //bone conduction left ear
  var le_bc_500hz = document.querySelector('select[name="audio[bc_l_500Hz]"]').value;
  var le_bc_1000hz = document.querySelector('select[name="audio[bc_l_1000Hz]"]').value;
  var le_bc_2000hz = document.querySelector('select[name="audio[bc_l_2000Hz]"]').value;
  var le_bc_4000hz = document.querySelector('select[name="audio[bc_l_4000Hz]"]').value;

  //bone conduction right ear
  var re_bc_500hz = document.querySelector('select[name="audio[bc_r_500Hz]"]').value;
  var re_bc_1000hz = document.querySelector('select[name="audio[bc_r_1000Hz]"]').value;
  var re_bc_2000hz = document.querySelector('select[name="audio[bc_r_2000Hz]"]').value;
  var re_bc_4000hz = document.querySelector('select[name="audio[bc_r_4000Hz]"]').value;

  //word recognition
  var le_wr_score = document.querySelector('input[name="audio[score_left]"]').value;
  var le_wr_level = document.querySelector('input[name="audio[level_left]"]').value;
  var re_wr_score = document.querySelector('input[name="audio[score_right]"]').value;
  var re_wr_level = document.querySelector('input[name="audio[level_right]"]').value;

  //in the form used by Highcharts
  //data: [[0, -5], [1, 120], [1.5, -10], [2, 120], [2.5, -10], [3, 120], [3.5, -5], [4, 120], [4.5, -5], [5, 120]],
  var le_hlt_str = [[0, le_hlt_250hz], [1, le_hlt_500hz], [1.5, le_hlt_750hz], [2, le_hlt_1000hz], [2.5, le_hlt_1500hz],
  [3, le_hlt_2000hz], [3.5, le_hlt_3000hz], [4, le_hlt_4000hz], [4.5, le_hlt_6000hz], [5, le_hlt_8000hz]];
  var re_hlt_str = [[0, re_hlt_250hz], [1, re_hlt_500hz], [1.5, re_hlt_750hz], [2, re_hlt_1000hz], [2.5, re_hlt_1500hz],
  [3, re_hlt_2000hz], [3.5, re_hlt_3000hz], [4, re_hlt_4000hz], [4.5, re_hlt_6000hz], [5, re_hlt_8000hz]];

  //to float
  var le_hlt = le_hlt_str.map(function (innerArray) {
    return [innerArray[0], parseFloat(innerArray[1])];
  });
  var re_hlt = re_hlt_str.map(function (innerArray) {
    return [innerArray[0], parseFloat(innerArray[1])];
  });

  var formData = {
    "date_tested": date_tested,
    "le_hlt": le_hlt,
    "re_hlt": re_hlt,
    "le_bc_500hz": le_bc_500hz,
    "le_bc_1000hz": le_bc_1000hz,
    "le_bc_2000hz": le_bc_2000hz,
    "le_bc_4000hz": le_bc_4000hz,
    "re_bc_500hz": re_bc_500hz,
    "re_bc_1000hz": re_bc_1000hz,
    "re_bc_2000hz": re_bc_2000hz,
    "re_bc_4000hz": re_bc_4000hz,
    "le_wr_score": le_wr_score,
    "le_wr_level": le_wr_level,
    "re_wr_score": re_wr_score,
    "re_wr_level": re_wr_level,
  };

  const formDataJSON = JSON.stringify(formData)

  //attach formData to custom user field
  withPluginApi("0.1", (api) => {
    api.includePostAttributes("audiogram");
    const currentUser = api.getCurrentUser();
    if (currentUser) {
      currentUser.set(
        "custom_fields.audiogram",
        formDataJSON
      );
    };
    currentUser.save().then(() => {
      console.log('User audiogram updated successfully');
    }).catch(error => {
      console.error('Error updating user audiogram:', error);
    });
  });

  form.reset();
  closeAudiogramPopup(e);
}

//helper function for hearing loss ranges
function getHearingRange(severity) {
  var minThreshold, maxThreshold;

  switch (severity) {
    case 'normal':
      minThreshold = -10;
      maxThreshold = 15;
      break;
    case 'slight':
      minThreshold = 16;
      maxThreshold = 25;
      break;
    case 'mild':
      minThreshold = 26;
      maxThreshold = 40;
      break;
    case 'moderate':
      minThreshold = 41;
      maxThreshold = 55;
      break;
    case 'moderately-severe':
      minThreshold = 56;
      maxThreshold = 70;
      break;
    case 'severe':
      minThreshold = 71;
      maxThreshold = 90;
      break;
    case 'profound':
      minThreshold = 91;
      maxThreshold = 120;
      break;
  }

  var a = [];
  [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].forEach(function (x) {
    a.push([x, minThreshold, maxThreshold]);
  });

  return a;
}

//attach audiogram link to user posts
function attachAudiogramLink(api, siteSettings) {
  api.decorateWidget("poster-name:after", (dec) => {
    let user_audiogram = dec.attrs.userCustomFields.audiogram;
    let user_id = dec.attrs.user.id;
    return dec.h('a.audiogram-link', { href: '#', text: 'Audiogram', attributes: {'data-id': user_id, 'data-audiogram': user_audiogram }});
  });
}

//add audiogram container to link element
function displayAudiogram(e) {
  e.preventDefault();
  const audiogram_raw = e.target.dataset.audiogram;
  const user_id = e.target.dataset.id;
  let audiogram_link = e.target;
  const audiogram_data = JSON.parse(audiogram_raw);
  //create div to render to
  let audiogram_div = document.getElementById('audiogram-div-' + user_id);
  if (!audiogram_div) {
    audiogram_div = document.createElement('div');
    audiogram_div.classList.add('audiogram-div');
    audiogram_div.id = "audiogram-div-" + user_id;
    audiogram_div.style.display = "none";
    audiogram_div.style.position = "absolute";
    audiogram_div.style.backgroundColor = "lightblue";
    audiogram_div.style.padding = "10px";
    audiogram_div.style.border = "1px solid black";
    audiogram_div.style.borderRadius = "5px";
    let linkRect = audiogram_link.getBoundingClientRect();
    audiogram_div.style.top = (linkRect.top + linkRect.height) + "px";
    audiogram_div.style.left = linkRect.left + "px";
    document.body.appendChild(audiogram_div);

    //generate plot
    loadScript("https://code.highcharts.com/11.4.3/highcharts.js").then(() => {
      loadScript("https://code.highcharts.com/11.4.3/highcharts-more.js").then(() => {
        let chart = buildAudiogram(audiogram_data.le_hlt, audiogram_data.re_hlt, audiogram_div);
        audiogram_div.style.display = "block";
      });
    });
  } else {
    let linkRect = audiogram_link.getBoundingClientRect();
    audiogram_div.style.top = (linkRect.top + linkRect.height) + "px";
    audiogram_div.style.left = linkRect.left + "px";
    audiogram_div.style.display = "block";
  };
}


//build audiogram plot using highcharts
function buildAudiogram(le_hlt, re_hlt, container) {
  Highcharts.SVGRenderer.prototype.symbols.cross = function (x, y, w, h) {
    return ['M', x, y, 'L', x + w, y + h, 'M', x + w, y, 'L', x, y + h, 'z'];
  };
  if (Highcharts.VMLRenderer) {
    Highcharts.VMLRenderer.prototype.symbols.cross = Highcharts.SVGRenderer.prototype.symbols.cross;
  };
  let tones = ['250Hz', '500Hz', '1000Hz', '2000Hz', '4000Hz', '8000Hz'];
  let chart = Highcharts.chart(container, {
    tooltip: false,
    credits: false,
    title: {
      align: 'center',
      text: 'Audiogram',
      style: {
        fontSize: '14px',
        fontFamily: 'source_sans_probold, sans-serif'
      }
    },
    xAxis: [{
      tickmarkPlacement: 'on',
      gridLineColor: '#ddd',
      gridLineWidth: 1,
      opposite: true,
      categories: tones,
      title: {
        text: 'Freq (Hz)'
      },
      min: 0,
      max: 5
    }, {
      linkedTo: 0,
      tickmarkPlacement: 'on',
      gridLineColor: '#eee',
      gridLineWidth: 1,
      //tickPositions:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      tickPositions: [1.5, 2.5, 3.5, 4.5],
      labels: {
        formatter: function () {
          var v = this.value;
          if (v == 1.5) return '750Hz';
          else if (v == 2.5) return '1500Hz';
          else if (v == 3.5) return '3000Hz';
          else if (v == 4.5) return '6000Hz';
        }
      }

    }],

    yAxis: {
      allowDecimals: false,
      reversed: true,
      title: {
        text: 'Decibles (dB)'
      },
      max: 120,
      min: -10,
      tickInterval: 10,
    },

    tooltip: {
      crosshairs: true,
      valueSuffix: 'dB',
      formatter: function () {
        var v = this.x;
        if (v == 1.5) v = '750Hz';
        else if (v == 2.5) v = '1500Hz';
        else if (v == 3.5) v = '3000Hz';
        else if (v == 4.5) v = '6000Hz';
        if (this.point.color == "red" || this.point.color == "blue") {
          return this.series.name + ':<br /><b>' + this.y + 'dB </b> at <b>' + v + '</b>';
        } else {
          return this.series.name;
        }

      }
    },

    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        connectNulls: true
      }

    },
    series: [

      {
        name: 'Right Ear Hearing Level',
        data: re_hlt,
        zIndex: 1,
        color: 'red',
        marker: {
          fillColor: 'white',
          lineWidth: 2,
          lineColor: 'red'
        }
      }, {
        name: 'Left Ear Hearing Level',
        data: le_hlt,
        zIndex: 1,
        color: 'blue',
        marker: {
          symbol: 'cross',
          fillColor: 'white',
          lineWidth: 2,
          lineColor: 'blue'
        }
      },

      {
        type: 'arearange',
        name: 'Normal hearing',
        data: getHearingRange('normal'),
        lineWidth: 0,
        linkedTo: ':previous',
        color: '#7ebefa',
        fillOpacity: 0.3,
        zIndex: 0
      },
      {
        type: 'arearange',
        name: 'Slight hearing loss range',
        data: getHearingRange('slight'),
        lineWidth: 0,
        linkedTo: ':previous',
        color: '#91a2d5',
        fillOpacity: 0.3,
        zIndex: 0
      },
      {
        type: 'arearange',
        name: 'Mild hearing loss range',
        data: getHearingRange('mild'),
        lineWidth: 0,
        linkedTo: ':previous',
        color: '#a77ea4',
        fillOpacity: 0.3,
        zIndex: 0
      },
      {
        type: 'arearange',
        name: 'Moderate hearing loss range',
        data: getHearingRange('moderate'),
        lineWidth: 0,
        linkedTo: ':previous',
        color: '#ba5f7d',
        fillOpacity: 0.3,
        zIndex: 0
      },
      {
        type: 'arearange',
        name: 'Moderately-severe hearing loss range',
        data: getHearingRange('moderately-severe'),
        lineWidth: 0,
        linkedTo: ':previous',
        color: '#cc4358',
        fillOpacity: 0.3,
        zIndex: 0
      },
      {
        type: 'arearange',
        name: 'Severe hearing loss range',
        data: getHearingRange('severe'),
        lineWidth: 0,
        linkedTo: ':previous',
        color: '#dd2733',
        fillOpacity: 0.3,
        zIndex: 0
      },
      {
        type: 'arearange',
        name: 'Profound hearing loss range',
        data: getHearingRange('profound'),
        lineWidth: 0,
        linkedTo: ':previous',
        color: '#f40203',
        fillOpacity: 0.3,
        zIndex: 0
      }
    ]
  });
  return chart;
}


export default {
  name: "extend-for-audiograms",
  initialize(container) {
    const siteSettings = container.lookup("service:site-settings");
    if (siteSettings.audiograms_enabled) {
      withPluginApi("0.1", (api) => attachAudiogramLink(api, siteSettings));
      //withPluginApi("0.1", (api) => addSetting(api, siteSettings));
    }
  },
};