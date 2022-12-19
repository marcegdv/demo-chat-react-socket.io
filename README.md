# demo-chat-react-socket.io

## Instalación y ejecución:

Para ejecutar el contenido del repo, instalar las dependencias del client y el server, ingresando a dichas carpetas, y en la consola ingresar el comando `npm i`.
Luego para iniciar la ejecucion de cada uno, en la consola ingresar `npm run start`. En el caso del server también se puede utilizar el comando `npm run dev`.

## Contenido

- Un cliente realizado en React para poder chatear.
- Un servidor que maneja la mensajería y eventos que provienen de los clientes.

## Funcionamiento

Al ingresar a la url de la app, se requiere de ingresar un nombre para comenzar a chatear en algún canal o con otro cliente.
Los canales comienzan con el símbolo `#`. Para crear un canal debe ingresarse dicho símbolo, de lo contrario, se intentará iniciar un chat con algún cliente que tenga el nombre ingresado.

Los canales guardan el chat, pero los chats entre clientes se pierden por motivos de que los clientes no tienen un id fijo, por lo que al desconectarse, el id se pierde por no existir registro de usuarios.

## Descripción

- El objetivo de este repo fué aprender conceptos sobre la librería Socket.IO y como implementarlo con React.

Nota: Tanto el cliente como el servidor, no son códigos definitivos, sobre todo el cliente que será utilizado para un próximo objetivo personal para aprende otros hooks de React, limpiar el código y para poder hacerlo mas reutilizable.