const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

/*/*//*/*/


const flowPrimeraVez = addKeyword(['1'])
.addAnswer([
'Nuestros médicos incluyen:', 
'- Dra. Esbeydy García: Dermatóloga pediatra.', 
'- Dr. Ángel Osuna: Dermatólogo general.', 
'- Dra. Valeria González: Dermatóloga tricóloga.', 
'- Lic. Pedro García: Licenciado en nutrición deportiva.',
])

.addAnswer(['Queremos asegurarnos de brindarle la mejor atención médica posible con el dermatólogo seleccionado. Por esta razón, una vez que comience a consultar con uno de nuestros dermatólogos, no podrá cambiar por algún otro de la clínica.',])

.addAnswer ([
    'En breve uno de nuestros agentes de atención a clientes se comunicará con usted para agendar su cita. 👩‍💼',  ' ',
    'Para poder brindarle un mejor servicio, por favor proporcione la siguiente información:',
    '- El nombre completo del paciente', 
    '- El médico con el que le gustaría agendar su cita',
    '- Horarios o días que le resulten más convenientes.', 
])

const flowSegundaVez = addKeyword(['2'])
.addAnswer ([
    'En breve uno de nuestros agentes de atención a clientes se comunicará con usted para agendar su cita. 👩‍💼',  ' ',
    'Para poder brindarle un mejor servicio, por favor proporcione la siguiente información:',
    '- El nombre completo del paciente', 
    '- El médico con el que consulta',
    '- Horarios o días que le resulten más convenientes.', 
])

const flowConsulta = addKeyword(['1', 'agendar consulta']).addAnswer(
    [
        'Para ayudarnos a agendar su cita de manera adecuada, por favor seleccione una de las siguientes opciones:',
        '*1* - Si es su primera vez en nuestra clínica.',
        '*2* - Si ya ha consultado con nosotros anteriormente.',
    ],
    null,
    null,
    [flowPrimeraVez, flowSegundaVez]
)


const flowTratamiento = addKeyword(['2']).addAnswer(
    [
        'En breve uno de nuestros agentes de atención a clientes se comunicará con usted para agendar su cita. 👩‍💻',  ' ',
        'Para poder brindarle un mejor servicio, por favor proporcione la siguiente información:',
        '- Nombre completo del paciente',
        '- Tratamiento que desea realizarse',
        '- Horario o día en el que prefiere asistir',
    ]
)


const flowInfo = addKeyword(['3']).addAnswer('Espere a que uno de nuestros agentes de atención a clientes se comunique con usted. Nos aseguraremos de brindarle la mejor atención posible. 👩‍💻') 
.addAnswer ('Por favor, proporcione su nombre y escriba la pregunta o duda que tenga. Estamos para ayudarlo y responder a todas sus inquietudes.')


const flowPromos = addKeyword(['4']) .addAnswer(['¡Adjunto encontrará nuestras promociones mensuales ✨!', 'Aproveche esta oportunidad para ahorrar en su próxima compra en nuestra clínica.',]) 
.addAnswer(['🔗 https://bit.ly/promos-esbeydy ✨'])


const flowFactura = addKeyword(['5', 'facturas', 'factura']) .addAnswer(['Para cualquier asunto relacionado con facturas, por favor envíe un correo electrónico a facturasdermatologicas@gmail.com con la siguiente información:', '- Nombre completo del paciente:', '- RFC:', '- Nombre fiscal:', '- Dirección:', '- Correo electrónico:', '- Nombre del doctor que lo atiende:', '- Forma de pago:', '- Constancia de situación fiscal (PDF actualizado)']) 
.addAnswer(['Esta información nos permitirá procesar su solicitud de manera oportuna y asegurarnos de que su factura sea emitida correctamente. Si tiene alguna pregunta adicional, no dude en realizarla.', '¡Gracias por su atención!'])


const flowOtro = addKeyword(['6']).addAnswer('Espere a que uno de nuestros agentes de atención a clientes se comunique con usted. Nos aseguraremos de brindarle la mejor atención posible. 👩‍💻') 
.addAnswer ('Por favor, proporcione su nombre y escriba la pregunta o duda que tenga. Estamos para ayudarlo y responder a todas sus inquietudes.')


