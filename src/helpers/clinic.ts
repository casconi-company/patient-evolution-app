export const getClinicImage = (clinic: string) => {
  switch (clinic) {
    case "ciita":
      return "/Logo_CIITA.png";
    case "ciita_plus":
      return "/Logo_CIITA_PLUS.png";
    case "ciita_pip":
      return "/CIITA_PIP.png";
    default:
      return "";
  }
};
