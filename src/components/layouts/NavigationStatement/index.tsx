import Link from 'next/link';

import ROUTES from '~/constants/routes';

type Props = {
  question: string;
  content: string;
  href: (typeof ROUTES)[keyof typeof ROUTES];
};

const NavigationStatement = ({ question, content, href }: Props) => {
  return (
    <>
      <div className="text-center text-base leading-normal tracking-wide">
        <span>{question}</span>
        <Link href={href} className="font-semibold text-primary hover:opacity-80">
          {content}
        </Link>
      </div>
    </>
  );
};

export default NavigationStatement;
