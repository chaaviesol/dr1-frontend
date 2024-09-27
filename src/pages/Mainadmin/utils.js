export const getStatus = (status) => {
  switch (status) {
    case "Y":
      return "Active";

    case "N":
      return "Inactive";
    case null:
      return "Active";

    default:
      return "Pending";
  }
};
