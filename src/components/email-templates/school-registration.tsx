import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";
import { container, h1, main, text, btn } from "./styles";

export const SchoolRegistrationEmail = ({
  organizerName,
  schoolName,
  username,
  password,
  redirectUrl,
}: {
  organizerName: string;
  schoolName: string;
  username: string;
  password: string;
  redirectUrl: string;
}) => (
  <Html>
    <Head />
    <Preview>{organizerName} beregisztrálta az iskoládat</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {organizerName} beregisztrálta az iskoládat és téged állított be
          kapcsolatfenntartónak.
        </Heading>
        <Text style={text}>
          Az iskolád neve: <b>{schoolName}</b>
        </Text>
        <Text style={text}>
          Felhasználóneved: <b>{username}</b>
        </Text>
        <Text style={text}>
          Jelszavad: <b>{password}</b>
        </Text>
        <Hr />
        <Text style={text}>Az alábbi lépéseket kell követned:</Text>
        <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
          <li style={{ marginBottom: "8px" }}>
            Lépj be a rendszerbe a fenti felhasználónévvel és jelszóval.
          </li>
          <li style={{ marginBottom: "8px", textDecoration: "line-through" }}>
            Változtasd meg a jelszavad az első bejelentkezés után.
          </li>
          <li style={{ marginBottom: "8px" }}>
            Ellenőrizd az iskolád adatait és szükség esetén módosítsd azokat.
          </li>
        </ul>
        <Button style={{ ...btn, padding: "12px 20px" }} href={redirectUrl}>
          Belépés a rendszerbe
        </Button>
      </Container>
    </Body>
  </Html>
);
