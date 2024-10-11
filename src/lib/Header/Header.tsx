import Flex from '@/components/Flex';
import Icon from '@/components/FontAwesomeIcon';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, Input, User } from '@nextui-org/react';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { useCalculationStore } from '../storge/createCalcuateSlice';
import Taxes from '../Taxes';

type CompanyDataT = {
  company_name: string;
  company_logo: string;
  company_description: string;
  id: string;
};

type HeaderProps = {
  isSearch: boolean;
  isBack?: boolean;
  onSearching: (v: string) => void;
  handelClickSearch: () => void;
  primaryButton: {
    label: string;
    onClick: () => void;
  };
};

const data = sessionStorage.getItem('responseData');
const companyData: CompanyDataT = data && JSON.parse(data);

const Header: FC<HeaderProps> = (props) => {
  const { isSearch, primaryButton, isBack } = props;
  const navigate = useNavigate();
  const { setOpenNextDrawer } = useCalculationStore();
  const isDesktop = useMediaQuery('(min-width: 850px)');

  return (
    <Flex flexCol className="gap-2">
      <Flex flexCol>
        <Flex
          className="p-4"
          justifyBetween
          style={{
            borderRadius: 12,
            boxShadow: 'rgb(145 145 224 / 40%) 0px 2px 14px'
          }}
        >
          <Flex flexCol className="gap-3">
            {isBack && (
              <Flex
                style={{
                  fontSize: 12
                }}
                justifyCenter
                itemsCenter
                className="gap-2 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <Icon name="arrow-right" />
                الرجوع الى الخلف
              </Flex>
            )}
            <User
              name={companyData.company_name}
              description={companyData.company_description}
              avatarProps={{
                src: companyData.company_logo
              }}
            />
          </Flex>

          {isDesktop && (
            <Input
              label="البحث"
              placeholder="يمكنك البحث على الاسم"
              className="max-w-lg"
              onChange={(v) => props.onSearching(v.target.value)}
            />
          )}
          <Flex flexCol className="gap-3">
            <Button onClick={primaryButton.onClick} size="sm">
              {primaryButton.label}
            </Button>
            <Button onClick={() => setOpenNextDrawer('taxes')} size="sm">
              اعاده تعيين ارقام الضرائب
            </Button>
            {!isDesktop && (
              <Button
                onClick={props.handelClickSearch}
                startContent={<Icon name="search" />}
                size="sm"
              >
                البحث
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
      {isSearch && !isDesktop && (
        <Flex justifyCenter>
          <Input
            placeholder="يمكنك البحث على الاسم"
            startContent={<Icon name="search" />}
            className="max-w-xl"
            color="primary"
            style={{
              textAlign: 'center'
            }}
            onChange={(v) => props.onSearching(v.target.value)}
          />
        </Flex>
      )}
      <Taxes />
    </Flex>
  );
};

export default Header;
