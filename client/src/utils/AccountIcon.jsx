import { GrAdd, GrMoney } from 'react-icons/gr';
import { ImSpoonKnife } from 'react-icons/im';
import { BsBasket, BsBank, BsPiggyBank } from 'react-icons/bs';
import {
  IoBusOutline,
  IoHomeOutline,
  IoWifi,
  IoCartOutline,
} from 'react-icons/io5';
import { RiHospitalLine } from 'react-icons/ri';
import { HiOutlineTicket } from 'react-icons/hi';
import { BiMoney } from 'react-icons/bi';
const iconList = {
  // 11: { title: '급여', icon: <GrMoney /> },
  // 12: <GrMoney />,
  급여: <GrMoney />,
  용돈: <BsPiggyBank />,
  금융수입: <BiMoney />,
  식비: <ImSpoonKnife />,
  생활: <BsBasket />,
  쇼핑: <IoCartOutline />,
  교통: <IoBusOutline />,
  주거: <IoHomeOutline />,
  통신: <IoWifi />,
  의료: <RiHospitalLine />,
  금융: <BsBank />,
  문화: <HiOutlineTicket />,
};

const item = [<GrAdd />, <GrMoney />, <BsPiggyBank />];

export default iconList;
