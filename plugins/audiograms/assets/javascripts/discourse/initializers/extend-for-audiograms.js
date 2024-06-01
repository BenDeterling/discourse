import { withPluginApi } from "discourse/lib/plugin-api";

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup-trigger-audiogram')) {
    openAudiogramPopup(e);
  } else if (e.target.classList.contains('submit-audiogram')) { 
    submitAudiogramForm(e);
  }
});

function openAudiogramPopup(e) {
  e.preventDefault();
  const popup = document.querySelector('.popup-audiogram');
  popup.style.display = 'block';
};

function closeAudiogramPopup(e) {
  e.preventDefault();
  const popup = document.querySelector('.popup-audiogram');
  popup.style.display = 'none';
};

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

  var formData = {
    "date_tested" : date_tested,
    "le_hlt_250hz": le_hlt_250hz,
    "le_hlt_500hz": le_hlt_500hz,
    "le_hlt_750hz": le_hlt_750hz,
    "le_hlt_1000hz": le_hlt_1000hz,
    "le_hlt_1500hz": le_hlt_1500hz,
    "le_hlt_2000hz": le_hlt_2000hz,
    "le_hlt_3000hz": le_hlt_3000hz,
    "le_hlt_4000hz": le_hlt_4000hz,
    "le_hlt_6000hz": le_hlt_6000hz,
    "le_hlt_8000hz": le_hlt_8000hz,
    "re_hlt_250hz": re_hlt_250hz,
    "re_hlt_500hz": re_hlt_500hz,
    "re_hlt_750hz": re_hlt_750hz,
    "re_hlt_1000hz": re_hlt_1000hz,
    "re_hlt_1500hz": re_hlt_1500hz,
    "re_hlt_2000hz": re_hlt_2000hz,
    "re_hlt_3000hz": re_hlt_3000hz,
    "re_hlt_4000hz": re_hlt_4000hz,
    "re_hlt_6000hz": re_hlt_6000hz,
    "re_hlt_8000hz": re_hlt_8000hz,
    "le_bc_500hz": le_bc_500hz,
    "le_bc_1000hz": le_bc_1000hz,
    "le_bc_2000hz": le_bc_2000hz,
    "le_bc_4000hz": le_bc_4000hz,
    "re_bc_500hz": re_bc_500hz,
    "re_bc_1000hz": re_bc_1000hz,
    "re_bc_2000hz": re_bc_2000hz,
    "re_bc_4000hz": re_bc_4000hz,
    "le_wr_score" : le_wr_score,
    "le_wr_level" : le_wr_level,
    "re_wr_score" : re_wr_score,
    "re_wr_level" : re_wr_level,
  };

  var formDataJSON = JSON.stringify(formData)

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
      console.log('Custom user field updated successfully');
    }).catch(error => {
      console.error('Error updating custom user field:', error);
    });
  });
  
  form.reset();
  closeAudiogramPopup(e);
};

function attachAudiogram(api, siteSettings) {
  api.includePostAttributes("audiogram");
  
  api.decorateWidget("poster-name:after", (dec) => {
      return dec.h('span', dec.attrs.audiogram)
  });
}

function addSetting(api) {
    api.modifyClass("controller:preferences/profile", {
      pluginId: "discourse-audiograms",
  
      actions: {
        save() {
          this.set(
            "model.custom_fields.see_audiograms",
            this.get("model.see_audiograms")
          );
          this.get("saveAttrNames").push("custom_fields");
          this._super();
        },
      },
    });
  }
  
export default {
  name: "extend-for-audiograms",
  initialize(container) {
    const siteSettings = container.lookup("service:site-settings");
    if (siteSettings.audiograms_enabled) {
      withPluginApi("0.1", (api) => attachAudiogram(api, siteSettings));
      withPluginApi("0.1", (api) => addSetting(api, siteSettings));
    }
  },
};