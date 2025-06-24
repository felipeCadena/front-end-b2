import { useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  MyDialog,
} from "../molecules/my-dialog";
import MyIcon from "../atoms/my-icon";
import { getData, getHora } from "@/utils/formatters";
import X from "../atoms/my-icon/elements/x";
import MyTypography from "../atoms/my-typography";
import MyButton from "../atoms/my-button";

type CartItem = {
  adventure: {
    title: string;
  };
  purchaseId: string;
  schedule: {
    scheduleDate: string | Date;
    scheduleTime: string;
  };
};

type Props = {
  cart: CartItem[];
};

export default function CartConflictCheckerWithModal({ cart }: any) {
  const [open, setOpen] = useState(false);
  const [conflictingSlots, setConflictingSlots] = useState<
    Record<string, CartItem[]>
  >({});

  useEffect(() => {
    const map = new Map<string, CartItem[]>();

    for (const item of cart) {
      const date = new Date(item.schedule.scheduleDate)
        .toISOString()
        .split("T")[0]; // YYYY-MM-DD
      const time = item.schedule.scheduleTime;
      const key = `${date} ${time}`;

      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key)!.push(item);
    }

    const conflicts: Record<string, CartItem[]> = {};

    for (const [key, items] of map.entries()) {
      if (items.length > 1) {
        conflicts[key] = items;
      }
    }

    if (Object.keys(conflicts).length > 0) {
      setConflictingSlots(conflicts);
      setOpen(true);
    } else {
      setOpen(false);
      setConflictingSlots({});
    }
  }, [cart]);

  const handleClose = () => setOpen(false);

  return (
    <MyDialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[90%] md:max-w-sm rounded-2xl py-12 md:px-6 text-center">
        <MyIcon
          name="x"
          className="absolute top-4 right-4 cursor-pointer"
          onClick={handleClose}
        />
        <DialogHeader className="flex items-center gap-4">
          <MyIcon name="warning" />

          <DialogTitle className="text-lg md:text-xl font-bold">
            ATENÇÃO
          </DialogTitle>
          <DialogDescription className="text-base md:text-lg">
            <MyTypography
              variant="subtitle4"
              lightness={500}
              className="md:w-11/12 md:mx-auto"
            >
              Você adicionou duas ou mais atividades no mesmo horário. Isso pode
              causar problemas na sua programação.
            </MyTypography>
          </DialogDescription>
        </DialogHeader>

        <div className="text-base space-y-2 flex items-start flex-col mt-2">
          {Object.entries(conflictingSlots).map(([key, items]) => (
            <div key={key} className="px-4">
              <p className="font-semibold flex justify-start">{`Data: ${getData(key)} às ${getHora(key)}`}</p>
              <ul className="list-disc list-inside space-y-2 mt-2 flex items-start flex-col">
                {items.map((item, index) => (
                  <li key={index}>{item.adventure.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <MyButton
          variant="black-border"
          borderRadius="squared"
          size="lg"
          className="mt-4 w-11/12 mx-auto font-bold"
          onClick={handleClose}
        >
          Ok
        </MyButton>
      </DialogContent>
    </MyDialog>
  );
}
