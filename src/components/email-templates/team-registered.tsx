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
import { container, h1, main, text, btn } from "./styles";

export const TeamRegisteredEmail = ({
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
    <Preview>Új csapat regisztrált a versenyre</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          Regisztrált egy csapat a <b>{competitionName}</b> versenyre!
        </Heading>
        <Text style={text}>
          A <b>{teamName}</b> csapat regisztrált a <b>{competitionName}</b>{" "}
          versenyre. A jóváhagyásod szükséges a jelentkezésük megerősítéséhez.
        </Text>
        <Button style={{ ...btn, padding: "12px 20px" }} href={redirectUrl}>
          Jóváhagyás
        </Button>
      </Container>
    </Body>
  </Html>
);
