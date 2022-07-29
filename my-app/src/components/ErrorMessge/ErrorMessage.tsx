import { FC, useState, useEffect } from 'react';
import StyledAlert from './StyledAlert';

interface ErrorMessageProps {
  text: string;
}
const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
  const [isShown, setIsShown] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setIsShown(false), 5000);
  }, []);

  return isShown ? (
    <StyledAlert severity="error" onClick={() => setIsShown(false)}>
      <span>{text}</span>
    </StyledAlert>
  ) : null;
};

export default ErrorMessage;
