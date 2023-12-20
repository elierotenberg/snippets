const never = (_value: never, message: string): never => {
  throw new Error(message);
};

export { never };
