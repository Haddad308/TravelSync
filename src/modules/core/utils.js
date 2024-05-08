export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function RemoveEmptyValues(obj) {
  const newObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Check if the value is not empty (undefined, null, empty string, empty array, empty object)
      if (
        obj[key] !== undefined &&
        obj[key] !== null &&
        obj[key] !== "" &&
        !(Array.isArray(obj[key]) && obj[key].length === 0) &&
        !(typeof obj[key] === "object" && Object.keys(obj[key]).length === 0)
      ) {
        // If the value is an object, recursively remove empty values from it
        if (typeof obj[key] === "object") {
          newObj[key] = RemoveEmptyValues(obj[key]);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }
  return newObj;
}
