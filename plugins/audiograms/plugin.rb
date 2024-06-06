# name: audiograms
# about: A plugin to add the ability to create audiograms in Discourse
# version: 0.1
# author: Ben Deterling
# url: https://github.com/BenDeterling/audiogram

enabled_site_setting :audiograms_enabled

DiscoursePluginRegistry.serialized_current_user_fields << "see_audiograms"
DiscoursePluginRegistry.serialized_current_user_fields << "audiogram"

after_initialize do
    public_user_custom_fields_setting = SiteSetting.public_user_custom_fields
    if public_user_custom_fields_setting.empty?
      SiteSetting.set("public_user_custom_fields", "audiogram")
    elsif public_user_custom_fields_setting !~ /audiogram/
      SiteSetting.set(
        "public_user_custom_fields",
        [SiteSetting.public_user_custom_fields, "audiogram"].join("|")
      )
    end

    User.register_custom_field_type('audiogram', :text)

    register_editable_user_custom_field :audiogram if defined? register_editable_user_custom_field
    
    if SiteSetting.audiograms_enabled then
      add_to_serializer(:post, :audiogram, false) {
        object.user.custom_fields['audiogram']
      }
  
      add_to_serializer(:user, :custom_fields, false) {
        if object.custom_fields == nil then
          {}
        else
          object.custom_fields
        end
      }
    end
end