import React from "react";
import styled from "styled-components";

// Props for HorizontalMargin and VerticalMargin
interface MarginProps {
  margin: string | number;
}

// Props for Marginer component
interface MarginerProps extends MarginProps {
  direction?: "horizontal" | "vertical";
}

// Styled Components with typed props
const HorizontalMargin = styled.span<MarginProps>`
  display: flex;
  width: ${({ margin }) =>
    typeof margin === "string" ? margin : `${margin}px`};
`;

const VerticalMargin = styled.span<MarginProps>`
  display: flex;
  height: ${({ margin }) =>
    typeof margin === "string" ? margin : `${margin}px`};
`;

// Marginer Component
const Marginer: React.FC<MarginerProps> = ({
  direction = "horizontal",
  ...props
}) => {
  if (direction === "horizontal") return <HorizontalMargin {...props} />;
  return <VerticalMargin {...props} />;
};

// Default Props (optional since we're using destructuring)
Marginer.defaultProps = {
  direction: "horizontal",
};

export { Marginer };
