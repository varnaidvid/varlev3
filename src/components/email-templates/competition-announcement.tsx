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

export const CompetitionAnnouncementEmail = ({
  message,
  competitionName,
}: {
  message: string;
  competitionName: string;
}) => (
  <Html>
    <Head />
    <Preview>Verseny bejelentés!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          A <b>{competitionName}</b> verseny szervezője bejelentést tett!
        </Heading>
        <Text style={text}>{message}</Text>
      </Container>
    </Body>
  </Html>
);
