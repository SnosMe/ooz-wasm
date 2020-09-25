cmake_minimum_required(VERSION 3.15)
project(ooz)

add_executable(ooz
  lib/bitknit.cpp
  lib/kraken.cpp
  lib/lzna.cpp
  )

target_compile_options(ooz PRIVATE "-msimd128" "-msse2")

target_link_options(ooz PRIVATE
  "SHELL:-s WASM=1"
  "SHELL:-s FILESYSTEM=0"
  "SHELL:-s MODULARIZE=1"
  "SHELL:-s STRICT=1"
  "SHELL:-s SINGLE_FILE=1"
  "SHELL:-s ALLOW_MEMORY_GROWTH=1"
  "SHELL:-s EXPORTED_FUNCTIONS='[_Kraken_Decompress,_malloc,_free]'"
  "-O3"
  "-fno-rtti"
  "-fno-exceptions"
  )
