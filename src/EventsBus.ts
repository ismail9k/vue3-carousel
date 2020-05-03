class EventsBus {
  events: { [key: string]: Array<Function> };

  constructor() {
    this.events = {};
  }

  on(eventName: string, callBack: Function): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callBack);
  }

  emit(eventName: string) {
    const event = this.events[eventName];
    if (!event) return;
    Object.values(event).forEach((callback) => callback());
  }
}

const eventsBus = new EventsBus();
export default eventsBus;
