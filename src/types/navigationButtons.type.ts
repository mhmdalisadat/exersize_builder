export interface NavigationButtonsPropsType {
  onPrevious: () => void;
  onNext: () => void;
  isNextDisabled: boolean;
  variants: {
    hidden: { scale: number; opacity: number };
    visible: {
      scale: number;
      opacity: number;
      transition: {
        duration: number;
        delay: number;
        type: string;
        stiffness: number;
      };
    };
    hover: { scale: number; transition: { duration: number } };
    tap: { scale: number; transition: { duration: number } };
    disabled?: { scale: number };
  };
  nextButtonText?: string;
  nextButtonClassName?: string;
}
