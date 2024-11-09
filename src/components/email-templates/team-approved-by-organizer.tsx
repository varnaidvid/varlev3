import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { container, h1, main, text } from "./styles";

export const TeamApprovedByOrganizerEmail = ({
  teamName,
  competitionName,
}: {
  teamName: string;
  competitionName: string;
}) => (
  <Html>
    <Head />
    <Preview>Csapatod jóváhagyva a szervező által</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          <b>{teamName}</b> csapatodat jóváhagyta a <b>{competitionName}</b>{" "}
          verseny szervezője!
        </Heading>
        <Text style={text}>
          A csapat adatait a verseny megfelelőnek ítélte.
        </Text>
      </Container>
    </Body>
  </Html>
);
