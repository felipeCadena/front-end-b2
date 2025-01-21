import {
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  MyBreadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "../atoms/my-breadcrums";
import MyIcon from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";

type PageHeadingProps = {
  heading: string;
  subheading: string;
  breadcrumb?: { label: string; href: string }[];
  page: string;
};

export default function PageHeading({ heading, subheading, breadcrumb, page }: PageHeadingProps) {
  return (
    <div className='mb-4 flex flex-col'>
      <MyBreadcrumb className='mb-2'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/home'>
              <MyIcon
                name='home'
                className='pb-1 [&>svg]:stroke-neutral-500'
              />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/home'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {breadcrumb &&
            breadcrumb.map((item, index) => (
              <>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{page}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </MyBreadcrumb>
      <div>
        <MyTypography
          as='h6'
          variant='heading6'
          weight='bold'
          lightness={900}
        >
          {heading}
        </MyTypography>
        <MyTypography
          variant='body'
          lightness={700}
        >
          {subheading}
        </MyTypography>
      </div>
    </div>
  );
}
