
export function load (): Promise<void>

export function decompressUnsafe (data: Uint8Array, rawSize: number): Promise<Uint8Array>

export function decompress (data: Uint8Array, rawSize: number): Promise<Uint8Array>
