import React from "react";
import {
  LinkButton,
  SvgArrowRightStraight,
} from "@guardian/source-react-components";
import { buttonOverrides } from "../../styles/shared";

export const LinkJobs = () => (
  <LinkButton
    cssOverrides={buttonOverrides}
    href="https://workforus.theguardian.com/"
    target="_blank"
    icon={<SvgArrowRightStraight />}
    iconSide="right"
  >
    Jobs
  </LinkButton>
);
