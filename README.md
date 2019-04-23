# ln-crypto
![license](https://img.shields.io/github/license/nerddan/ln-crypto.svg)
![node](https://img.shields.io/node/v/ln-crypto.svg)
![npm type definitions](https://img.shields.io/npm/types/ln-crypto.svg)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/ln-crypto.svg)
[![build](https://img.shields.io/travis/com/nerdDan/ln-crypto.svg)](https://travis-ci.com/nerdDan/ln-crypto)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ln-crypto&metric=alert_status)](https://sonarcloud.io/dashboard?id=ln-crypto)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ln-crypto&metric=coverage)](https://sonarcloud.io/dashboard?id=ln-crypto)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ln-crypto&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ln-crypto)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=ln-crypto&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=ln-crypto)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ln-crypto&metric=security_rating)](https://sonarcloud.io/dashboard?id=ln-crypto)

Message signing and verifying for Lightning Network, without a connection to the network!

## Usage

```ts
import { generatePrvkey, neuter, recover, sign, verify } from 'ln-crypto';

// an arbitrary message to be signed
const msg = 'The quick brown fox jumps over the lazy dog.';

// generate a pseudorandom private key
const prvkey = generatePrvkey();

// get the corresponding public key
const pubkey = neuter(prvkey);
console.log(pubkey.toString('hex')); // 0280f375eafb209d0255a3139f1013042d55d69005a935da46bea7279d598c366a

// sign the message with secp256k1 and convert the signature into zbase32, which
// is exactly what LND does
const sig = sign(msg, prvkey);
console.log(sig); // d1q3e5fdy96zp3syrhq8zphqnaa5fqbbh9rinozegr1bjr99hssq6hbhstm3pqbh7sfu4hnsyfjjkoewum1ay85gmem98u8wxshyxs5k

// The message receiver can verify the correctness of the signature,
console.log(verify(msg, sig, pubkey)); // true

// or recover a public key from the message and the signature, and compare it
// with the received public key.
console.log(recover(msg, sig).toString('hex')); // 0280f375eafb209d0255a3139f1013042d55d69005a935da46bea7279d598c366a
```
