const abortRequestMap = new Map();

export class AbortRequest {
  getAbortKey(config) {
    return `${config.url}_${config.headers?.uid}`;
  }

  addAbort(config) {
    this.removeAbort(config);

    const abortKey = this.getAbortKey(config);
    const controller = new AbortController();

    config.signal = controller.signal;
    abortRequestMap.set(abortKey, {
      controller,
      notAbort: config.headers?.notAbort ?? 'false',
    });
  }

  removeAbort(config) {
    const abortKey = this.getAbortKey(config);

    if (!abortRequestMap.has(abortKey)) return;

    const requestTask = abortRequestMap.get(abortKey);
    requestTask?.controller?.abort();
    abortRequestMap.delete(abortKey);
  }

  removeAllAbort() {
    if (!abortRequestMap.size) return;

    abortRequestMap.forEach((requestTask) => {
      requestTask.notAbort === 'false' && requestTask?.controller?.abort();
    });
    abortRequestMap.clear();
  }
}
