if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/home/tvisha/.gradle/caches/8.13/transforms/9a9697097163baff70b5a9eb91b8110c/transformed/jetified-hermes-android-0.79.1-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/tvisha/.gradle/caches/8.13/transforms/9a9697097163baff70b5a9eb91b8110c/transformed/jetified-hermes-android-0.79.1-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

