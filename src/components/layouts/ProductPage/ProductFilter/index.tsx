import { memo } from 'react';

import cn from '~/lib/cn';
import styles from '~/styles/products.module.scss';

type Option = {
  id: number;
  title: string;
  onClick: () => void;
};

type Props = {
  filterOptions: Option[];
  currentChoice: number;
};

const ProductFilter = ({ filterOptions, currentChoice }: Props) => {
  return (
    <div className={cn('mt-10 flex justify-end gap-3', styles.category)}>
      {filterOptions.map((option) => {
        return (
          <button
            key={option.id.toString()}
            className={cn(styles.button, currentChoice === option.id && styles.active)}
            onClick={option.onClick}
          >
            {option.title}
          </button>
        );
      })}
    </div>
  );
};

export default memo(ProductFilter);
