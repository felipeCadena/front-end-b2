"use client";
import React from "react";
import StepperComponent from "./stepper";
import WebForm from "./web-form";

export default function CadastroAtividade() {
  return (
    <section className="md:mx-8">
      <div className="md:hidden">
        <StepperComponent />
      </div>
      <div className="hidden md:block">
        <WebForm />
      </div>
    </section>
  );
}
