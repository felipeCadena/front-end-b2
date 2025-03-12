"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { cn } from "@/utils/cn";
import MyTextInput from "@/components/atoms/my-text-input";

const formSteps = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  fields: [
    {
      name: `campo${index + 1}`,
      label: `Campo ${index + 1}`,
      type: "text",
      required: true,
    },
  ],
}));

export default function FormCarousel() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const visibleForms = formSteps.slice(currentStep, currentStep + 3);

  const onSubmitStep = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep + 3 < formSteps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Formulário completo!", { ...formData, ...data });
    }
    reset();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: `${-currentStep * (100 / 3)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {formSteps.map((step) => (
            <div key={step.id} className="w-[calc(40%-1rem)] flex-shrink-0">
              <form
                onSubmit={handleSubmit(onSubmitStep)}
                className="bg-white rounded-lg p-6 shadow-md h-full border border-gray-200"
              >
                <div className="text-right text-sm text-gray-500 mb-4">
                  {step.id} de {formSteps.length}
                </div>
                {step.fields.map((field) => (
                  <div key={field.name} className="space-y-2 mb-4">
                    <MyTextInput
                      label={field.label}
                      type={field.type}
                      //   error={errors[field.name]?.message as string}
                      {...register(field.name, {
                        required: "Campo obrigatório",
                      })}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  {step.id === formSteps.length ? "Finalizar" : "Próximo"}
                </button>
              </form>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(formSteps.length / 3) }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              Math.floor(currentStep / 3) === i ? "bg-blue-500" : "bg-gray-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}
