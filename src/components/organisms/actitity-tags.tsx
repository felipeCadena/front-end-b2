import { formatDificultyTag } from "@/utils/formatters";
import React from "react";
import MyTypography from "../atoms/my-typography";

type ActivityTagsProps = {
  isInGroup: boolean;
  isChildrenAllowed: boolean;
  activityDifficulty: number | undefined;
};

const ActivityTags = ({
  isChildrenAllowed,
  isInGroup,
  activityDifficulty,
}: ActivityTagsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
      <div className="bg-gray-200 py-2 rounded-md mb-2 md:h-fit">
        <MyTypography variant="body" weight="bold" className="text-center">
          {isInGroup ? "Atividade em grupo" : "Atividade individual"}
        </MyTypography>
      </div>

      <div className="bg-gray-200 py-2 rounded-md mb-2 md:h-fit">
        <MyTypography variant="body" weight="bold" className="text-center">
          {isChildrenAllowed
            ? "Permitido crianças"
            : "Não é permitido crianças"}
        </MyTypography>
      </div>

      <div className={`bg-gray-200 py-2 rounded-md mb-2 md:h-fit`}>
        <MyTypography variant="body" weight="bold" className="text-center">
          {`Grau de dificuldade: ${activityDifficulty}`}
        </MyTypography>
      </div>
    </div>
  );
};

export default ActivityTags;
