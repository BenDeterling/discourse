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
function attachAudiogram(api, siteSettings) {
  api.includePostAttributes("user_audiogram");

  api.decorateWidget("poster-name:after", (dec) => {
    return [
      dec.h("hr"),
      dec.h("audiogram", {
        attributes: { src: attrs.user_audiogram },
      }),
    ];
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