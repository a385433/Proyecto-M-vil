Sistema de Gestión
Nanys Care



“Conectando familias con cuidadores de confianza.”





Especificación de Requerimientos de Sistema

Versión 1.0




Producido para: 


Presentado por:

Historial de Cambios

Fecha
Versión
Descripción
Autor
07/05/2026
1.0
Inicio del Documento
Adrián Alarcón














Tabla de Contenido
Historial de Cambios	2
Tabla de Contenido	3
1. Introducción	4
1.1   Propósito	4
1.2   Alcance	4
1.3   Límites y Exclusiones	5
1.4   Definiciones, Acrónimos, y Abreviaciones	5
2. Especificación de Requerimientos	5
2.1   Restricciones de Diseño	5
2.2   Requerimientos Funcionales	6
2.3   Requerimientos No funcionales	7
2.4   Actores	8



Introducción
Este documento describe las características y requerimientos específicos del Sistema de  Gestión Nanys Care de acuerdo al análisis de las necesidades del cliente.
1.1   	Propósito
El propósito de este documento es definir y detallar los requerimientos funcionales y no funcionales del Sistema de Gestión Nanys Care, una plataforma que conecta familias con niñeras de confianza para el cuidado infantil en hogares.
Este documento servirá como guía técnica y de referencia para el equipo de desarrollo, asegurando que la aplicación cumpla con las necesidades de los usuarios y los objetivos del negocio. Además, facilitará la comunicación entre los interesados del proyecto, incluyendo desarrolladores, diseñadores, testers y partes involucradas en la gestión del producto.
1.2   	Alcance
El propósito principal de la aplicación es facilitar la búsqueda, calendarización y contratación de niñeras, asegurando que los niños reciban el mejor cuidado posible mientras los padres tienen tranquilidad y confianza en su elección.
La aplicación permitirá a los padres buscar, evaluar y contratar niñeras de confianza según su ubicación, disponibilidad y experiencia. Asimismo, proporcionará a las niñeras un espacio para ofrecer sus servicios, gestionar solicitudes y recibir pagos de manera segura.
La aplicación está dirigida tanto a padres de familia que buscan un servicio de cuidado infantil confiable como a niñeras que desean encontrar oportunidades de empleo en los hogares. A través de funciones avanzadas como geolocalización, verificación de antecedentes, reservas automatizadas y un sistema de calificación, buscamos optimizar la experiencia de ambas partes.
Las principales funcionalidades incluyen:
Registro y creación de perfiles para padres y niñeras.
Búsqueda avanzada con filtros personalizados.
Sistema de reservas y pagos integrados.
Calificaciones y reseñas para garantizar la calidad del servicio.
1.3   Límites y Exclusiones
La aplicación no se hará responsable de la verificación directa de antecedentes de las niñeras, pero podrá integrar servicios externos para esta función.
No incluirá un servicio de transporte para las niñeras ni funcionalidades de videollamada.
No gestionará disputas entre usuarios, aunque podrá incluir un sistema de soporte.
1.4   Definiciones, Acrónimos, y Abreviaciones

Acrónimo
Definición
RF01 … N
Notación para definir el número de Requerimiento Funcional 
RNF01 … N 
Notación para definir el número de Requerimiento No Funcional 
TBD
To be defined, sección que aún falta por completar o definir


2. Especificación de Requerimientos 
2.1   Restricciones de Diseño
El sistema se desarrollará con las siguientes restricciones de diseño.


2.2   Requerimientos Funcionales
Registro y autenticación
RF01.- El sistema permite a los usuarios (Tutores y Cuidadores) registrarse con correo electrónico.
RF02.- Inicio de sesión seguro con autenticación mediante correo electrónico.
Perfiles de usuario
RF03 El sistema permite al Cuidador crear su perfil con foto, experiencia, certificaciones, experiencia, disponibilidad y tarifas.
RF04 Las tarifas están asociadas al nivel de experiencia y capacidades del Cuidador 
RF05 El sistema permite al Tutor crear su perfil con información sobre sus hijos y necesidades específicas.
Búsqueda y filtrado
RF06 El sistema permite al Tutor buscar cuidadores por ubicación, disponibilidad, precio, experiencia y calificaciones.
RF07 El sistema permite al Cuidador recibir solicitudes de cuidado basadas en su ubicación y horario.
Sistema de reservas
RF10 El sistema permite al Tutor agendar citas con Cuidadores según disponibilidad.
RF11 El sistema permite el envío de recordatorios automáticos a través del envío de correos electrónicos.
RF12 El sistema permite al Cuidador aceptar o rechazar citas agendadas por el Tutor.
Calificaciones y reseñas
RF14 El sistema permite al Tutor calificar y dejar reseñas sobre el Cuidador.
RF15 El sistema permite al Cuidador calificar la experiencia con los Tutores, la calificación y comentarios permanecen de forma privada solo para el Cuidador en sus notas personales
Notificaciones
RF21 El sistema envía correos electrónicos sobre reservas, mensajes y pagos.
RF22 El sistema envía correos electrónicos como recordatorios de citas próximas.

Calendarios
RF25 El sistema permite al Cuidador y al Tutor consultar su agenda.
Reglamento
RF26 El sistema permite al Cuidador consultar el reglamento y normas de conducta establecidas para el correcto desempeño de su labor como cuidador.

2.3   Requerimientos No funcionales

Seguridad y privacidad
Cifrado de datos y medidas de seguridad para proteger la información.
Escalabilidad
Arquitectura que permita crecer con más usuarios sin afectar el rendimiento.
Disponibilidad
La aplicación debe estar disponible 24/7 con un tiempo de inactividad mínimo.
Interfaz de usuario (UI/UX)
Diseño intuitivo, accesible y optimizado para móviles.
Compatibilidad
Aplicación móvil IOS y Android.
El sistema es compatible con los principales navegadores de internet, (Firefox, Chrome, Safari y Edge).

Tiempo de respuesta
Respuesta rápida en la carga de perfiles y búsquedas (< 4 segundos).
Mantenimiento y soporte
Actualizaciones periódicas con mejoras de seguridad y rendimiento.
2.4   Actores

Actor
Descripción
Cuidador
Es la persona que realiza el servicio de cuidado de niños, generalmente es una niñera.
Tutor
Es la persona que solicita el servicio de cuidado de los niños, generalmente la mamá o el papá del infante.
Administrador
Es la persona encargada de administrar los catálogos de la aplicación.
Supervisor
Es la persona encargada de la operatividad del negocio, así como del correcto flujo de comunicación entre Tutor y Cuidador.




