const config = {
    ip: 'http://10.170.10.50:8000', //''
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
            text: 'Resistrarse'
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
    ]
}

export default config;