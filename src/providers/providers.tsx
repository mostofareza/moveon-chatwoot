import { PropsWithChildren } from "react";
import { HelmetProvider } from "react-helmet-async";
import { LayeredModalProvider } from "../components/molecules/modal/layered-modal";
import { SteppedProvider } from "../components/molecules/modal/stepped-modal";
import { MVNAgentProvider } from "./mvn-agent-provider";

/**
 * This component wraps all providers into a single component.
 */
export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <HelmetProvider>
      <MVNAgentProvider>
        <SteppedProvider>
          <LayeredModalProvider>{children}</LayeredModalProvider>
        </SteppedProvider>
      </MVNAgentProvider>
    </HelmetProvider>
  );
};
