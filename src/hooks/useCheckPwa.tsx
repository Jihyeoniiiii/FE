import { useEffect, useState } from 'react';

const useCheckPwa = (): boolean => {
    const [isPwa, setIsPwa] = useState(false);

    useEffect(() => {
        const checkPwa = (): boolean => {
        return window.matchMedia('(display-mode: standalone)').matches 
        || window.navigator.standalone === true;
    };

    setIsPwa(checkPwa());
    }, []);

    return isPwa;
};

export default useCheckPwa;