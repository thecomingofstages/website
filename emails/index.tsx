import * as React from "react";

import { Button, Html } from "@react-email/components";

type EmailProps = {
  name: string;
  amount: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Email({ name, amount }: EmailProps) {
  return (
    <Html lang="th">
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
}

// Props for previewing the email
Email.PreviewProps = {
  name: "นายสมชาย รักเรียนดี",
  amount: "1000",
} satisfies EmailProps;
