## ooz-wasm

[![](https://img.shields.io/npm/v/ooz-wasm/latest?color=CC3534&label=ooz-wasm&logo=npm&labelColor=212121)](https://www.npmjs.com/package/ooz-wasm)

WASM bindings for [ooz](https://github.com/powzix/ooz): Open source Kraken, Mermaid, Selkie, Leviathan, LZNA, Bitknit decompressor.

### Notes

- `.wasm` file is base64 embedded using `-s SINGLE_FILE=1`.
- WebAssembly Module is compiled when the ESM module is imported using a top-level `await`.

Requires browser WebAssembly SIMD support.
- Can be enabled in Chromium-based browsers on `about://flags/#enable-webassembly-simd`
- Can be enabled in Firefox on `about:config` `javascript.options.wasm_simd`

### Usage

```ts
// Decompress data
// NOTE: returned TypedArray lives in WASM memory, you can safely use it until the next call to decompressUnsafe/decompress.
function decompressUnsafe(data: Uint8Array, rawSize: number): Uint8Array;

// Decompress data
function decompress(data: Uint8Array, rawSize: number): Uint8Array;
```

### Build

1. Install Emscripten SDK
2. `emcmake cmake -B build [-G "..."]`
3. Build
   ```bash
   # Ninja (-G "Ninja")
   cmake --build build
   # or Makefiles (-G "Unix Makefiles")
   emmake make -C build
   ```
