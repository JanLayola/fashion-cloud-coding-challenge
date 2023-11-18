import {Deserializable} from "./Deserializable";

class TestClass implements Deserializable {
  prop1: string = '';
  prop2: number = 1;

  deserialize(input: any): this {
    this.prop1 = input.prop1;
    this.prop2 = input.prop2;
    return this;
  }
}

describe('TestClass', () => {
  let testInstance: TestClass;

  beforeEach(() => {
    testInstance = new TestClass();
  });

  it('should implement Deserializable interface', () => {
    const mockData = { prop1: 'test', prop2: 42 };
    const result = testInstance.deserialize(mockData);

    expect(result).toEqual(testInstance);
    expect(testInstance.prop1).toEqual('test');
    expect(testInstance.prop2).toEqual(42);
  });
});
