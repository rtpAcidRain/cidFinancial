import { memo } from 'react';

interface SasProps {
    className?: string;
}
export const Sas = memo(function Sas(props: SasProps) {
    const { className } = props;
    return <div className="">Sas</div>;
});
