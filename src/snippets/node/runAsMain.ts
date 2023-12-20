const runAsMain = (
  meta: ImportMeta,
  isMain: (meta: ImportMeta) => boolean,
  main: () => Promise<void>,
  onError: (error: unknown) => void = (error) => {
    console.error(error);
    process.exit(1);
  },
): void => {
  try {
    if (!isMain(meta)) {
      throw new Error(`This module is not the main module.`);
    }
    main().catch(onError);
  } catch (error) {
    onError(error);
  }
};

export { runAsMain };
