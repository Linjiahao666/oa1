import mitt from 'mitt';

class Bus {
  private static instance: any;

  private constructor() { }

  public static getInstance(): any {
    if (!Bus.instance) {
      Bus.instance = mitt();
    }
    return Bus.instance;
  }
}

export function useBus() {
  return {
    bus: Bus.getInstance()
  }
}