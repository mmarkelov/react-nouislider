export const isEqual = (val1, val2) => {
  if (typeof val1 === "number" && typeof val2 === "number")
    return val1 === val2;
  if (typeof val1 === "string" && typeof val2 === "string")
    return val1 === val2;
  if (Array.isArray(val1) && Array.isArray(val2)) {
    return JSON.stringify(val1) === JSON.stringify(val2);
  }
  if (typeof val1 === "object" && typeof val2 === "object") {
    return isEquivalentObject(val1, val2);
  }
  return false;
};

const isEquivalentObject = (obj1, obj2) => {
  var aProps = Object.getOwnPropertyNames(obj1);
  var bProps = Object.getOwnPropertyNames(obj2);

  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    if (obj1[propName] !== obj2[propName]) {
      return false;
    }
  }

  return true;
};
