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

export const TeamUpdatedDataEmail = ({
  teamName,
  redirectUrl,
}: {
  teamName: string;
  redirectUrl: string;
}) => (
  <Html>
    <Head />
    <Preview>Csapat hiánypótlása elkészült</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          <b>{teamName}</b> csapat elvégezte a kérvényezett hiánypótlást!
        </Heading>
        <Text style={text}>
          A csapat adatait újra ellenőrizheted a következő hivatkozással:
        </Text>
        <Button style={{ ...btn, padding: "12px 20px" }} href={redirectUrl}>
          Ellenőrzés
        </Button>
      </Container>
    </Body>
  </Html>
);
