import { FC } from 'react';
import { Button } from '../ui/button';

type ContainerProps = {
  title: string;
  children: JSX.Element;
  disabled: boolean;
  disabledButton?: boolean;
  onSave: () => void;
  onPrevious: () => void;
};
const Container: FC<ContainerProps> = (props) => {
  const { title, children, disabled, disabledButton } = props;

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        opacity: disabled ? 0.5 : 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}
    >
      <h2>{title}</h2>

      <div style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
        {children}
      </div>

      <div
        style={{
          display: 'flex',
          justifyItems: 'center',
          justifyContent: 'center',
          gap: 12
        }}
      >
        <Button disabled={disabled || disabledButton} onClick={props.onSave}>
          حفظ
        </Button>
        <Button disabled={disabled} onClick={props.onPrevious}>
          العوده
        </Button>
      </div>
    </div>
  );
};

export default Container;
