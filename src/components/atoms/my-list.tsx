import { cn } from '@/utils/cn';

type MyListProps = {
  items: string[];
  bulletElement?: React.ReactNode;
  className?: string;
};

export default function MyList({ items, bulletElement, className }: MyListProps) {
  return (
    <ul className={cn('flex flex-col gap-2 ', !bulletElement && 'list-disc', className)}>
      {items.map((item, index) => (
        <li key={index}>
          {bulletElement ? (
            <div className='flex items-baseline gap-2'>
              <span>{bulletElement}</span>
              {item}
            </div>
          ) : (
            <div>{item}</div>
          )}
        </li>
      ))}
    </ul>
  );
}
