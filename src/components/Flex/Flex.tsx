import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  RefObject,
  memo
} from 'react';
import styles from './Flex.module.css';
import clsx from 'clsx';

export type FlexProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode | JSX.Element;
  justifyBetween?: boolean;
  flexRow?: boolean;
  flexRowReverse?: boolean;
  flexCol?: boolean;
  flexColReverse?: boolean;
  flexNoWrap?: boolean;
  flexWrapReverse?: boolean;
  flexWrap?: boolean;
  justifyStart?: boolean;
  justifyEnd?: boolean;
  justifyCenter?: boolean;
  justifyAround?: boolean;
  justifyEvenly?: boolean;
  justifyItemsStart?: boolean;
  justifyItemsEnd?: boolean;
  justifyItemsCenter?: boolean;
  justifyItemsStretch?: boolean;
  contentCenter?: boolean;
  contentStart?: boolean;
  contentEnd?: boolean;
  contentBetween?: boolean;
  contentAround?: boolean;
  contentEvenly?: boolean;
  itemsStart?: boolean;
  itemsEnd?: boolean;
  itemsCenter?: boolean;
  itemsBaseline?: boolean;
  itemsStretch?: boolean;
  className?: string;
  ref?: RefObject<HTMLDivElement> | null;
};

const Flex = ({
  children,
  justifyBetween,
  flexRow,
  flexRowReverse,
  flexCol,
  flexColReverse,
  flexNoWrap,
  flexWrapReverse,
  flexWrap,
  justifyStart,
  justifyEnd,
  justifyCenter,
  justifyAround,
  justifyEvenly,
  justifyItemsStart,
  justifyItemsEnd,
  justifyItemsCenter,
  justifyItemsStretch,
  contentCenter,
  contentStart,
  contentEnd,
  contentBetween,
  contentAround,
  contentEvenly,
  itemsStart,
  itemsEnd,
  itemsCenter,
  itemsBaseline,
  itemsStretch,
  className,
  ...rest
}: FlexProps): JSX.Element => {
  return (
    <div
      className={clsx(
        styles.flex,
        // direction
        flexRow && styles.flexRow,
        flexRowReverse && styles.flexRowReverse,
        flexCol && styles.flexCol,
        flexColReverse && styles.flexColReverse,
        // wrap
        flexNoWrap && styles.flexNoWrap,
        flexWrapReverse && styles.flexWrapReverse,
        flexWrap && styles.flexWrap,
        // justify-content
        justifyStart && styles.justifyStart,
        justifyEnd && styles.justifyEnd,
        justifyCenter && styles.justifyCenter,
        justifyBetween && styles.justifyBetween,
        justifyAround && styles.justifyAround,
        justifyEvenly && styles.justifyEvenly,
        // justify-items
        justifyItemsStart && styles.justifyItemsStart,
        justifyItemsEnd && styles.justifyItemsEnd,
        justifyItemsCenter && styles.justifyItemsCenter,
        justifyItemsStretch && styles.justifyItemsStretch,
        // align-content
        contentCenter && styles.contentCenter,
        contentStart && styles.contentStart,
        contentEnd && styles.contentEnd,
        contentBetween && styles.contentBetween,
        contentAround && styles.contentAround,
        contentEvenly && styles.contentEvenly,
        // align-items
        itemsStart && styles.itemsStart,
        itemsEnd && styles.itemsEnd,
        itemsCenter && styles.itemsCenter,
        itemsBaseline && styles.itemsBaseline,
        itemsStretch && styles.itemsStretch,
        // other
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default memo(Flex);
