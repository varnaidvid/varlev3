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
import { redirect } from "next/dist/server/api-utils";

export const TeamApprovedBySchoolEmail = ({
  teamName,
  competitionName,
}: {
  teamName: string;
  competitionName: string;
}) => (
  <Html>
    <Head />
    <Preview>Csapatod elfogadva az iskola által</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          <b>{teamName}</b> csapatodat elfogadta az iskolád a{" "}
          <b>{competitionName}</b> versenyre!
        </Heading>
        <Text style={text}>
          A verseny szervezőjének jóváhagyásáról további értesítést küldünk.
        </Text>
      </Container>
    </Body>
  </Html>
);

export const TeamApprovedBySchoolForOrganizerEmail = ({
  teamName,
  competitionName,
  redirectTo,
}: {
  teamName: string;
  competitionName: string;
  redirectTo: string;
}) => (
  <Html>
    <Head />
    <Preview>{teamName} csapat jelentkezése várja jóváhagyásod</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          Jóváhagyták a <b>{teamName}</b> csapat jelentkezését a{" "}
          <b>{competitionName}</b> versenyre!
        </Heading>
        <Text style={text}>
          További megerősítéshez látogass el a következő linkre:
        </Text>
        <Button style={{ ...btn, padding: "12px 20px" }} href={redirectTo}>
          Jóváhagyás
        </Button>
      </Container>
    </Body>
  </Html>
);
