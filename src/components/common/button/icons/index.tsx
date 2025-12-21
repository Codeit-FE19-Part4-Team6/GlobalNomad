// 기존 assets에서 아이콘 import (SVG는 React 컴포넌트로 import됨)
import PlusIconSvg from '@/assets/icons/page/plus.svg';
import MinusIconSvg from '@/assets/icons/page/minus.svg';
import DeleteIconSvg from '@/assets/icons/page/delete.svg';
import GoogleIconSvg from '@/assets/icons/auth/google-login.svg';
import ArtIconSvg from '@/assets/icons/page/art.svg';
import FoodIconSvg from '@/assets/icons/page/food.svg';
import SportIconSvg from '@/assets/icons/page/sport.svg';
import TourIconSvg from '@/assets/icons/page/tour.svg';
import BusIconSvg from '@/assets/icons/page/bus.svg';
import WellbeingIconSvg from '@/assets/icons/page/wellbeing.svg';

// CircleButton
// Plus 아이콘
export const PlusIcon = () => <PlusIconSvg />;

// Minus 아이콘
export const MinusIcon = () => <MinusIconSvg />;

// Close/Delete 아이콘 (X 버튼용)
export const CloseIcon = () => <DeleteIconSvg />;

// SecondaryButton
// Google 아이콘
export const GoogleIcon = () => <GoogleIconSvg />;

// FilterButton
// Art 아이콘
export const ArtIcon = () => <ArtIconSvg />;
export const FoodIcon = () => <FoodIconSvg />;
export const SportIcon = () => <SportIconSvg />;
export const TourIcon = () => <TourIconSvg />;
export const BusIcon = () => <BusIconSvg />;
export const WellbeingIcon = () => <WellbeingIconSvg />;

// 기존 아이콘 객체도 export (필요시 직접 사용 가능)
export { default as Icons } from '@/assets/icons';
