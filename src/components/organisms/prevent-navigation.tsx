'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { DialogClose, DialogContent, DialogTitle, MyDialog } from '../molecules/my-dialog';
import MyButton from '../atoms/my-button';
import MyTypography from '../atoms/my-typography';

type PreventNavigationProps = {
    isDirty: boolean;
};

export const PreventNavigation = ({ isDirty }: PreventNavigationProps) => {
    const [leavingPage, setLeavingPage] = useState(false);
    const [currentRedirectPath, setCurrentRedirectPath] = useState('');

    /**
     * Function that will be called when the user selects `yes` in the confirmation modal,
     * redirected to the selected page.
     */
    const confirmationFn = useRef<() => void>(() => { });

    // Used to make popstate event trigger when back button is clicked.
    // Without this, the popstate event will not fire because it needs there to be a href to return.
    // if (typeof window !== 'undefined') {
    //     window.history.pushState(null, document.title, window.location.href);
    // }

    useEffect(() => {

        /**
         * Used to prevent navigation when use click in navigation `<Link />` or `<a />`.
         * @param e The triggered event.
         */
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLAnchorElement;

            if (isDirty) {
                event.preventDefault();

                setLeavingPage(true);
                setCurrentRedirectPath(target.href);

                // window.location.href = target.href;
                // confirmationFn.current = () => {
                //     // router.push(target.href);
                //     window.location.href = target.href;
                // };

                // setLeavingPage(true);
            }
        };
        /* ********************************************************************* */

        /**
         * Used to prevent navigation when use `back` browser buttons.
         */
        // const handlePopState = () => {
        //     if (isDirty) {
        //         window.history.pushState(null, document.title, window.location.href);

        //         confirmationFn.current = () => {
        //         };

        //         setLeavingPage(true);
        //     } else {
        //         window.history.back();
        //     }
        // };
        /* ********************************************************************* */

        /**
         * Used to prevent navigation when reload page or navigate to another page, in diffenret origin.
         * @param e The triggered event.
         */
        // const handleBeforeUnload = (e: BeforeUnloadEvent) => {

        //     if (isDirty) {
        //         e.preventDefault();
        //     }
        // };

        document.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', handleClick);
        });
        // window.addEventListener('popstate', handlePopState);
        // window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.querySelectorAll('a').forEach((link) => {
                link.removeEventListener('click', handleClick);
            });
            // window.removeEventListener('popstate', handlePopState);
            // window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty]);

    return (
        <MyDialog
            open={leavingPage}
        >
            <DialogContent
                onClose={() => setLeavingPage(false)}
            >
                <DialogTitle>
                    <MyTypography
                        variant='subtitle2'
                        weight='medium'
                    >
                        Tem certeza que sair?
                    </MyTypography>
                </DialogTitle>
                <div className='flex w-full flex-col gap-4'>
                    <MyTypography lightness={600}>
                        Todas as informações do orçamento serão descartada.
                    </MyTypography>
                    <DialogClose asChild>
                        <MyButton
                            onClick={
                                () => {
                                    setLeavingPage(false);
                                    window.location.href = currentRedirectPath;
                                }
                            }
                        >
                            Sim, quero sair
                        </MyButton>
                    </DialogClose>
                    <MyButton
                        onClick={() => {
                            setLeavingPage(false);
                        }}
                        variant='outline'>Cancelar</MyButton>
                </div>
            </DialogContent>
        </MyDialog>
    );
};