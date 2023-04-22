export const handleFieldControl = (field, value) => {
  console.log("Field: " + field + ", Value: " + value);
  switch (field) {
    case "title" || "Author":
      // Check if the name field is not empty and contains only letters and spaces
      return /^[a-zA-Z\s]+$/.test(value.trim());
    case "totalPages" || "currentPage":
      // Check if the age field is not empty and contains only numbers
      return /^[0-9]+$/.test(value.trim());
    case "image":
      // Check if the image field is not empty and contains only letters and spaces
      return /^[a-zA-Z\s]+$/.test(value.trim());
    case "hasNote":
      // Check if the field is boolean
      return typeof value === "boolean";
    default:
      return true; // For any other field, return true (valid by default)
  }
};
