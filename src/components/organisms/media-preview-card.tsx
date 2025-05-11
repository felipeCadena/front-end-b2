import { Media } from '@/services/api/schedules';
import React from 'react';
import MyIcon from '../atoms/my-icon';
import Image from 'next/image';

type MediaPreviewCardType = {
  media: Media;
  handleDownloadMedia: (imageURL: string, fileTitle: string) => Promise<void>;
};

const MediaPreviewCard = ({
  media,
  handleDownloadMedia,
}: MediaPreviewCardType) => {
  return (
    <div className="relative group">
      {media?.mimetype.includes('image') ? (
        <Image
          src={media?.url}
          quality={40}
          alt={media?.title ?? 'Foto da atividade'}
          width={300}
          height={300}
          className="h-[168px] w-[168px] rounded-lg object-cover"
        />
      ) : (
        <video
          src={media?.url}
          className="h-[168px] w-[168px] rounded-lg object-cover"
          controls
        />
      )}

      <MyIcon
        name="download-green"
        className="absolute top-2 right-2 bg-white p-2 rounded-lg  group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        onClick={() => handleDownloadMedia(media.url, media?.title ?? '')}
      />
    </div>
  );
};

export default MediaPreviewCard;
