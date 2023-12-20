type AsyncResult<T, E = unknown> =
  | {
      kind: `idle`;
    }
  | {
      kind: `pending`;
    }
  | {
      kind: `resolved`;
      value: T;
    }
  | {
      kind: `rejected`;
      error: E;
    };

const idle = <T = unknown, E = unknown>(): AsyncResult<T, E> => ({
  kind: `idle`,
});
const pending = <T = unknown, E = unknown>(): AsyncResult<T, E> => ({
  kind: `pending`,
});
const resolved = <T, E = unknown>(value: T): AsyncResult<T, E> => ({
  kind: `resolved`,
  value,
});
const rejected = <T = unknown, E = unknown>(error: E): AsyncResult<T, E> => ({
  error,
  kind: `rejected`,
});

type AsyncResultMap<T, E, Idle, Pending, Resolved, Rejected> = {
  idle: () => Idle;
  pending: () => Pending;
  resolved: (value: T) => Resolved;
  rejected: (error: E) => Rejected;
};

const match = <T, E, Idle, Pending, Resolved, Rejected>(
  result: AsyncResult<T, E>,
  map: AsyncResultMap<T, E, Idle, Pending, Resolved, Rejected>,
): Pending | Resolved | Rejected | Idle => {
  switch (result.kind) {
    case `idle`:
      return map.idle();
    case `pending`:
      return map.pending();
    case `resolved`:
      return map.resolved(result.value);
    case `rejected`:
      return map.rejected(result.error);
  }
};

const pipe = <TInput, TOutput, E>(
  input: AsyncResult<TInput, E>,
  map: (input: TInput) => AsyncResult<TOutput, E>,
  mapError?: (error: E) => AsyncResult<TOutput, E>,
): AsyncResult<TOutput, E> => {
  switch (input.kind) {
    case `idle`:
      return idle();
    case `pending`:
      return pending();
    case `resolved`:
      return map(input.value);
    case `rejected`:
      return mapError ? mapError(input.error) : rejected(input.error);
  }
};

const join = <T1, T2, E>(
  left: AsyncResult<T1, E>,
  right: AsyncResult<T2, E>,
): AsyncResult<[T1, T2], E> =>
  match(left, {
    idle: () => idle(),
    pending: () => pending(),
    rejected: (error) => rejected(error),
    resolved: (leftValue) =>
      pipe(right, (rightValue) => resolved([leftValue, rightValue])),
  });

export { idle, join, match, pending, pipe, rejected, resolved };

export type { AsyncResult };
