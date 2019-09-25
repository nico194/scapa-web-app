const config = {
    ip: 'http://localhost:8000', //'http://10.170.10.50:8000',
    homeNavbarLeft: [
        {
            goTo: '/',
            text: 'SCAPA'
        }
    ],
    homeNavbarRight: [
        {
            goTo: '/signin',
            text: 'Login'
        },
        {
            goTo: '/signup',
            text: 'Registrarse'
        }
    ],
    adminNavbarLeft: [
        {
            goTo: '/admin',
            text: 'SCAPA'
        },
        {
            goTo: '/categories',
            text: 'Categorias'
        },
        {
            goTo: '/pictograms',
            text: 'Pictogramas'
        },
    ],
    adminNavbarRight: [
        {
            goTo: '/',
            text: 'Salir'
        }
    ],
    tutorNavbarLeft: [
        {
            goTo: '/patients',
            text: 'Pacientes'
        },
        {
            goTo: '/routines',
            text: 'Rutinas'
        },
        {
            goTo: '/pending-request',
            text: 'Solicitudes Pendientes'
        }
    ],
    tutorNavbarRight: [
        {
            goTo: '/profile',
            text: 'Nombre Tutor'
        },
        {
            goTo: '/',
            text: 'Salir'
        }
    ],
    image: 'https://atasouthport.com/wp-content/uploads/2017/04/default-image.jpg'
}

export default config;