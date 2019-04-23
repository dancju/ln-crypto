import { createHash, randomBytes } from 'crypto';
import secp256k1 from 'secp256k1';
import zbase32 from 'zbase32';

const MSG_PREFIX = 'Lightning Signed Message:';

const sha256 = (msg: string | Buffer) => createHash('sha256').update(msg).digest();
const doubleSha256 = (msg: string) => sha256(sha256(msg));

export const generatePrvkey = (): Buffer => {
  let prvkey: Buffer;
  do {
    prvkey = randomBytes(32);
  } while (!secp256k1.privateKeyVerify(prvkey));
  return prvkey;
};

export const neuter = secp256k1.publicKeyCreate;

export const recover = (msg: string, sigZbzse32: string): Buffer => {
  const digest = doubleSha256(MSG_PREFIX + msg);
  const sigBuffer = Buffer.from(zbase32.decode(sigZbzse32));
  const r = (sigBuffer[0] - 27) & ~4;
  const sv = sigBuffer.slice(1);
  return secp256k1.recover(digest, sv, r as any);
};

export const sign = (msg: string, prvkey: Buffer) => {
  const digest = doubleSha256(MSG_PREFIX + msg);
  const sigObj = secp256k1.sign(digest, prvkey);
  const sigBuffer = Buffer.alloc(65);
  sigBuffer[0] = sigObj.recovery + 27;
  sigObj.signature.copy(sigBuffer, 1);
  return zbase32.encode(sigBuffer);
};

export const verify = (msg: string, sigZbzse32: string, pubkey: Buffer): boolean => {
  const digest = doubleSha256(MSG_PREFIX + msg);
  const sigBuffer = Buffer.from(zbase32.decode(sigZbzse32)).slice(1);
  return secp256k1.verify(digest, sigBuffer, pubkey);
};
