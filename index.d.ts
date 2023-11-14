// Decompress data
// NOTE: returned TypedArray lives in WASM memory, you can safely use it
//       until the next call to decompressUnsafe/decompress.
export function decompressUnsafe (data: Uint8Array, rawSize: number): Uint8Array;

// Decompress data
export function decompress (data: Uint8Array, rawSize: number): Uint8Array;
