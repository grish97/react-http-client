import { TURLReplacement } from "./types";

export default class URLParser {
  public static readonly queryStringDeclaration: string = "queryString";
  public static readonly placeholderPattern = /:[a-zA-Z0-9_]+/g;
  public static readonly queryPlaceholder = `:${this.queryStringDeclaration}`;

  /**
   * Replace placeholder with provided replacement object
   * @param {string} url
   * @param {TURLReplacement | undefined} replacements
   * @return {string}
   */
  public static parseURL(url: string, replacements?: TURLReplacement) {
    let parsedURL = url;

    const needParsing = this.needParsing(url);

    // URL have not any placeholder
    if (!needParsing) {
      return parsedURL;
    }

    // replacement data not provided
    if (!replacements || (replacements && !Object.keys(replacements).length)) {
      this.helperLog(
        "URL need values for placeholders to parse. Please fill your replacement object",
      );
      return parsedURL;
    }

    // replace path placeholders
    for (const prop in replacements) {
      if (
        !replacements.hasOwnProperty(prop) ||
        prop === this.queryStringDeclaration
      ) {
        continue;
      }

      const propValue = replacements[prop];

      if (typeof propValue === "undefined") {
        this.helperLog(`${prop} has undefined value`);
        continue;
      }

      parsedURL = parsedURL.replace(`:${prop}`, propValue as string);
    }

    // replace query string placeholders
    if (url.includes(this.queryPlaceholder)) {
      let stringValue = this.objectToQueryString(replacements.queryString);

      if (!stringValue) {
        this.helperLog(
          "Missing Search params values. If it will work without that, you can ignore this hint",
        );
      }

      parsedURL = parsedURL.replace(
        `?${this.queryPlaceholder}`,
        stringValue ? `?${stringValue}` : "",
      );
    }

    return parsedURL;
  }

  /**
   * Generate query string from object
   * @param {TURLReplacement["queryString"]} queryStringObject
   * @return {string}
   */
  public static objectToQueryString(
    queryStringObject: TURLReplacement["queryString"],
  ) {
    if (
      !queryStringObject ||
      (queryStringObject && !Object.keys(queryStringObject).length)
    ) {
      return "";
    }

    let urlSearchParams = new URLSearchParams();

    for (const prop of Object.keys(queryStringObject)) {
      urlSearchParams.append(prop, String(queryStringObject[prop]));
    }

    return urlSearchParams.toString();
  }

  /**
   * Check is URL need some sort of parsing
   * @param {string} url
   * @return {boolean}
   */
  public static needParsing(url: string) {
    const hasPlaceholders = url.match(this.placeholderPattern);

    return Boolean(hasPlaceholders);
  }

  /**
   * Development log
   * @param message
   */
  public static helperLog(...message: any[]) {
    console.log(
      "%c API_ENDPOINT_URL_ISSUE",
      "color: white; fontSize: 21px; background: red",
      ...message,
    );
  }
}
