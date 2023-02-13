import React, { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

export interface PropsModalContainer {
  visibleModal: boolean;
  onClick: () => void;
  color?: string;
}

export interface PropsModal {
  children: React.ReactNode;
  visibleModal: boolean;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  color?: string;
}

const Modal: FC<PropsModal> = ({
  children,
  visibleModal,
  setVisibleModal,
  color,
}) => {
  return (
    <ModalContainer
      color={color}
      visibleModal={visibleModal}
      onClick={() => setVisibleModal(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div<PropsModalContainer>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: ${(p) => p.color};
  display: ${(p) => (p.visibleModal ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  position: relative;
  margin: 15px;
  padding: 15px;
  background: #808080;
  border-radius: 10px;
  min-width: 250px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default Modal;
