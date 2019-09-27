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
    ],
    image: 'https://atasouthport.com/wp-content/uploads/2017/04/default-image.jpg',
    getAge: (date) => {
        const today = new Date();
        const birthday = new Date(date);
        let age = today.getFullYear() - birthday.getFullYear();
        const month = today.getMonth() - birthday.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }

        return age;
    }
}

export default config;