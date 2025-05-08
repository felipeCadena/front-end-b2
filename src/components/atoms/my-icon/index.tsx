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
import ChevronDown from "./elements/down";
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
import File from "./elements/file";
import FullHeart from "./elements/full-heart";
import ShoppingCard from "./elements/shopping-card";
import BlackHeart from "./elements/black-heart";
import VoltarBlack from "./elements/voltar-black";
import Transporte from "./elements/transporte";
import Fotografia from "./elements/fotografia";
import Agua from "./elements/agua";
import Combustivel from "./elements/combustivel";
import Alimentacao from "./elements/alimentacao";
import Guia from "./elements/guia";
import MobileDuracao from "./elements/mobile-duracao";
import Duracao from "./elements/duracao";
import Compartilhar from "./elements/compartilhar";
import MobileCompartilhar from "./elements/mobile-compartilhar";
import SetaDireita from "./elements/seta-direita";
import Perfil from "./elements/perfil";
import Notificacoes from "./elements/notificacoes";
import Chat from "./elements/chat";
import Favoritos from "./elements/favoritos";
import Reservas from "./elements/reservas";
import Carrinho from "./elements/carrinhos";
import Sair from "./elements/sair";
import User from "./elements/user";
import Calendar from "./elements/calendar";
import Options from "./elements/options";
import OpacityCalendar from "./elements/options-opacity";
import BigStar from "./elements/big-star";
import BigStarEmpty from "./elements/big-star-empty";
import Pix from "./elements/pix";
import Card from "./elements/card";
import Boleto from "./elements/boleto";
import Master from "./elements/master";
import Now from "./elements/now";
import Read from "./elements/read";
import Unread from "./elements/unread";
import LocalizacaoBranca from "./elements/localizacao-branca";
import Seta from "./elements/seta";
import ScrollMouse from "./elements/scroll-mouse";
import Sucess from "./elements/sucess";
import Cancel from "./elements/cancel";
import ChatWeb from "./elements/chat-web";
import Clock from "./elements/clock";
import Message from "./elements/message";
import Download from "./elements/download";
import ChevronDownGreen from "./elements/chevron-down-green";
import DownloadGreen from "./elements/download-green";
import XRed from "./elements/x-red";
import Add from "./elements/add";
import SharedMuted from "./elements/shared-muted";
import Camera from "./elements/camera";
import WhiteEye from "./elements/eye-white";
import Check from "./elements/check";
import Upload from "./elements/upload";
import NoBaby from "./elements/no-baby";
import Baby from "./elements/baby";
import Group from "./elements/group";
import Person from "./elements/person";
import Dollar from "./elements/dollar";
import SmallGroup from "./elements/small-group";
import Success from "./elements/success";
import Pie from "./elements/pie";
import Video from "./elements/video";
import Plus from "./elements/plus";
import Contract from "./elements/contract";
import Connections from "./elements/connection";
import LoudsSpeaker from "./elements/loudspeaker";
import Hiking from "./elements/hiking";
import Lock from "./elements/lock";
import Trash from "./elements/trash";
import Edit from "./elements/edit";
import SmallCancel from "./elements/small-cancel";
import Duplicate from "./elements/duplicate";
import DobleCheck from "./elements/doble-check";
import Warning from "./elements/warning";
import BasicStar from "./elements/basic-star";
import Payment from "./elements/payment";
import Config from "./elements/config";
import Bell from "./elements/bell";
import Images from "./elements/images";
import SimpleCalendar from "./elements/simple-calendar";
import TextIcon from "./elements/text";
import Atention from "./elements/atention";
import Marketing from "./elements/marketing";
import MobileFullHeart from "./mobile-full-heart";
import DeactivatedSum from "./elements/deactivated-sum";
import SendMessage from "./elements/send-message";

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
  somaDesativada: <DeactivatedSum />,
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
  file: <File />,
  "full-heart": <FullHeart />,
  "mobile-full-heart": <MobileFullHeart />,
  "shopping-card": <ShoppingCard />,
  "black-heart": <BlackHeart />,
  "voltar-black": <VoltarBlack />,
  transporte: <Transporte />,
  fotografia: <Fotografia />,
  agua: <Agua />,
  combustivel: <Combustivel />,
  alimentacao: <Alimentacao />,
  guia: <Guia />,
  duracao: <Duracao />,
  mobileDuracao: <MobileDuracao />,
  compartilhar: <Compartilhar />,
  mobileCompartilhar: <MobileCompartilhar />,
  "seta-direita": <SetaDireita />,
  perfil: <Perfil />,
  notificacoes: <Notificacoes />,
  chat: <Chat />,
  "chat-web": <ChatWeb />,
  favoritos: <Favoritos />,
  reservas: <Reservas />,
  carrinho: <Carrinho />,
  sair: <Sair />,
  user: <User />,
  calendar: <Calendar />,
  options: <Options />,
  "calendar-opacity": <OpacityCalendar />,
  "big-star": <BigStar />,
  "big-star-empty": <BigStarEmpty />,
  pix: <Pix />,
  card: <Card />,
  boleto: <Boleto />,
  master: <Master />,
  now: <Now />,
  read: <Read />,
  unread: <Unread />,
  "localizao-branca": <LocalizacaoBranca />,
  seta: <Seta />,
  "scroll-mouse": <ScrollMouse />,
  sucess: <Sucess />,
  cancel: <Cancel />,
  clock: <Clock />,
  message: <Message />,
  download: <Download />,
  "chevron-down-green": <ChevronDownGreen />,
  "download-green": <DownloadGreen />,
  "x-red": <XRed />,
  add: <Add />,
  "shared-muted": <SharedMuted />,
  camera: <Camera />,
  "white-eye": <WhiteEye />,
  check: <Check />,
  upload: <Upload />,
  "no-baby": <NoBaby />,
  baby: <Baby />,
  person: <Person />,
  group: <Group />,
  "small-group": <SmallGroup />,
  dollar: <Dollar />,
  success: <Success />,
  pie: <Pie />,
  video: <Video />,
  plus: <Plus />,
  contract: <Contract />,
  connections: <Connections />,
  speaker: <LoudsSpeaker />,
  hiking: <Hiking />,
  lock: <Lock />,
  trash: <Trash />,
  edit: <Edit />,
  "small-cancel": <SmallCancel />,
  duplicate: <Duplicate />,
  "doble-check": <DobleCheck />,
  warning: <Warning />,
  "basic-star": <BasicStar />,
  payment: <Payment />,
  config: <Config />,
  bell: <Bell />,
  images: <Images />,
  "simple-calendar": <SimpleCalendar />,
  text: <TextIcon />,
  atention: <Atention />,
  marketing: <Marketing />,
  "send-message": <SendMessage />,
};

export default function MyIcon({
  name,
  variant,
  className,
  ...props
}: MyIconProps) {
  return (
    <div
      {...props}
      className={cn(
        variant === "circled" &&
          "flex h-9 w-9 items-center justify-center rounded-full",
        className
      )}
    >
      {IconsMap[name]}
    </div>
  );
}
