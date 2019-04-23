import { generatePrvkey, neuter, recover, sign, verify } from '.';

describe('ln-crypto', () => {
  test('sign, verify, and recover', () => {
    const msg = 'The quick brown fox jumps over the lazy dog.';
    const prvkey = generatePrvkey();
    const pubkey = neuter(prvkey);
    const sigZbase32 = sign(msg, prvkey);
    expect(verify(msg, sigZbase32, pubkey)).toBeTruthy();
    expect(recover(msg, sigZbase32)).toStrictEqual(pubkey);
  });
});
