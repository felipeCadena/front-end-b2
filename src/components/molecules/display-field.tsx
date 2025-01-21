import MyTypography from "../atoms/my-typography";

const DisplayField = ({ field, value, hidden }: { field: string; value: string, hidden?: boolean }) => {
  return (
    <>
      {!hidden && <div>
        <MyTypography
          variant='body-small'
          weight='medium'
          lightness={600}
        >
          {field}:
        </MyTypography>
        <MyTypography weight='medium'>{value}</MyTypography>
      </div>}
    </>
  );
};

export default DisplayField;
