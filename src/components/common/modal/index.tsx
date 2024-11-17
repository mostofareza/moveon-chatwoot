import { useWindowDimensions } from "@/hooks/use-window-dimensions";
import * as Dialog from "@radix-ui/react-dialog";
import * as Portal from "@radix-ui/react-portal";
import clsx from "clsx";
import React from "react";

type ModalState = {
  portalRef: any;
  isLargeModal?: boolean;
  isXLargeModal?: boolean;
};

export const ModalContext = React.createContext<ModalState>({
  portalRef: undefined,
  isLargeModal: true,
  isXLargeModal: false,
});

export type ModalProps = {
  isLargeModal?: boolean;
  isXLargeModal?: boolean;
  handleClose: () => void;
  open?: boolean;
  children?: React.ReactNode;
};

type ModalChildProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

type ModalHeaderProps = {
  handleClose: () => void;
  children?: React.ReactNode;
  className?: string;

};

type ModalType = React.FC<ModalProps> & {
  Body: React.FC<ModalChildProps>;
  Header: React.FC<ModalHeaderProps>;
  Footer: React.FC<ModalChildProps>;
  Content: React.FC<ModalChildProps>;
};

const Overlay: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 z-50 grid place-items-center overflow-y-auto bg-black/50">
      {children}
    </Dialog.Overlay>
  );
};

const Content: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { height } = useWindowDimensions();
  const style = {
    maxHeight: height - 64,
  };
  return (
    <Dialog.Content
      style={style}
      className="lg:min-w-modal rounded-rounded bg-grey-0 overflow-x-hidden"
    >
      {children}
    </Dialog.Content>
  );
};

const Modal: ModalType = ({
  open = true,
  handleClose,
  isLargeModal = true,
  isXLargeModal = false,
  children,
}) => {
  const portalRef = React.useRef(null);
  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Portal.Portal ref={portalRef}>
        <ModalContext.Provider
          value={{ portalRef, isLargeModal, isXLargeModal }}
        >
          <Overlay>
            <Content>{children}</Content>
          </Overlay>
        </ModalContext.Provider>
      </Portal.Portal>
    </Dialog.Root>
  );
};

Modal.Body = ({ children, className, style }) => {
  return (
    <div
      style={style}
      className={clsx("inter-base-regular h-full", className)}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

Modal.Content = ({ children, className }) => {
  const { isLargeModal, isXLargeModal } = React.useContext(ModalContext);

  const { height } = useWindowDimensions();
  const style = {
    maxHeight: height - 90 - 141,
  };
  return (
    <div
      style={style}
      className={clsx(
        "overflow-y-auto px-4 lg:px-8 lg:pt-6",
        {
          ["lg:w-xLargeModal lg:pb-7"]: isXLargeModal,
          ["lg:w-largeModal lg:pb-7"]: isLargeModal && !isXLargeModal,
          ["lg:pb-5"]: !isLargeModal && !isXLargeModal,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

Modal.Header = ({ handleClose = undefined, children,className }) => {
  return (
    <div
      className={clx("flex w-full items-center gap-20 px-4 py-6 lg:gap-0 lg:px-6",className)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-grow">{children}</div>
      <div className="self-end">
        {handleClose && (
          <Button
            variant="ghost"
            size="small"
            onClick={handleClose}
            className="cursor-pointer p-1.5 text-black text-opacity-[70%]"
          >
            <CrossIcon size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

Modal.Footer = ({ children, className }) => {
  const { isLargeModal } = React.useContext(ModalContext);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={clsx(
        "bottom-0 flex w-full px-4 py-4 lg:px-7 lg:pb-6",
        {
          "lg:border-grey-20 lg:border-t lg:pt-4": isLargeModal,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Modal;
