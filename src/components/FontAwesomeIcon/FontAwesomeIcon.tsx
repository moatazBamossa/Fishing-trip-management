import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconLookup,
  IconName,
  library,
  SizeProp
} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add all icons from the solid library to the library
library.add(fas);

interface IconProps {
  name: IconName; // IconName is provided by FontAwesome types
  size?: SizeProp;
  color?: string;
  [x: string]: unknown;
}

const Icon: FC<IconProps> = ({ name, size, color, ...rest }) => {
  const iconLookup: IconLookup = { prefix: 'fas', iconName: name };

  return (
    <FontAwesomeIcon
      className="cursor-pointer"
      {...rest}
      {...(color && { color: color })}
      {...(size && { size: size })}
      icon={iconLookup}
    />
  );
};

export default Icon;
