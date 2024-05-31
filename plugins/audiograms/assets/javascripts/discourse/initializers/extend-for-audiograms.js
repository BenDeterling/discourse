import { isEmpty } from "@ember/utils";
import { withPluginApi } from "discourse/lib/plugin-api";
/*
function attachAudiogram(api, siteSettings) {
    api.includePostAttributes("user_audiogram");
  
    api.decorateWidget("poster-name:after", (dec) => {
      const attrs = dec.attrs;
      if (isEmpty(attrs.user_audiogram)) {
        return;
      }
  
      const currentUser = api.getCurrentUser();
      let enabled;
  
      if (currentUser) {
        enabled =
          currentUser.get("custom_fields.see_audiograms") ??
          siteSettings.audiograms_visible_by_default;
      } else {
        enabled = siteSettings.audiograms_visible_by_default;
      }
      if (enabled) {
        return [
          dec.h("hr"),
          dec.h("img.audiogram-img", { // Changed the class to "audiogram-img"
            attributes: { src: attrs.user_audiogram }, // Changed the attribute to "user_audiogram"
          }),
        ];
      }
    });
}
*/
console.log('made it to the popiup code')
/*
const popupTriggerAudiogram = document.querySelector('.popup-trigger-audiogram');
popupTriggerAudiogram.addEventListener('click', openAudiogramPopup);
const closePopupAudiogram = document.querySelector('.close-popup-audiogram');
closePopupAudiogram.addEventListener('click', closeAudiogramPopup);
*/
document.addEventListener('click', (e) => {
  console.log('click: %o', e);
  if (e.target.classList.contains('popup-trigger-audiogram')) {
    console.log('made it into if in eventlistener')
    openAudiogramPopup(e);
  };
});

function openAudiogramPopup(e) {
  console.log('before e prevent default')
  e.preventDefault();
  console.log('after e prevent default')
  alert('test');
  const popup = document.querySelector('.popup-audiogram');
  popup.style.display = 'block';
}

function closeAudiogramPopup() {
  const popup = document.querySelector('.popup-audiogram');
  popup.style.display = 'none';
}

function attachAudiogram(api, siteSettings) {
  api.includePostAttributes("audiogram");
  
  api.decorateWidget("poster-name:after", (dec) => {
      /*console.log(dec.attrs.audiogram)*/
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