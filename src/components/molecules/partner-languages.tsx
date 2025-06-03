// import React from "react";
// import Select from "react-select";

// const options = [
//   { value: "pt", label: "Português" },
//   { value: "en", label: "English" },
//   { value: "es", label: "Espanhol" },
//   { value: "fr", label: "Françês" },
//   { value: "de", label: "Alemão" },
//   { value: "it", label: "Italiano" },
//   { value: "ja", label: "Japonês" },
//   { value: "zh", label: "Chinês" },
//   { value: "ru", label: "Russo" },
//   { value: "ar", label: "Árabe" },
//   { value: "hi", label: "Hindi" },
//   { value: "ko", label: "Coreano" },
//   { value: "tr", label: "Turco" },
//   { value: "nl", label: "Holandês" },
//   { value: "sv", label: "Sueco" },
//   { value: "no", label: "Norueguês" },
//   { value: "da", label: "Dinamarquês" },
//   { value: "fi", label: "Finlandês" },
//   { value: "pl", label: "Polonês" },
//   { value: "cs", label: "Tcheco" },
//   { value: "hu", label: "Húngaro" },
//   { value: "ro", label: "Romeno" },
//   { value: "bg", label: "Búlgaro" },
//   { value: "el", label: "Grego" },
//   { value: "th", label: "Tailandês" },
//   { value: "vi", label: "Vietnamita" },
//   { value: "id", label: "Indonésio" },
//   { value: "ms", label: "Malaio" },
//   { value: "tl", label: "Tagalo" },
//   { value: "sw", label: "Suaíli" },
//   { value: "he", label: "Hebraico" },
//   { value: "ur", label: "Urdu" },
//   { value: "fa", label: "Persa" },
//   { value: "uk", label: "Ucraniano" },
//   { value: "lt", label: "Lituano" },
//   { value: "lv", label: "Letão" },
//   { value: "et", label: "Estoniano" },
// ];

// type GlobalState = {
//   languages: string[];
//   // outras chaves do estado global...
// };

// type MultiSelectLanguagesProps = {
//   state: GlobalState;
//   setState: (step: number, data: Partial<GlobalState>) => void;

//   step: number;
// };

// export function MultiSelectLanguages({
//   state,
//   setState,
//   step,
// }: MultiSelectLanguagesProps) {
//   // Para mapear do array de strings para o formato do react-select

//   const selectedOptions = options.filter((opt) =>
//     state.languages.includes(opt.value)
//   );

//   const handleChange = (selected: any) => {
//     const newLanguages = selected ? selected.map((opt: any) => opt.value) : [];

//     // chama sua função customizada passando o step e só o dado languages
//     setState(step, { languages: newLanguages });
//   };

//   return (
//     <div className=" z-50">
//       <Select
//         isMulti
//         options={options}
//         value={selectedOptions}
//         onChange={handleChange}
//         placeholder="Selecione as línguas"
//         className="w-full"
//         noOptionsMessage={() => "Nenhuma opção encontrada"}
//         menuPortalTarget={typeof window !== "undefined" ? document.body : null}
//         styles={{
//           menuPortal: (base) => ({ ...base, zIndex: 9999 }),
//         }}
//       />
//     </div>
//   );
// }
