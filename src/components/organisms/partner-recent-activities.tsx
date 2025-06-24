"use client";

import { cn } from "@/utils/cn";
import React, { useState } from "react";
import ModalClient from "./modal-client";
import Pessoas from "../atoms/my-icon/elements/pessoas";
import { PartnerSchedule } from "@/services/api/admin";
import RecentActivityCard from "./recent-activity-card";

type PartnerRecentActivitiesProps = {
  recentActivities: PartnerSchedule[];
  hidden?: boolean;
  admin?: boolean;
};

export default function PartnerRecentActivities({
  recentActivities,
  hidden,
  admin,
}: PartnerRecentActivitiesProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <section>
      <div className="mt-6">
        <ModalClient
          open={showModal}
          onClose={() => setShowModal(false)}
          data={recentActivities}
          icon={<Pessoas stroke="#9F9F9F" />}
          title="Lista de Clientes"
          descrition="Confira a lista de clientes para esta atividade:"
          button="Fechar"
        />
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-5",
            admin && "md:grid-cols-2"
          )}
        >
          {recentActivities.map((recentAct, index) => (
            <RecentActivityCard
              key={index}
              index={index}
              recentActivity={recentAct}
              setShowModal={setShowModal}
              hidden={hidden}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
