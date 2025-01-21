import { cn } from "@/utils/cn";
import Atividades from "./elements/atividades";
import QuemSomos from "./elements/quem-somos";
import Parceiros from "./elements/parceiros";
import Logar from "./elements/logar";
import Home from "./elements/home";
import CloseMenu from "./elements/close-menu";
import OpenMenu from "./elements/open-menu";
import World from "./elements/world";
import Google from "./elements/google";
import Facebook from "./elements/facebook";
import Voltar from "./elements/voltar";
import Eye from "./elements/eye";
import Hide from "./elements/hide";
import Search from "./elements/search";
import Ar from "./elements/ar";
import Terra from "./elements/terra";
import Mar from "./elements/mar";
import Star from "./elements/star";
import EmptyStar from "./elements/star-empty";
import Pessoas from "./elements/pessoas";
import Time from "./elements/time";
import DateIcon from "./elements/date";
import Localizacao from "./elements/localizacao";
import ChevronLeft from "./elements/chevron-left";
import ChevronRight from "./elements/chevron-right";
import Sum from "./elements/sum";
import Decrease from "./elements/decrease";
import DecreaseEmpty from "./elements/decrease-empty";
import Save from "./elements/save";
import Email from "./elements/email";
import FacebookGray from "./elements/facebook-gray";
import Instagram from "./elements/instagram";
import Linkedin from "./elements/linkedin";
import Messenger from "./elements/messenger";
import Youtube from "./elements/youtube";
import LocationRounded from "./elements/location-rounded";
import MapPin from "./elements/map-pin";
import X from "./elements/x";
import ChevronDown from "./elements/down";
import File from "./elements/file";

export type IconsMapTypes = keyof typeof IconsMap;

type MyIconProps = {
  name: IconsMapTypes;
  variant?: "circled";
} & React.HTMLAttributes<HTMLDivElement>;

const IconsMap = {
  atividades: <Atividades />,
  quemSomos: <QuemSomos />,
  parceiros: <Parceiros />,
  logar: <Logar />,
  home: <Home />,
  close: <CloseMenu />,
  open: <OpenMenu />,
  world: <World />,
  google: <Google />,
  facebook: <Facebook />,
  voltar: <Voltar />,
  eye: <Eye />,
  hide: <Hide />,
  search: <Search />,
  ar: <Ar />,
  terra: <Terra />,
  mar: <Mar />,
  star: <Star />,
  emptyStar: <EmptyStar />,
  pessoas: <Pessoas />,
  time: <Time />,
  date: <DateIcon />,
  localizacao: <Localizacao />,
  localizacaoRedonda: <LocationRounded />,
  left: <ChevronLeft />,
  right: <ChevronRight />,
  soma: <Sum />,
  subtracao: <Decrease />,
  subtracaoDesativada: <DecreaseEmpty />,
  save: <Save />,
  email: <Email />,
  linkedin: <Linkedin />,
  instagram: <Instagram />,
  messenger: <Messenger />,
  youtube: <Youtube />,
  facebookGray: <FacebookGray />,
  pin: <MapPin />,
  x: <X />,
  "chevron-down": <ChevronDown />,
  file: <File />
};


export default function MyIcon({ name, variant, className, ...props }: MyIconProps) {
  return (
    <div
      {...props}
      className={cn(
        variant === "circled" &&
        "flex h-9 w-9 items-center justify-center rounded-full",
        className,
      )}
    >
      {IconsMap[name]}
    </div>
  );
}
