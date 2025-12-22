import './Button.css';

import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { CircleButton } from './CircleButton';
import { ActionButton } from './ActionButton';
import { FilterButton } from './FilterButton';
import { TimeSelectButton } from './TimeSelectButton';

// Button 네임스페이스 객체 생성
export const Button = {
  Primary: PrimaryButton,
  Secondary: SecondaryButton,
  Circle: CircleButton,
  Action: ActionButton,
  Filter: FilterButton,
  TimeSelect: TimeSelectButton,
};

export default Button;
