import Flex from '@/components/Flex';
import Icon from '@/components/FontAwesomeIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input } from '@nextui-org/react';
import { faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { useGetTokenStatus } from '@/api/useAuth/useAuth';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const [canSee, setCanSee] = useState(false);
  const [loginInput, setLoginInput] = useState({
    userName: '',
    password: ''
  });

  const { mutate: loginPage, isPending } = useGetTokenStatus();

  const phoneNumber = '780585979'; // Replace with your phone number
  const message = 'السلام عليكم'; // Your predefined message

  const handleWhatsClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const facebookPageUrl =
    'https://www.facebook.com/profile.php?id=100085433294259'; // Replace with your Facebook page URL

  const handleFaceClick = () => {
    window.open(facebookPageUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Flex
      justifyCenter
      itemsCenter
      style={{
        height: '100vh'
      }}
    >
      <Flex
        flexCol
        justifyCenter
        itemsCenter
        style={{ gap: 12, minWidth: 500 }}
      >
        <Flex style={{ gap: 8 }} flexCol justifyCenter itemsCenter>
          <p
            style={{
              fontSize: 30
            }}
          >
            تسجيل الدخول
          </p>
          <p
            style={{
              fontSize: 20,
              color: '#83818b'
            }}
          >
            من هنا يمكنك تسجيل الدخول الى النظام
          </p>
        </Flex>
        <Flex flexCol style={{ gap: 8, minWidth: 300 }}>
          <Input
            placeholder="اسم المستخدم"
            startContent={<Icon name="user" />}
            onChange={(val) =>
              setLoginInput((prev) => ({ ...prev, userName: val.target.value }))
            }
          />
          <Input
            placeholder="كلمه السر"
            startContent={<Icon name="lock" />}
            type={canSee ? 'text' : 'password'}
            endContent={
              <Icon
                className="cursor-pointer"
                onClick={() => setCanSee(!canSee)}
                name={canSee ? 'eye-slash' : 'eye'}
              />
            }
            onChange={(val) =>
              setLoginInput((prev) => ({ ...prev, password: val.target.value }))
            }
          />
        </Flex>
        <Button
          isDisabled={!loginInput.userName || !loginInput.password}
          isLoading={isPending}
          onClick={() => {
            loginPage(
              {
                username: loginInput.userName,
                password: loginInput.password
              }
              // {
              //   onSuccess: (res) => {
              //     localStorage.setItem('token', res?.token);
              //     window.open('/', '_self');
              //   }
              // }
            );
          }}
        >
          تسجيل الدخول
        </Button>
        <Flex flexCol style={{ gap: 8 }}>
          <p>تواصل معنا</p>
          <Flex style={{ gap: 12 }}>
            <FontAwesomeIcon
              className="cursor-pointer"
              color="green"
              size="2xl"
              icon={faWhatsapp}
              onClick={handleWhatsClick}
            />
            <FontAwesomeIcon
              className="cursor-pointer"
              color="blue"
              size="2xl"
              icon={faFacebook}
              onClick={handleFaceClick}
            />
          </Flex>
        </Flex>
      </Flex>
      <ToastContainer />
    </Flex>
  );
};

export default Login;
