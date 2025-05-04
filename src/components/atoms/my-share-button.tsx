'use client';

import React from 'react';
import MyIcon from '../atoms/my-icon';
import { WhatsappShareButton } from 'react-share';

type MyShareButtonProps = {
  url: string;
};

const MyShareButton = ({ url }: MyShareButtonProps) => {
  return (
    <WhatsappShareButton
      url={url}
      title="Olha essa atividade que achei na B2 Adventure:"
    >
      <MyIcon name="compartilhar" className="hidden md:block" />
      <MyIcon name="mobileCompartilhar" className="md:hidden" />
    </WhatsappShareButton>
  );
};

export default MyShareButton;
