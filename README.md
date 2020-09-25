## ooz-wasm

WASM bindings for [ooz](https://github.com/powzix/ooz): Open source Kraken, Mermaid, Selkie, Leviathan, LZNA, Bitknit decompressor.

### Note

`.wasm` file is base64 embedded using `-s SINGLE_FILE=1`.

Requires browser WebAssembly SIMD support.
Can be enabled in Chromium-based browsers on `about://flags/#enable-webassembly-simd`

### Usage

```ts
// Compile and instantiate WebAssembly code
// NOTE: called implicitly by all other methods
function load(): Promise<void>;

// Decompress data
// NOTE: returned TypedArray lives in WASM memory, you can safely use it until the next call to decompressUnsafe/decompress
function decompressUnsafe(data: Uint8Array, rawSize: number): Promise<Uint8Array>;

// Decompress data
function decompress(data: Uint8Array, rawSize: number): Promise<Uint8Array>;
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
