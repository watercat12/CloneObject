[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

# **Installation**
```
npm install copy-object-with-param
```

# **Old**

```typescript
let source : TestDataClone = {
  n0:"",
  n1: {
    n2: {
      n3: {
        n4: {
          data: ""
        }
      }
    }
  }
}

const copy = {
  ...source,
  n1:{
    ...source.n1,
    n2: {
      ...source.n1.n2,
      n3: {
        ...source.n1.n2.n3,
        n4: {
          ...source.n1.n2.n3.n4,
          data: "new data"
        }
      }
    }
  }
}
```

# **New**

```typescript
const copyNew = ObjectHelper.setDataSource(source)
  .copyWithParam("n1.n2.n3.n4.data", "new data")
  .copyWithParam("n0","n0 data")
  .getResult()
```
