const filterModes = [
  "autosmart",
  "sensitivesmart",
  "autoascii",
  "username",
  "nameandtext",
  "id",
] as const;

const removalTypes = ["reportspam", "deletespam", "heldforreview"] as const;

export { filterModes, removalTypes };
