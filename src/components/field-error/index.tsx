import React from "react";
import { AnimatePresence, Paragraph } from "tamagui";

type FieldErrorProps = {
  /**
   * error will be hidden if undefined
   */
  message?: string;
};

export default function FieldError({ message }: FieldErrorProps) {
  return (
    <AnimatePresence>
      {!!message && (
        <Paragraph
          key="error"
          animation="quick"
          mt="$2"
          theme="alt2"
          enterStyle={{
            scaleY: 0.2,
            opacity: 0,
            y: -4,
          }}
          exitStyle={{
            opacity: 0,
            scaleY: 0,
            y: -4,
          }}
          opacity={1}
          y={0}
          scaleY={1}
        >
          {message}
        </Paragraph>
      )}
    </AnimatePresence>
  );
}
