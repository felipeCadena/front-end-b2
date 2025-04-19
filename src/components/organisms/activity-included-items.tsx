import { formatIconName } from '@/utils/formatters';
import React from 'react';
import MyIcon from '../atoms/my-icon';
import MyTypography from '../atoms/my-typography';

type ActivityIncludedItemsProps = {
  transportIncluded: boolean;
  itemsIncluded: string[];
};

const ActivityIncludedItems = ({
  transportIncluded,
  itemsIncluded,
}: ActivityIncludedItemsProps) => {
  console.log(
    formatIconName(itemsIncluded[0]),
    formatIconName(itemsIncluded[1]),
    formatIconName(itemsIncluded[2])
  );
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 mb-4 md:mb-0">
      {transportIncluded && (
        <div className="flex items-center gap-2">
          <MyIcon name="transporte" className="p-2 bg-primary-900 rounded-md" />
          <MyTypography variant="body" weight="bold" className="">
            Transporte
          </MyTypography>
        </div>
      )}

      {itemsIncluded.map(
        (item) =>
          item &&
          item !== 'Transporte' && (
            <div key={item} className="flex items-center gap-2">
              <MyIcon
                name={formatIconName(item) as any}
                className="p-2 bg-primary-900 rounded-md"
              />
              <MyTypography variant="body" weight="bold">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </MyTypography>
            </div>
          )
      )}
    </div>
  );
};

export default ActivityIncludedItems;
