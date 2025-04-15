export const isPWA = (): boolean => {
    return (
        window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone === true
    );
};