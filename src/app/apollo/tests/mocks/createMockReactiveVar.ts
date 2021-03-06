export function createMockReactiveVar<T>(defaultValue?: T): any {
  let currentValue: T | undefined = defaultValue;

  return function mockReactiveVar(newValue?: T): T {
    if (newValue) {
      currentValue = newValue;
    }
    return currentValue as T;
  };
}
