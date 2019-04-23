declare module "zbase32" {
  export function decode(x: string): Uint8Array;
  export function encode(x: Uint8Array): string;
  export function from5bit(ab: any): any;
  export function to5bit(ab: any): any;
}
