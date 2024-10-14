// NoOperations.js
import { Button } from '@nextui-org/button';
import { FC } from 'react';

type NothingYetPros = {
  handelOpenNewUser?: () => void;
};

const NothingYet: FC<NothingYetPros> = (props) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px',
      borderRadius: '8px',

      textAlign: 'center'
    },
    icon: {
      fontSize: '48px',
      marginBottom: '16px'
    },
    title: {
      fontSize: '24px',
      margin: '0 0 8px 0',
      color: '#333'
    },
    message: {
      fontSize: '16px',
      marginBottom: '16px',
      color: '#666'
    },
    button: {
      padding: '12px 24px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        borderRadius: '8px',
        textAlign: 'center'
      }}
    >
      <div style={styles.icon}>📋</div>
      <h2 style={styles.title}>لاتوجد بيانات</h2>
      <p style={styles.message}>
        يشتاف ماشي بيانات يالغالي اذا بغيت بتضيف عندك الزر تحت
      </p>
      <Button
        color="primary"
        variant="shadow"
        onClick={props.handelOpenNewUser}
      >
        اضافه مستخدم جديد
      </Button>
    </div>
  );
};

export default NothingYet;
