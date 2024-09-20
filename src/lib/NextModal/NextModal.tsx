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
  handelOpenChange: () => void;
  children?: JSX.Element;
  title: string;
};

const NextModal: FC<NextModalProps> = (props) => {
  const { isOpen, children, title } = props;

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
              <Button color="primary" onPress={onClose}>
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
