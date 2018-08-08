class EventListener {
  public readonly event: string;
  public readonly method: any;

  constructor(event: string, method: any) {
    this.event = event;
    this.method = method;
  }
}

export {EventListener}
