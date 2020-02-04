class ObjectHelper<T> {
  constructor(dataSource: T) {
    this.dataSource = dataSource
  }

  private dataSource: any

  public static setDataSource<T>(dataSource: T): ObjectHelper<T> {
    return new ObjectHelper(dataSource)
  }

  public static deepCopy<T>(target: T): T {
    if (target === null) {
      return target
    }
    if (target instanceof Date) {
      return new Date(target.getTime()) as any
    }
    // First part is for array and second part is for Realm.Collection
    // if (target instanceof Array || typeof (target as any).type === 'string') {
    if (typeof target === 'object') {
      if (typeof target[Symbol.iterator] === 'function') {
        const cp = [] as any[]
        if ((target as any as any[]).length > 0) {
          for (const arrayMember of target as any as any[]) {
            cp.push(ObjectHelper.deepCopy(arrayMember))
          }
        }
        return cp as any as T
      } else {
        const targetKeys = Object.keys(target)
        const cp = {}
        if (targetKeys.length > 0) {
          for (const key of targetKeys) {
            cp[key] = ObjectHelper.deepCopy(target[key])
          }
        }
        return cp as T
      }
    }
    // Means that object is atomic
    return target
  }

  private setData(dataSource: any, key: string, value: any): ObjectHelper<T> {
    const typeDataKey = typeof dataSource[key]
    const typeParam = typeof value
    if (!dataSource.hasOwnProperty(key) || typeDataKey !== typeParam) {
      console.error(`key ${key}[${typeDataKey}] of dataSource is not same type with param Value[${typeParam}] OR not found in dataSource`)
      return
    }
    if (typeof value === "object") {
      for (let valueKey in value) {
        dataSource[key] = {...dataSource[key], [valueKey]: value[valueKey]}
      }
    } else {
      dataSource[key] = value ?? {...dataSource[key]}
    }
    return dataSource
  }

  public copyWithParam(param: string, value?: any): ObjectHelper<T> {
    if (typeof this.dataSource !== "object") {
      return this.dataSource
    }

    const params = param.split(".")
    const firstKey = params[0]

    this.dataSource = {...this.dataSource}
    let dataChild = {...this.dataSource[firstKey]}
    switch (params.length) {
      case 1: {
        this.setData(this.dataSource, firstKey, value);
        return this
      }
      default: {
        this.dataSource[firstKey] = dataChild
        for (let i = 1; i < params.length; i++) {
          const key = params[i]
          const isLastItem = i === params.length - 1
          if (isLastItem) {
            this.setData(dataChild, key, value)
          } else {
            dataChild[key] = {...dataChild[key]}
            dataChild = dataChild[key]
          }
        }
        return this
      }
    }
  }

  public getResult(): T {
    return this.dataSource
  }
}
export default ObjectHelper
