export type AbstractControlTuplePath<P extends string> = Tokenize<Normalize<P>>;

export type Normalize<P extends string> =
  P extends `${infer H}[number]${infer R}`
    ? Normalize<`${H}.${`\${number}`}${R}`>
    : P extends `${infer H}[string]${infer R}`
      ? Normalize<`${H}.${`\${string}`}${R}`>
      : P extends `.\${number}${infer R}`
        ? `\${number}${R}`
        : P extends `.\${string}${infer R}`
          ? `\${string}${R}`
          : P;

export type Tokenize<P extends string> = P extends ''
  ? []
  : P extends `\${number}.${infer R}`
    ? [number, ...Tokenize<R>]
    : P extends `\${string}.${infer R}`
      ? [string, ...Tokenize<R>]
      : P extends `${infer K}.${infer R}`
        ? [K, ...Tokenize<R>]
        : P extends `\${number}`
          ? [number]
          : P extends `\${string}`
            ? [string]
            : P extends `${infer K}`
              ? [K]
              : [];
