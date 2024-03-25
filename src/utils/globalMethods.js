export const clearLocalStorage = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userPreferredLanguage");
    localStorage.removeItem("consequentialDamage");
    localStorage.removeItem("ReturnReasonsScene_Damage_true_coolingOff_true");
    localStorage.removeItem(
        "ReturnReasonsScene_Damage_true_coolingOff_false"
    );
    localStorage.removeItem(
        "ReturnReasonsScene_Damage_false_coolingOff_true"
    );
    localStorage.removeItem(
        "ReturnReasonsScene_Damage_false_coolingOff_false"
    );
}


export const formatValue = (value) => {
    if (!value) {
      return "-";
    } else if (value instanceof Date) {
      // Check if value is a Date object
      const date = value.toISOString().split("T")[0]; // Extract year, month, and date
      return date;
    } else if (typeof value === "string") {
      // Check if the string matches ISO format (yyyy-mm-ddThh:mm:ss)
      if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
        const date = new Date(value);
        const formattedDate = date.toISOString().split("T")[0]; // Extract year, month, and date
        return formattedDate;
      } else {
        return value; // Return the original value if not in ISO format
      }
    } else {
      return value; // Return the original value if it's not a string or Date object
    }
  };