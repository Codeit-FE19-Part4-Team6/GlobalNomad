import CardContainer from './CardContainer';
import CardImage from './CardImage';
import CardButton from './CardButton';
import CardContent from './CardContent';
import { CardBadge } from './CardBadge';
import { CardTitle } from './CardTitle';
import { CardRating } from './CardRating';
import { CardPrice } from './CardPrice';
import { CardSchedule } from './CardSchedule';

const Card = Object.assign(CardContainer, {
  Image: CardImage,
  Content: CardContent,
  Title: CardTitle,
  Rating: CardRating,
  Price: CardPrice,
  Schedule: CardSchedule,
  CardButton: CardButton,
  Badge: CardBadge,
});

export default Card;
