declare module "secp256k1" {
  export function ecdh(publicKey: any, privateKey: any): any;
  export function ecdhUnsafe(publicKey: any, privateKey: any, compressed: any): any;
  export function privateKeyExport(privateKey: any, compressed: any): any;
  export function privateKeyImport(privateKey: any): any;
  export function privateKeyModInverse(privateKey: any): any;
  export function privateKeyNegate(privateKey: any): any;
  export function privateKeyTweakAdd(privateKey: any, tweak: any): any;
  export function privateKeyTweakMul(privateKey: any, tweak: any): any;
  export function privateKeyVerify(privateKey: Buffer): boolean;
  export function publicKeyCombine(publicKeys: any, compressed: any): any;
  export function publicKeyConvert(publicKey: any, compressed: any): any;
  export function publicKeyCreate(privateKey: Buffer, compressed?: any): Buffer;
  export function publicKeyTweakAdd(publicKey: any, tweak: any, compressed: any): any;
  export function publicKeyTweakMul(publicKey: any, tweak: any, compressed: any): any;
  export function publicKeyVerify(publicKey: any): any;
  export function recover(message: Buffer, signature: Buffer, recovery: 0 | 1, compressed?: any): Buffer;
  export function sign(message: Buffer, privateKey: Buffer, options?: any): { recovery: 0 | 1, signature: Buffer };
  export function signatureExport(signature: any): any;
  export function signatureImport(sig: any): any;
  export function signatureImportLax(sig: any): any;
  export function signatureNormalize(signature: any): any;
  export function verify(message: Buffer, signature: Buffer, publicKey: Buffer): boolean;
}
