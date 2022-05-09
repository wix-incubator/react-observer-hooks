export class EventObserver<ObserverEventArg> {
  private observers: Array<Function> = [];

  public attach(observer: Function) {
    this.observers.push(observer);
  }

  public detach(observerToRemove: Function) {
    this.observers = this.observers.filter((observer) => observer !== observerToRemove);
  }

  public notify<K extends keyof ObserverEventArg>(event: K, arg?: ObserverEventArg[K]) {
    this.observers.forEach((observer) => observer(event, arg));
  }
}
