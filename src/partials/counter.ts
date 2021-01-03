export interface Counter {
  value: number;
  [name: string]: any;
}

function counterFactory() {
  return new Proxy(
    { value: 0, read: 0 },
    {
      get(obj: Counter, prop: string): number {
        if (!(prop in obj)) return 0;
        if (prop === 'read') {
          return obj[prop];
        }
        return obj[prop]++;
      },
      set(obj: Counter, prop: string, value: number): boolean {
        obj[prop] = Math.max(value, 0);
        return true;
      },
    }
  );
}


export default counterFactory;
