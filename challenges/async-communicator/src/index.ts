import { expectType } from "tsd";

// IMPLEMENT THIS TYPE
export type WrapForPenpal<T> = {
  [K in keyof T]:  T[K] extends { (...args: infer Args): infer R } ? 
    R extends Promise<any> ? 
      (...args: Args) => R :  // method that returns promise
      (...args: Args) => Promise<R> // wrap the result in a promise
    : T[K]  // non-method
}

/**
 * Test Scenario - Do not change anything below this line
 */
const methods = {
  foo: 6,
  add(a: number, b: number): number {
    return a + b;
  },
  subtract(a: number, b: number): number {
    return a - b;
  },
  doAsyncThing(a: number, b: number): Promise<number> {
    return Promise.resolve(a + b);
  }
};
const asyncMethods: WrapForPenpal<typeof methods> = {} as any;

let foo = asyncMethods.foo
expectType<number>(foo);

let addPromise1 = asyncMethods.doAsyncThing(1, 2)
expectType<Promise<number>>(addPromise1);

let addPromise = asyncMethods.add(1, 2);
expectType<Promise<number>>(addPromise);
// @ts-expect-error
expectType<typeof addPromise>("this should fail");

let subtractPromise = asyncMethods.subtract(1, 2);
expectType<Promise<number>>(subtractPromise);
// @ts-expect-error
expectType<typeof subtractPromise>("this should fail");
