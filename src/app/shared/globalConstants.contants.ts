export const REGEX = {
    ALPHA: "^([ \u00c0-\u01ffa-zA-Z'\-])+$",
    NUMBER:"^(0|[1-9][0-9]*)$",
    MOBILE_NUMER:"[0-9 ]+",
    DOMAIN_NAME:"^((https?|ftp|smtp):\/\/)?(www.)[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$"
};