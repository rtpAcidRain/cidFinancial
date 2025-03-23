import { classNames } from '@/shared/lib';
import { memo, ReactNode } from 'react';

interface PageProps {
    className?: string;
    children: ReactNode;
}
export const Page = memo((props: PageProps) => {
    const { className, children } = props;
    return (
        <div className={classNames('bg-gray-900', {}, [className])}>
            {children}
        </div>
    );
});
