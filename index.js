'use strict'

var oozModule = require('./build/ooz.js');

var OOZ_SAFE_SPACE = 64;

var module_ = null;
var lastDecompressionPtr_ = 0;

function load () {
  if (!module_) {
    module_ = oozModule();
  }
  return module_;
}

/**
 * @param {Uint8Array} data 
 * @param {number} rawSize 
 * @returns {Promise<Uint8Array>}
 */
function decompressUnsafe (data, rawSize) {
  return load().then(module => {
    if (lastDecompressionPtr_) {
      module._free(lastDecompressionPtr_);
      lastDecompressionPtr_ = 0;
    }

    var compressedPtr = module._malloc(data.byteLength);
    module.HEAPU8.set(data, compressedPtr);

    var decompressedPtr = module._malloc(rawSize + OOZ_SAFE_SPACE);
    lastDecompressionPtr_ = decompressedPtr;

    var res = module._Kraken_Decompress(
      compressedPtr, data.byteLength,
      decompressedPtr, rawSize
    );

    module._free(compressedPtr);

    if (res < 0) {
      throw new Error('Failed to decode');
    }
    if (res !== rawSize) {
      throw new Error('Decompresed size is different from expected');
    }

    return module.HEAPU8.subarray(decompressedPtr, decompressedPtr + rawSize);
  })
}

/**
 * @param {Uint8Array} data 
 * @param {number} rawSize 
 * @returns {Promise<Uint8Array>}
 */
function decompress (data, rawSize) {
  return decompressUnsafe(data, rawSize).then(decompressed => {
    const decompressedCopy = new Uint8Array(decompressed.byteLength);
    decompressedCopy.set(decompressed);

    module._free(lastDecompressionPtr_);
    lastDecompressionPtr_ = 0;

    return decompressedCopy;
  });
}

exports.load = load;
exports.decompressUnsafe = decompressUnsafe;
exports.decompress = decompress;
