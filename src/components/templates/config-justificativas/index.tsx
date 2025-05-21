import React from "react";
import MyTypography from "@/components/atoms/my-typography";
import MyIcon from "@/components/atoms/my-icon";
import { useRouter } from "next/navigation";
import ChevronDown from "@/components/atoms/my-icon/elements/down";
import MyTextarea from "@/components/atoms/my-textarea";
import MyButton from "@/components/atoms/my-button";
import { adminService } from "@/services/api/admin";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function JustificativasTemplate() {
  const [selectedJustificativa, setSelectedJustificativa] =
    React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const queryClient = useQueryClient();

  const { data: configs, isLoading } = useQuery({
    queryKey: ["configs"],
    queryFn: () => adminService.listConfig({ type: "justificativa" }),
  });

  const createJustificativa = async (justificativa: string, index: number) => {
    setLoading(true);
    try {
      await adminService.createConfig({
        type: "justificativa",
        name: `${justificativa}${index}`,
        text: justificativa,
        localInsert: "justificativa",
      });

      setSelectedJustificativa("");
      queryClient.invalidateQueries({ queryKey: ["configs"] });
      toast.success("Justificativa criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar justificativa");
      console.error("Error creating justificativa:", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteJustificativa = async (id: string) => {
    try {
      await adminService.deleteConfig(id);
      queryClient.invalidateQueries({ queryKey: ["configs"] });
      toast.success("Justificativa deletada com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar justificativa");
      console.error("Error deleting justificativa:", error);
    }
  };

  const justificativas = [
    "Houve um imprevisto e irei precisar cancelar nossa atividade, desculpe!",
    "Condições climáticas desfavoráveis para a realização da atividade.",
    "Problemas técnicos com equipamentos necessários.",
    "Número insuficiente de participantes.",
    "Motivos de força maior/emergência.",
  ];
  return (
    <section className="mt-4 space-y-12 mb-4">
      <div>
        <div className="flex gap-2 items-center">
          <ChevronDown
            fill="#000"
            width="24"
            height="24"
            className="-rotate-90"
          />
          <MyTypography variant="subtitle3" weight="bold" className="">
            Justificativa de cancelamento
          </MyTypography>
        </div>

        <MyTextarea
          rows={5}
          placeholder="Digite uma justificativa"
          className="mt-1"
          onChange={(e) => setSelectedJustificativa(e.target.value)}
          // value={selectedJustificativa}
        />

        <MyButton
          borderRadius="squared"
          size="lg"
          variant="default"
          className="mt-6 w-full"
          isLoading={loading}
          disabled={!selectedJustificativa}
          onClick={() =>
            createJustificativa(selectedJustificativa, configs?.length)
          }
        >
          Salvar
        </MyButton>
      </div>

      <div className="space-y-4">
        <MyTypography variant="subtitle2" weight="bold" className="">
          Justificativa cadastradas
        </MyTypography>
        <div className="space-y-3 relative">
          {configs &&
            configs.map((justificativa: any, index: number) => (
              <div
                key={index}
                className={`flex justify-between items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all border-l-8 ${
                  selectedJustificativa === justificativa?.text
                    ? "border-black bg-gray-50"
                    : "border-gray-200 bg-gray-50 opacity-80"
                }`}
                onClick={() => setSelectedJustificativa(justificativa?.text)}
              >
                <MyTypography variant="body-big">
                  {justificativa?.text}
                </MyTypography>
                <MyIcon
                  name="trash"
                  onClick={() => deleteJustificativa(justificativa?.id)}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
