# Taller IA · SIAF-RP

Arquetipo para clases demostrativas: muestra cómo se arman las pantallas del SIAF-RP con los componentes del diseño de
Figma (el kit `@kennedy122112/siaf-rp-ui-angular`, Angular 21) y **datos simulados**, sin backend. Trae el login, el escritorio virtual y un proceso de ejemplo completo
(Documentos y registros, la solicitud con su formulario y Consultas y reportes), con usuarios de demostración para
alternar roles y perfiles.

> Es material de clase: corre solo en local y no se mantiene como producto. Nada de lo que se graba sale del navegador.

## Requisitos

- Node.js 24 (ver `.nvmrc`) y npm.
- Nada más: el kit de componentes viene dentro del repositorio (`vendor/`), así que `npm ci` lo instala sin acceso al
  repositorio del SIAF-RP.

## Cómo correrlo

```bash
npm ci
npm start
```

Abrir <http://127.0.0.1:4200>. Otro puerto: `npm start -- --port 4300`.

Si `npm start` dice `"ng" no se reconoce como un comando`, faltan las dependencias de desarrollo (npm debe instalar unos
680 paquetes). El `.npmrc` del proyecto ya las pide (`include=dev`): con el repositorio al día, borrar `node_modules` y
volver a correr `npm ci`.

## Usuarios de demostración

La contraseña de todos es **`Taller2026*`**. En el login, el panel «Usuarios de demostración» llena el DNI y la
contraseña con un clic.

| Usuario | DNI | Perfil | Qué puede hacer |
| --- | --- | --- | --- |
| Ana Torres Díaz | `11111111` | Creador | Crear, grabar, editar, verificar y eliminar solicitudes |
| Luis Ramírez Soto | `22222222` | Aprobador | Aprobar, observar (con comentario) o rechazar lo verificado |
| Carla Mendoza Ríos | `33333333` | Creador y Aprobador | Lo mismo que los dos anteriores: cambia de perfil desde su menú de usuario |

«Olvidé mi contraseña» también funciona: con el correo de un usuario (por ejemplo `ana.torres@taller.pe`) el código de
verificación es `123456`.

## Recorrido sugerido para la clase

1. **Login** como Ana. El escritorio virtual muestra la bandeja, los contadores y sus notificaciones.
2. **Procesos → Gestión de tesorería → Registro de cuentas bancarias → Documentos y registros**. La pestaña Documentos
   es la bandeja; Registros, las cuentas ya aprobadas (con el historial de la solicitud que las creó).
3. **Crear documento → Solicitud de Registro de Cuenta Bancaria**: llenar el formulario, adjuntar un PDF de sustento
   y **Grabar**. La solicitud recibe su número (`PCB-SRCB-00013-2026-MEF-OGA`) y queda Elaborada; luego **Verificar**.
4. **Cerrar sesión** y entrar como Luis: tiene la notificación «Solicitud por aprobar». Abrir la solicitud y
   **Aprobar** (la cuenta aparece en Registros con el código `CB-0009`), **Observar** o **Rechazar** (piden comentario).
5. Volver a entrar como Ana: le llega el aviso. Una solicitud observada se corrige y se vuelve a verificar, pero ya no
   se puede eliminar.
6. Entrar como Carla y cambiar de perfil desde el menú del usuario: el avatar pasa de «CR» a «AP» y cambian la bandeja,
   los botones y las notificaciones.
7. **Consultas y reportes**: elegir el rango de fechas de apertura y consultar. Probar los filtros, la **vista de
   gráficas** (KPI, barras, dona y línea) y **Exportar** a Excel, CSV o PDF.
8. **Catálogo de componentes** en `/ui-kit` (enlace «Ver componentes» del login): primeros pasos, fundamentos y una
   página por componente con su guía de uso, su playground (cambiar entradas y copiar el código), su API y su
   ejemplo en vivo. El buscador se abre con `Ctrl K`.

Para empezar de cero: **Reiniciar datos** en el login (o borrar el almacenamiento del sitio).

## Pantallas

| Ruta | Pantalla | Plantilla o componente principal |
| --- | --- | --- |
| `/login` | Inicio de sesión y usuarios de demostración | `siaf-tabs`, `siaf-input`, `siaf-list` |
| `/login/recuperar-contrasena` | Recuperar contraseña con código | — |
| `/panel` | Escritorio virtual | `siaf-desk-card` |
| `/procesos/registro-cuentas-bancarias` | Documentos y registros | `siaf-documents-records-page` |
| `/procesos/registro-cuentas-bancarias/solicitud` y `/solicitud/:id` | Solicitud de Registro de Cuenta Bancaria | `siaf-solicitude-page-layout` |
| `/procesos/registro-cuentas-bancarias/consultas` | Consultas y reportes | `siaf-query-report-page` |
| `/ui-kit` | Catálogo de componentes (sin sesión): portada, `primeros-pasos/:id`, `fundamentos/:id` y `componentes/:id` | — |

## Cómo funcionan los datos simulados

- **`src/app/mock/mock-backend.interceptor.ts`** hace de backend: responde las llamadas a `/api/v1` con las mismas
  rutas y respuestas que el backend real del SIAF-RP, y aplica sus reglas (quién puede hacer cada cambio de estado,
  comentario obligatorio al observar o rechazar, sustento obligatorio para elaborar, número al elaborar, registro al
  aprobar, notificaciones para cada rol). Simula 250 ms de latencia. Si una pantalla llama a una ruta que no simula,
  lo avisa en la consola con `[mock] Endpoint no simulado`.
