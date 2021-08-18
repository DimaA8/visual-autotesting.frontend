export default (test) => {
  if (
    test.desktop?.status === "success" &&
    test.mobile?.status === "success" &&
    test.tablet?.status === "success"
  ) {
    return "success";
  }
  if (
    test.desktop?.status === "critical" ||
    test.mobile?.status === "critical" ||
    test.tablet?.status === "critical"
  ) {
    return "critical";
  }
  if (
    test.desktop?.status === "error" ||
    test.mobile?.status === "error" ||
    test.tablet?.status === "error"
  ) {
    return "error";
  }
  if (
    test.desktop?.status === "warning" ||
    test.mobile?.status === "warning" ||
    test.tablet?.status === "warning"
  ) {
    return "warning";
  }
};
