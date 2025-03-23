import { classNames } from '@/shared/lib';
import { Page } from '@/shared/ui';

import {
    memo,
    useEffect,
    useState,
    MouseEvent as ReactMouseEvent,
} from 'react';
import { useGetBasesQuery } from '@/entities/Base/index';
import { useAddBaseMutation } from '@/entities/Base';
import { Link, useNavigate } from 'react-router-dom';

interface BasesPageProps {
    className?: string;
}

const BasesPage = memo((props: BasesPageProps) => {
    const { className } = props;
    const { data: bases = [] } = useGetBasesQuery();
    const [addNewBase] = useAddBaseMutation();
    const navigate = useNavigate();
    const [baseName, setBaseName] = useState('');
    const [basePassword, setBasePassword] = useState('');

    useEffect(() => {
        console.log(bases);
    }, [bases]);

    const createBase = async (
        e: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();
        try {
            const res = await addNewBase({
                basename: baseName,
                password: basePassword,
            }).unwrap();
            console.log(res);
            navigate(res.url);
        } catch (e: any) {
            console.log(e);
        }
    };

    return (
        <Page
            className={classNames(
                'flex h-screen w-screen items-center justify-center',
                {},
                [className],
            )}
        >
            <div className="flex rounded-3xl border border-amber-50 bg-gray-950 p-4 text-white">
                <div className="">
                    {bases &&
                        bases.map((el: any) => (
                            <Link
                                to={el.url}
                                key={el.basename}
                                className="block"
                            >
                                {el.basename}
                            </Link>
                        ))}
                </div>
                <div className="h-full grow-1">
                    <h1>CidFinancial</h1>
                    <input
                        type="text"
                        placeholder="Base name*"
                        value={baseName}
                        onChange={(e) => setBaseName(e.target.value)}
                        id=""
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        value={basePassword}
                        onChange={(e) => setBasePassword(e.target.value)}
                        id=""
                    />
                    <button onClick={(e) => createBase(e)}>Create base </button>
                </div>
            </div>
        </Page>
    );
});

export default BasesPage;