- **`src/app/mock/mock-db.ts`** guarda los datos en el `localStorage` del navegador (clave `taller-siaf-rp:datos`): lo
  que graba un usuario lo ve otro al entrar, en el mismo navegador. Trae 12 solicitudes en todos los estados, 8 cuentas
  registradas y notificaciones. Si cambian la forma de los datos, suban `VERSION` y se regeneran solos.
- **`src/app/mock/usuarios-demo.ts`** define los usuarios y sus perfiles. El token es un JWT sin firma: la app solo lee
  su vencimiento.
- Las notificaciones en tiempo real (socket) están apagadas: la campana se actualiza al iniciar sesión y al abrirla.

## Estructura

```text
src/app/
├── core/            API, sesión y permisos, interceptores, estado de las solicitudes y notificaciones
│   ├── kit/         fuentes de datos del kit (sesión, notificaciones, bandeja, historiales y documentos)
│   └── procesos/    registro de procesos: lo que el armazón sabe de cada uno, sin importar su módulo
├── features/        login, recuperar contraseña y catálogo /ui-kit
├── layout/          armazón propio (app-shell) y escritorio virtual; la barra, los menús y la bandeja vienen del kit
├── mock/            backend simulado, datos iniciales y usuarios de demostración
├── modules/
│   └── tesoreria/cuentas-bancarias/
│       ├── api/     llamadas del proceso
│       ├── config/  rutas, columnas y filtros de Documentos y registros
│       ├── models/  tipos y catálogos (bancos, monedas, tipos de cuenta)
│       ├── pages/   documents · solicitud · consultas
│       └── utils/   exportación a Excel, CSV y PDF
└── shared/
    ├── types/       tipos de las plantillas (reexportados del kit)
    └── utils/       árbol de procesos del menú, migas de pan, fechas…
vendor/              el paquete del kit (.tgz) que instala npm
```

## Cómo sumar un proceso

Tomen como modelo `modules/tesoreria/cuentas-bancarias/`:

1. **Modelo y API** del proceso en `modules/<área>/<proceso>/`.
2. **Backend simulado**: sus rutas en `RUTAS` de `mock-backend.interceptor.ts` y sus datos iniciales en `mock-db.ts`.
3. **Pantallas** con las plantillas: `siaf-documents-records-page` (se arma con una configuración),
   `siaf-solicitude-page-layout` para la solicitud y `siaf-query-report-page` para las consultas.
4. **Rutas** en `modules/<área>/<área>.routes.ts`, cargadas desde `app.routes.ts`.
5. **Menú y migas de pan**: sus hojas en `shared/utils/process-tree.util.ts` (`DEFAULT_PROCESS_TREE`).
6. **Crear documento y notificaciones**: el tipo de documento en `/tipos-documento` del backend simulado y la ficha del
   proceso (`ProcesoRegistrado`: rutas de sus solicitudes y opciones de «Crear documento») en su `config/`, registrada
   con `provideProcesos(...)` en `main.ts`. El armazón y las notificaciones la leen de ahí: no se tocan.

Antes de escribir markup, busquen el componente en `/ui-kit`: casi todo ya existe.

## Comandos

| Comando | Para qué |
| --- | --- |
| `npm start` | Servidor de desarrollo |
| `npx ng build --configuration=development` | Compilar |
| `npx ng test --watch=false --browsers=ChromeHeadless` | Pruebas unitarias |
| `npm run ui-kit:manifest` | Regenerar las fichas del catálogo, sus cargadores y su Markdown tras actualizar el kit (o cambiar el armazón) |
| `npm run ui-kit:check` | Verificar que el catálogo está al día |
| `npm run icons:check` | Verificar que los íconos existen en Material Icons |

## El kit de componentes

Los componentes, los tokens del Figma (claro y oscuro) y los estilos vienen del paquete
`@kennedy122112/siaf-rp-ui-angular`, que **no está en npm**: su `.tgz` va en `vendor/` y `package.json` lo instala
desde ahí (`file:vendor/…`). No se editan: si algo del kit no alcanza, se compone en la pantalla o se pide en el
SIAF-RP.

- **Estilos**: `src/styles.css` importa `estilos/tema.css` del kit (tokens, `@theme` de Tailwind y la capa
  `components`); sus imágenes se copian a `assets/` desde `angular.json`.
- **Fuentes de datos**: la barra superior, la bandeja, los paneles de historial y «Documentos y registros» no llaman a
  la API: piden sus datos a clases `Fuente*` del kit, que el taller implementa en `core/kit/fuentes-kit.ts` sobre el
  backend simulado y registra en `main.ts`.
- **Catálogo**: `npm run ui-kit:manifest` arma las fichas de `/ui-kit` leyendo el paquete instalado (su JavaScript y
  sus tipos, con el JSDoc: uso, limitaciones, «así no / así sí», WAI-ARIA…). También escribe `ui-kit.cargadores.ts`
  (los componentes del playground y la versión del kit) y la versión en Markdown en `public/`: `llms.txt` y una ficha
  `.md` por componente, para leerla fuera de la app o pasársela a un asistente de IA.

**Para actualizarlo**: copiar el `.tgz` nuevo a `vendor/` (y borrar el anterior), cambiar la ruta en `package.json`,
`npm install`, leer la sección «Actualizar desde otra versión» del README del paquete
(`node_modules/@kennedy122112/siaf-rp-ui-angular/README.md`) y correr `npm run ui-kit:manifest`. Si trae componentes
nuevos, los tests piden su categoría en `ui-kit.catalogo.ts` y su ejemplo en `features/ui-kit/ejemplos/`.
