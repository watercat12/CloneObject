declare class ObjectHelper<T> {
  constructor(dataSource: T);

  private dataSource;

  static setDataSource<T>(dataSource: T): ObjectHelper<T>;

  static deepCopy<T>(target: T): T;

  private setData;

  copyWithParam(param: string, value?: any): ObjectHelper<T>;

  getResult(): T;
}

declare global {
  interface String {
    padZero(): void;
  }

  interface Object {
    print(): void;
  }
}

export default ObjectHelper;
