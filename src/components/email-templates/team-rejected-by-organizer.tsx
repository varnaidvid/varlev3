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
import { btn, container, h1, main, text } from "./styles";

export const TeamRejectedByOrganizerEmail = ({
  teamName,
  competitionName,
  redirectUrl,
}: {
  teamName: string;
  competitionName: string;
  redirectUrl: string;
}) => (
  <Html>
    <Head />
    <Preview>Csapatod elutasítva a szervező által</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          <b>{teamName}</b> csapatodat elutasította a <b>{competitionName}</b>{" "}
          verseny szervezője!
        </Heading>
        <Text style={text}>
          A versenyre való felkészüléshez kérjük, hogy a csapatod adatait
          ellenőrizd.
        </Text>
        <Button style={{ ...btn, padding: "12px 20px" }} href={redirectUrl}>
          Ellenőrzés
        </Button>
      </Container>
    </Body>
  </Html>
);