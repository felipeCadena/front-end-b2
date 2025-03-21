"use client";

import React from "react";
import AdminMobile from "./mobile";
import AdminWeb from "./web";

export default function Admin() {
  return (
    <main>
      <div className="md:hidden">
        <AdminMobile />
      </div>
      <div className="max-sm:hidden">
        <AdminWeb />
      </div>
    </main>
  );
}
