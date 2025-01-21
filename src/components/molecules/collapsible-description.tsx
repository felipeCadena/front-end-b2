import MyButton from "../atoms/my-button";
import { CollapsibleTrigger, MyCollapsible, CollapsibleContent } from "../atoms/my-collapsible";

type CollapsibleDescriptionProps = {
  label: string;
  description: React.ReactNode;
  className?: string;
};

export default function CollapsibleDescription({
  label,
  description,
  className
}: CollapsibleDescriptionProps) {
  return (
    <MyCollapsible
      className={className}
    >
      <CollapsibleTrigger asChild>
        <MyButton
          variant='link'
          className='h-6 p-0 text-[0.825rem] font-normal text-neutral-600 hover:text-inherit'
        >
          {label}
        </MyButton>
      </CollapsibleTrigger>
      <CollapsibleContent className='ml-2'>{description}</CollapsibleContent>
    </MyCollapsible>
  );
}
