#pragma once

#include <stdint.h>
#include <stdlib.h>

// The decompressor will write outside of the target buffer.
#define OOZ_SAFE_SPACE 64

extern "C" {

int Kraken_Decompress(const uint8_t* src, size_t src_len, uint8_t* dst, size_t dst_len);

}
