
interface TestDataClone {
  name: string
  name2: {
    name21: string
    name22: string
    name23: string
  }
  name3: {
    name31: {
      name32: string
      name33: string
      name34: string
    }
  }
}
let a :TestDataClone = {
  name: "",
  name2: {name21: "", name22: "", name23: ""},
  name3: {name31: {name32: "", name33: "", name34: ""}}
}
