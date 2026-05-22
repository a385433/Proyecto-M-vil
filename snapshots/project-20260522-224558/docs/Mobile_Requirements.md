# Requerimientos de la Aplicación Móvil — Nanys Care

Fecha: 2026-05-18

Resumen

Este documento describe los requerimientos funcionales y no funcionales específicos para la aplicación móvil de Nanys Care (iOS y Android). Está diseñado como complemento del SRS general y se centra en las capacidades, restricciones y expectativas específicas del cliente móvil.

1. Alcance móvil

La app móvil permitirá a Tutores y Cuidadoras realizar las principales operaciones del servicio: registro, búsqueda, reservas, pagos, gestión de perfil y comunicación. Debe ofrecer una experiencia nativa, segura y eficiente en redes móviles.

2. Requerimientos Funcionales (móviles)

- MRF01 — Registro y autenticación móvil: Registro con correo y teléfono; login con email/contraseña y recuperación por correo.
- MRF02 — Autenticación social (opcional): Inicio con Google y Apple Sign-In.
- MRF03 — Perfil de Cuidadora: Crear/editar perfil, subir foto, certificados (imagen/PDF), establecer disponibilidad y tarifas.
- MRF04 — Perfil de Tutor: Crear/editar perfil, añadir información de hijos y preferencias.
- MRF05 — Búsqueda geolocalizada: Buscar Cuidadoras por ubicación actual o zona, con filtros (disponibilidad, precio, valoración, distancia).
- MRF06 — Solicitud y reserva rápida: Solicitar reserva instantánea o programada; seleccionar horas, duración y tarifas.
- MRF07 — Calendario y disponibilidad: Sincronización de calendario local/servicio; ver y gestionar reservas desde la app.
- MRF08 — Aceptar/Rechazar solicitudes: Cuidadoras reciben notificaciones push y gestionan solicitudes desde la app.
- MRF09 — Pagos in-app: Integración con pasarela de pago (Stripe/PayU) para cobrar y pagar; manejo de comisiones y recibos.
- MRF10 — Mensajería segura: Chat entre Tutor y Cuidadora dentro de la app; almacenar mensajes en backend.
- MRF11 — Notificaciones push: Enviar notificaciones para reservas, recordatorios, mensajes y pagos.
- MRF12 — Calificaciones y reseñas: Enviar reseñas; ver historial de valoraciones.
- MRF13 — Soporte y contacto: Acceso al centro de ayuda y envío de tickets desde la app.
- MRF14 — Documentos y verificaciones: Subida de documentos y enlace a servicio de verificación externo.
- MRF15 — Modo offline limitado: Mostrar información en caché (perfil, últimas búsquedas) y permitir acciones que se sincronicen al reconectar.

3. Requerimientos No Funcionales (móviles)

- MNRF01 — Rendimiento: UI fluida a 60 fps en interacciones comunes; tiempos de respuesta <200 ms para acciones críticas si la red es buena.
- MNRF02 — Disponibilidad: Backend y notificaciones con alta disponibilidad; app debe manejar desconexiones y reintentos.
- MNRF03 — Seguridad: TLS para todas las comunicaciones; almacenamiento seguro de tokens (Keychain en iOS, Keystore en Android); cumplimiento GDPR/legislación aplicable.
- MNRF04 — Privacidad: Solicitar permisos claros (ubicación, cámara, notificaciones) con razones de uso.
- MNRF05 — Consumo de datos y batería: Minimizar uso de red y operaciones en segundo plano; compresión de imágenes antes de subir.
- MNRF06 — Escalabilidad: Backend y servicios deben soportar incremento de usuarios móviles; diseño de APIs paginadas y eficientes.
- MNRF07 — Compatibilidad: Soporte para iOS (últimas 2 versiones) y Android (API level N mínimo; sugerir API 24+ o 26+).
- MNRF08 — Accesibilidad: Cumplimiento de WCAG básico en la interfaz; textos escalables y navegación por VoiceOver/TalkBack.
- MNRF09 — Internacionalización: Soporte para español y posibilidad de añadir más idiomas.
- MNRF10 — Mantenibilidad: Código modular, pruebas unitarias y de integración; CI/CD para builds automatizados.

4. Requisitos de Plataforma y Permisos

- Permisos mínimos: Localización (cuando se use búsqueda), almacenamiento (subir fotos), notificaciones push, cámara (opcional para subir documentos), contactos (opcional).
- Requisitos de backend: Endpoints REST/GraphQL, WebSocket para notificaciones en tiempo real (opcional), almacenamiento seguro de documentos.

5. UX / Flujos clave

- Onboarding: Registro, verificación de correo, completar perfil.
- Búsqueda y reserva: Buscar → filtrar → ver perfil → solicitar → pagar → confirmación.
- Gestión de agenda: Ver reservas, aceptar/rechazar, ver historial.

6. Métricas y monitoreo

- Métricas de rendimiento (latencia API, tiempos de carga), errores en app (crashes), ratio de éxito de reservas, activación de notificaciones push.
- Integración recomendada: Sentry (errores), Firebase Analytics / Mixpanel (eventos), Prometheus + Grafana (backend).

7. Stack tecnológico recomendado

- Opción principal (recomendada): React Native + TypeScript + Expo (rápido prototipado) o React Native CLI para mayor control.
- Alternativa: Flutter (rendimiento y experiencia nativa consistente).
- Backend: Node.js/TypeScript (Express/NestJS) o Python (FastAPI); base de datos PostgreSQL; Redis para caché y colas (BullMQ/Sidekiq).
- Notificaciones: Firebase Cloud Messaging (FCM) + APNs.
- Pagos: Stripe (recomendado) o pasarela local según país.

8. Entregables iniciales sugeridos

- Documento de requerimientos móviles (este archivo).
- Wireframes de pantallas clave (onboarding, búsqueda, detalle perfil, reserva, chat).
- Prototipo interactivo (Figma/AdobeXD).
- Scaffold inicial de app (repo con estructura, CI, primer build) — a definir si quieres que lo cree.

9. Siguientes pasos

- Confirma el stack preferido (React Native o Flutter) y si quieres que cree el scaffold del proyecto.
- Definir políticas de seguridad y privacy (SLA, GDPR) y flujos de pago/comisiones.

---

Si quieres, procedo a crear el scaffold del proyecto móvil en React Native con TypeScript y un README con instrucciones para ejecutar. ¿Procedo con eso? 
