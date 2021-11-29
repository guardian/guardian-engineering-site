// This file isn’t currently used, but it may be useful for future
// explorations in vanilla-extract

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
  fontFamily: cleanUpFamily(textBody.medium()),
});

const header = style([
  footer,
  {
    borderTop: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
  },
]);

const body = style({
  color: "#ccc",
  backgroundColor: "#111",
  fontFamily: cleanUpFamily(textBody.medium()),
  maxWidth: "1300px",
  margin: "0 auto",
  minHeight: "100vh",
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
