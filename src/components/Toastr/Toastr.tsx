import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toastr = {
  success: (message: string, onClose?: () => void) => {
    toast(message, {
      type: 'success',
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      onClose // If provided, execute the onClose callback after the toast is closed
    });
  },
  error: (message: string) => {
    toast(message, {
      type: 'error',
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    });
  },
  info: (message: string) => {
    toast(message, {
      type: 'info',
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    });
  }
};
