import React from "react";
import { LinkButton, SvgTwitter } from "@guardian/source-react-components";
import { buttonOverrides } from "../../styles/shared";

export const LinkTwitter = () => (
  <LinkButton
    cssOverrides={buttonOverrides}
    hideLabel={true}
    href="https://twitter.com/gdndevelopers"
    target="_blank"
    icon={<SvgTwitter />}
  >
    Twitter @gdndevelopers
  </LinkButton>
);
