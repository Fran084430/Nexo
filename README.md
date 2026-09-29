# Islas del Comercio

Web local de estrategia por turnos, creada como proyecto escolar con estética y nombre propios. Se abre haciendo doble clic en `index.html`; está pensada para tablet en horizontal y no instala ni guarda nada.

## Incluye

- Vestíbulo con nombres e invitación local de 3 o 4 personas.
- Tablero variable de 19 hexágonos, números aleatorios y seis recursos/terrenos (incluido desierto).
- Colocación inicial en orden serpiente, producción por dados, bandido, descartes y robo.
- Rutas, aldeas, ciudades, distancias de construcción, recursos y costes.
- Comercio entre jugadores y mercado 4:1.
- Cartas de desarrollo, caballeros, ejército mayor, ruta más larga y final a 10 puntos.
- Pantalla final con clasificación y vuelta al menú, sin persistir información.

## Investigación y alcance

Como referencia de diseño se investigaron las páginas oficiales de Catan Universe y su FAQ en septiembre de 2026. Su oferta incluye el juego base, Navegantes (barcos, islas, piratas y oro), Ciudades y Caballeros (mercancías, bárbaros y metrópolis), escenarios especiales, El ascenso de los incas y Rivals. El servicio se descarga gratis y desbloquea contenido de forma permanente mediante Catan Gold; también ofrece personalización, niveles y temporadas competitivas.

Esta entrega evita copiar el nombre comercial, dibujos, tablero exacto, textos, economía de pago o contenido protegido. Implementa las mecánicas generales del juego base como una experiencia original. Para multijugador por Internet de verdad habría que añadir un servidor y autenticación (por ejemplo, WebSocket/Firebase); un archivo HTML abierto localmente no puede conectar jugadores de dispositivos distintos de forma fiable.

Fuentes oficiales consultadas:

- https://catanuniverse.com/en/
- https://catanuniverse.com/en/faq/
- https://catanuniverse.com/en/seafarers/
- https://catanuniverse.com/en/cities-knights/
- https://catanuniverse.com/en/catan-universe-additional-scenarios/
