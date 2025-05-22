import { formatIconName } from "@/utils/formatters";
import React from "react";
import MyIcon from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";

type ActivityIncludedItemsProps = {
  transportIncluded: boolean;
  picturesIncluded: boolean;
  itemsIncluded: string[];
};

const ActivityIncludedItems = ({
  transportIncluded,
  itemsIncluded,
  picturesIncluded,
}: ActivityIncludedItemsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 mb-4 md:mb-0">
      {transportIncluded && (
        <div className="flex items-center gap-2">
          <MyIcon name="transporte" className="p-2 bg-primary-900 rounded-md" />
          <MyTypography variant="body" weight="bold" className="">
            Transporte
          </MyTypography>
        </div>
      )}

      {picturesIncluded && (
        <div className="flex items-center gap-2">
          <MyIcon name="camera" className="p-2 bg-primary-900 rounded-md" />
          <MyTypography variant="body" weight="bold" className="">
            Fotos
          </MyTypography>
        </div>
      )}

      {itemsIncluded.map(
        (item) =>
          item &&
          item !== "Transporte" &&
          item !== "Fotos" && (
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
