"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import MyTypography from "../atoms/my-typography";

export default function RichTextEditor({ value, setValue }: { value: string, setValue: (value: string) => void }) {

  return (
    <div className='flex w-full flex-col gap-1'>
      <MyTypography
        as='label'
        className='ml-4 text-base font-normal text-neutral-800'
      >
        Informações gerais
      </MyTypography>
      <ReactQuill
        theme='snow'
        value={value}
        onChange={setValue}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }],
            [{ size: [] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link"],
            [{ script: "sub" }, { script: "super" }],
            [{ color: [] }, { background: [] }],
          ],
        }}
        className='h-96 w-full pb-16'
        placeholder='Descreve com detalhes sobre o projeto'
      />
    </div>
  );
}
