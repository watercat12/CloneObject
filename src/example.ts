import ObjectHelper from "./index";


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
  name4: ()=>void
}
let a :TestDataClone = {
  name4: function () {
  },
  name: "",
  name2: {name21: "", name22: "", name23: ""},
  name3: {name31: {name32: "", name33: "", name34: ""}}
}
const copy = ObjectHelper.setDataSource(a)
  .copyWithParam("name2.name21", "100")
  .copyWithParam("name4", function () {
    console.error("ddddd")
  })
  .getResult()
copy.name4()
console.log(copy);
