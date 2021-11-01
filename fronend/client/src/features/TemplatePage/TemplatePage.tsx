import { Header } from './Header';
import { Title } from './Title';

import styles from './TemplatePage.module.css';
import { Footer } from './Footer';

interface ParentCompProps {
  childComp?: React.ReactNode;
  title: string;
  showBackButton: boolean;
  showNextButton: boolean;
  backPath?: string;
  handleBack: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  handleNext?: () => void;
}

export const TemplatePage: React.FC<ParentCompProps> = props => {
  const { showBackButton, showNextButton, backPath, handleBack, handleNext, title, children } = props;

  return (
    <div className={styles.mainContainer}>
      <Header />
      <Title
        showBackButton={showBackButton}
        backPath={backPath}
        handleBack={handleBack}
        showNextButton={showNextButton}
        handleNext={handleNext}
        title={title}
      />
      <div className={styles.content}>
        {children}
      </div>
      <Footer />
    </div>
  );
};