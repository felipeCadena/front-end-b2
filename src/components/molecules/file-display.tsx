import MyIcon from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";


type FileDisplayProps = {
  file: {
    filename: string;
    size?: string;
    link?: string;
  }
  onRemove?: () => void;
};

const FileDisplay = ({ file, onRemove }: FileDisplayProps) => {
  return (
    <div className='flex w-full justify-between items-center gap-2'>
      <div className='flex gap-2 hover:cursor-pointer hover:text-primary-500'
        onClick={() => file.link && window.open(file.link, '_blank')}
      >
        <MyIcon
          name='file'
          variant='circled'
        />
        <div >
          <MyTypography
            variant='body-small'
            className="max-w-[200px] break-words"
            lightness={900}
          >
            {file.filename}
          </MyTypography>
          {file.size && <MyTypography
            variant='caption'
            lightness={500}
            weight='medium'
          >
            {file.size}
          </MyTypography>}
        </div>
      </div>
      {onRemove && <MyIcon
        className='cursor-pointer '
        name='x'
        onClick={onRemove}
      />}
    </div>
  );
};

export default FileDisplay;
