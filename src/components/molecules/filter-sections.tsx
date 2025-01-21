import MyTypography from '../atoms/my-typography';

const FilterSections = ({ heading, children }: { heading: string; children: React.ReactNode }) => {
    return (
        <div>
            <MyTypography
                as='h5'
                variant='body-big'
                weight='medium'
                lightness={800}
                className='mb-3'
            >
                {heading}
            </MyTypography>
            {children}
        </div>
    );
};

export default FilterSections;