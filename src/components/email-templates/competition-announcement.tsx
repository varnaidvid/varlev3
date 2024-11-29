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
import { btn, container, h1, main, text, h3 } from "./styles";

export const CompetitionAnnouncementEmail = ({
  message,
  competitionName,
  subject,
}: {
  message: string;
  competitionName: string;
  subject: string;
}) => (
  <Html>
    <Head />
    <Preview>Verseny bejelentés!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          A <b>{competitionName}</b> verseny szervezője bejelentést tett!
        </Heading>
        <Text style={h3}>{subject}</Text>
        <Text style={text}>{message}</Text>
      </Container>
    </Body>
  </Html>
);
