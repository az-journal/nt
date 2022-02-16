import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Landing Page</h1>
            <div
                style={{
                    width: '150px',
                    border: '1px solid lightgray',
                    borderRadius: '10px',
                    padding: '10px',
                    cursor: 'pointer',
                    textAlign: 'center',
                }}
                onClick={() => navigate('/app')}
            >
                App
            </div>
        </div>
    );
};

export default LandingPage;
