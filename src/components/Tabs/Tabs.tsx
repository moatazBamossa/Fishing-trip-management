import { TabsIdT } from '@/lib/InterFace/helper';
import { Tabs, Tab } from '@nextui-org/react';
import { FC } from 'react';

type TabComponentProp = {
  tabs: { id: string; label: string }[];
  handelChangeTab: (id: TabsIdT) => void;
};

const TabComponent: FC<TabComponentProp> = (props) => {
  const { tabs } = props;

  const handleTabChange = (key: string | number) => {
    props.handelChangeTab(key as TabsIdT);
  };

  return (
    <div className="flex w-full flex-col justify-end">
      <Tabs
        onSelectionChange={handleTabChange}
        className="justify-center"
        aria-label="Dynamic tabs"
        items={tabs}
      >
        {(item) => <Tab key={item.id} title={item.label} />}
      </Tabs>
    </div>
  );
};
export default TabComponent;
