import MyButton from '../atoms/my-button';

type ServiceTypeButtonProps = {
    icon: JSX.Element;
    label: string;
} & React.ComponentProps<typeof MyButton>;

const ServiceTypeButton = ({ icon, label, ...props }: ServiceTypeButtonProps) => (
    <MyButton
        variant='outline'
        borderRadius='squared'
        className='border-primary-200 py-8 text-neutral-800'
        {...props}
    >
        <div className='flex items-center justify-center gap-2'>
            {icon}
            {label}
        </div>
    </MyButton>
);

export default ServiceTypeButton;