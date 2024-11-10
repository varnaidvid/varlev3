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
  message,
}: {
  teamName: string;
  competitionName: string;
  redirectUrl: string;
  message: string;
}) => (
  <Html>
    <Head />
    <Preview>Pótold a hiányosságokat csapatod jelentkezésében</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          <b>{teamName}</b> jelentkezésének kiegészítésére kért a(z){" "}
          <b>{competitionName}</b> szervezője!
        </Heading>
        <Text style={text}>
          A versenyre való felkészüléshez kérjük, hogy a csapatod adatait
          ellenőrizd.
        </Text>
        <Text style={text}>`{message}`</Text>
        <Button style={{ ...btn, padding: "12px 20px" }} href={redirectUrl}>
          Ellenőrzés
        </Button>
      </Container>
    </Body>
  </Html>
);
