import pumpJack from '../assets/gifs/pump-jack.gif';
const Fallback = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <img src={pumpJack} alt="" />
            {/* <OilerImage image={pumpJack} height={100} /> */}
        </div>
    );
};

export default Fallback;
