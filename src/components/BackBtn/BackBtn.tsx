import { useNavigate } from 'react-router-dom';
import './BackBtn.scss';

export default function BackBtn() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button className='BackBtn' onClick={handleClick}>
      <span className='arrow'>↼</span> <span>BACK</span>
    </button>
  );
}
