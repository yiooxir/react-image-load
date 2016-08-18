export const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const cancelablePromise = new Promise((resolve, reject) =>
    promise.then(r => hasCanceled_ ? reject() : resolve(r))
  );

  cancelablePromise.cancel = () => {
    hasCanceled_ = true;
  };

  return cancelablePromise;
};
