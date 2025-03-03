import fon from '../../assets/img/fon.jpg'

export function MainTop() {

    return (
            <>
                <div
                    style={{
                        position: 'relative',
                        top: 0,
                        left: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '30px',
                        color: '#ffffff',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0) 44%, rgba(0, 0, 0, 1) 100%), url(${fon})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        borderRadius: '0 0 30px 30px',
                        height: '80vh',
                        width: '100%',
                        margin: 0,
                    }}
                >
                    <h1 style={{ textAlign: 'left', alignSelf: 'flex-start', marginLeft: '20px' }}>
                        Берег
                    </h1>
                    <h1 style={{ fontSize: 50, textAlign: 'center', marginTop: '93%', marginBottom: 0 }}>
                        ТУРБАЗА <br /> БЕРЕГ
                    </h1>
                    <h2 style={{ fontSize: 25, textAlign: 'center', margin: 0 }}>
                        САМАРА
                    </h2>
                </div>
            </>
    );

}