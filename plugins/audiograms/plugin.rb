# name: audiograms
# about: A plugin to add the ability to create audiograms in Discourse
# version: 0.0.1
# authors: Ben Deterling
# url: https://github.com/BenDeterling/audiogram

enabled_site_setting :audiograms_enabled

DiscoursePluginRegistry.serialized_current_user_fields << "see_audiograms"
DiscoursePluginRegistry.serialized_current_user_fields << "audiogram_url"
DiscoursePluginRegistry.serialized_current_user_fields << "audiogram_raw"
