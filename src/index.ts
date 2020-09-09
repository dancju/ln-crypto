import { createHash, randomBytes } from 'crypto';
import secp256k1 from 'secp256k1';
import zbase32 from 'zbase32';

const MSG_PREFIX = 'Lightning Signed Message:';

const sha256 = (msg: string | Uint8Array): Uint8Array => createHash('sha256').update(msg).digest();
const doubleSha256 = (msg: string) => sha256(sha256(msg));

export const generatePrvkey = (): Uint8Array => {
  let prvkey: Uint8Array;
  do {
    prvkey = randomBytes(32);
  } while (!secp256k1.privateKeyVerify(prvkey));
  return prvkey;
};

export const neuter = secp256k1.publicKeyCreate;

export const recover = (msg: string, sigZbzse32: string): Uint8Array => {
  const digest = doubleSha256(MSG_PREFIX + msg);
  const sigBuffer = zbase32.decode(sigZbzse32);
  const r = (sigBuffer[0] - 27) & ~4;
  const sv = sigBuffer.slice(1);
  return secp256k1.ecdsaRecover(sv, r, digest);
};

export const sign = (msg: string, prvkey: Uint8Array): string => {
  const digest = doubleSha256(MSG_PREFIX + msg);
  const sigObj = secp256k1.ecdsaSign(digest, prvkey);
  const sigBuffer = new Uint8Array(65);
  sigBuffer[0] = sigObj.recid + 27;
  sigBuffer.set(sigObj.signature, 1);
  return zbase32.encode(sigBuffer);
};

export const verify = (msg: string, sigZbzse32: string, pubkey: Uint8Array): boolean => {
  const digest = doubleSha256(MSG_PREFIX + msg);
  const sigBuffer = zbase32.decode(sigZbzse32).slice(1);
  return secp256k1.ecdsaVerify(sigBuffer, digest, pubkey);
};
