import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FC } from 'react';

type DrawerDialogDemoProps = {
  isOpen: boolean;
  children: JSX.Element;
  onOpenChange: (v: boolean) => void;
  title: string;
  subTitle: string;
};

const DrawerDialogDemo: FC<DrawerDialogDemoProps> = (props) => {
  const { isOpen, children, title, subTitle } = props;
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog onOpenChange={props.onOpenChange} open={isOpen}>
        <DialogContent className="sm:max-w-[425px] text-center">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{subTitle}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer onOpenChange={props.onOpenChange} open={isOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{subTitle}</DrawerDescription>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerDialogDemo;
