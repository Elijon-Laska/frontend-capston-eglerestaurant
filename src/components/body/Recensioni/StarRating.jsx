import { BsStarFill, BsStar } from "react-icons/bs";

const StarRating = ({ rating }) => (
  <div>
    {[...Array(5)].map((_, i) =>
      i < rating ? <BsStarFill key={i} color="#FFD700" size={22} /> : <BsStar key={i} color="#FFD700" size={22} />
    )}
  </div>
);
export default StarRating;