/* FLOWS PRINCIPALES */

const flowCosto = addKeyword(['costo de consulta', 'cuesta la consulta', 'costo de la consulta']) .addAnswer(['El costo de la consulta de primera vez es de $1000 pesos. Después de la primera consulta, el costo será de $900 pesos. Si tiene alguna pregunta adicional sobre nuestros servicios, no dude en contactarnos. ¡Gracias por considerarnos!'])
    
const flowConfirmo = addKeyword(['confirmo']) .addAnswer(['✨¡Gracias por confirmar su asistencia!✨', ' ',
'Si tiene alguna pregunta o necesita más información, no dude en contactarnos.', '¡Nos vemos pronto! 🙌'])    

const flowCancelo = addKeyword(['cancelo']) .addAnswer(['Confirmamos la cancelación de su cita. Lamentamos que no pueda asistir y esperamos que todo esté bien. ✨'])    
.addAnswer (['Por favor, no dude en comunicarse con nosotros cuando desee reprogramar su cita. Estamos aquí para ayudarlo/a y brindarle la atención que necesita. 👩‍💼'])

const flowUbicacion = addKeyword('ubicacion', 'ubicas', 'ubicados', 'ubicación')
.addAnswer('🏥 Nuestra clínica se encuentra en New City Medical Plaza Piso 10, Consultorio 1004', {
    media: 'https://i.imgur.com/UrSXKMC.jpg',
}) 
.addAnswer(['📍 Ave. Paseo del Centenario 9580, Defensores de Baja California, 22010 Tijuana, B.C.', '📍 Aquí te comparto nuestra ubicación: https://goo.gl/maps/uvoiMJE2mWMSuPMb9'])

const flowGracias = addKeyword(['gx', 'gracias', 'ty', 'adios', 'bye']) 
.addAnswer(['¡Gracias por elegir nuestra clínica.!👋']) 
.addAnswer(['Esperamos poder ayudarle a lograr una piel saludable y un estilo de vida saludable.'])

const flowPaseMedico = addKeyword(['pase medico'])
.addAnswer(['Por favor proporcione la siguiente información para tramitar su pase médico:',
'- Nombre completo del chofer:',
'-¿Cuántas personas van en el vehículo?',
'- Número de placas:',
'- Tipo de pasaporte (Ready Lane o All Traffic):',])
.addAnswer('Una vez que tengamos esta información, podremos comenzar a procesar su solicitud de pase médico. ¡Gracias! 👩‍💻')

const flowFarmacia = addKeyword (['farmacia'])
.addAnswer (['Para contactar nuestra farmacia puedes llamarnos al teléfono 📞 663 203 09 80 o puedes utilizar el siguiente link.'])
.addAnswer (['🔗 https://wa.me/+5216632030980?text=Hola ✨'])

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenas', 'buenos', 'menu', 'menú',])
    .addAnswer('¡Bienvenido a la Clínica Dermatológica Dra. Esbeydy García!👋', { 
        media: 'https://i.imgur.com/5seA53W.jpg',
            })

        .addAnswer(
            [
                'Para ayudarle a recibir la atención adecuada, por favor, seleccione la opción que más se apegue a su solicitud marcando el número correspondiente:', 
                '*1*- Para agendar una consulta', 
                '*2*- Para agendar un tratamiento', 
                '*3*- Para solicitar información o cambio de una cita ya agendada', 
                '*4*- Para conocer nuestras promociones del mes',
                '*5*- Para asuntos relacionados con facturación',
                '*6*- Otro',
            ],

        null,
        null,
        [flowConsulta, flowTratamiento, flowInfo, flowFactura, flowPromos, flowOtro]
    )


    /* NOOOOOOOO TOCAAAAAAAAAAAAAAAAAAR */

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowUbicacion,flowGracias, flowCosto, flowConfirmo, flowCancelo, flowPaseMedico, flowFarmacia])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb({port:1004})
}

main()
