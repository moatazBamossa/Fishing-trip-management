import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react';
import { FC } from 'react';

type NextModalProps = {
  isOpen: boolean;
  disabled?: boolean;
  handelOpenChange: () => void;
  children?: JSX.Element;
  title: string;
  onClick?: () => void;
};

const NextModal: FC<NextModalProps> = (props) => {
  const { isOpen, children, title, disabled } = props;

  return (
    <Modal
      hideCloseButton
      style={{ direction: 'rtl' }}
      isOpen={isOpen}
      onOpenChange={props.handelOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                اغلاق
              </Button>
              <Button
                isDisabled={disabled}
                color="primary"
                onPress={props.onClick || onClose}
              >
                اضافه
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NextModal;
