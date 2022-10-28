type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>
export type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never


// type PrependNextNum<A extends unknown[]> = A['length'] extends infer T
//   ? ((t: T, ...a: A) => void) extends (...x: infer X) => void
//     ? X
//     : never
//   : never
// type EnumerateInternal<N extends number, A extends unknown[]> = {
//   0: A
//   1: EnumerateInternal<N, PrependNextNum<A>>
// }[N extends A['length'] ? 0 : 1]
// type Enumerate<N extends number> = EnumerateInternal<N, []> extends (infer E)[] ? E : never

type _EnumRanges<N extends number, A extends number[]> = A['length'] extends N ? A : _EnumRanges<N, [...A, A['length']]>
export type EnumElem<N extends number> = _EnumRanges<N, []> extends (infer E)[] ? E : never
export type Digit = EnumElem<10>