import { style } from "@vanilla-extract/css";
import {
  space,
  titlepiece,
  body as textBody,
} from "@guardian/source-foundations";

const cleanUpFamily = (s: string) => s.replace("font-family:", "");
const paddingPx = (n: number) => `${n}px`;

const footer = style({
  color: "#ccc",
  backgroundColor: "#111",
  padding: paddingPx(space[2]),
});

const header = style([footer]);

const body = style({
  color: "#ccc",
  backgroundColor: "#111",
  fontFamily: cleanUpFamily(textBody.medium()),
  maxWidth: "1300px",
  margin: "0 auto",
});

const heading = style({
  fontFamily: cleanUpFamily(titlepiece.medium()),
});

const card = style({
  backgroundColor: "#444",
});

export {
  /* ... */
  body,
  header,
  footer,
  heading,
  card,
};
