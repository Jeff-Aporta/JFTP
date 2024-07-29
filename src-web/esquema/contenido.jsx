const _JFTP_ = new GenerarContenidoLibreria({
    nombre: "JFTP",
    slogan: "Controlador FTP (File Transfer Protocol)",
    img: "src-web/img/logo.jpeg",

    github: "https://github.com/Jeff-Aporta/libreria-java-JFTP",

    resumen: {
            desc: `
            Conecta fácilmente a tu servidor FTP, sube archivos y gestiona tus datos de manera eficiente. ¡Empieza ahora y optimiza tus procesos de transferencia de archivos!

            Implementa todas las funciones de JFTP integrado en su aplicación.
            `,
            descImg: [
                    "Transferir archivos (cargar y descargar)",
                    "Explorar el sitio FTP remoto (incluido el listado de directorios)",
                    "Crear, eliminar, cambiar el nombre y mover directorios y archivos remotos"
            ]
    },

    secciones: [
        {
            nombre: "Requisitos",
            contenido: () => {
                return <ul className="punto-centrico">
                    <LIDoc>
                        Java Runtime Environment J2SE v.1.4 o posterior.
                    </LIDoc>
                </ul>
            }
        },
        {
            nombre: "Instalación",
            contenido: () => {
                return `
                    Agregue el archivo JFTP.jar a la ruta de clase de su aplicación y se le
                    habilitará automáticamente el uso de las clases JFTP.
                `
            }
        },
        {
            nombre: "Inicio rápido",
            contenido: () => {
                return <React.Fragment>
                    La clase principal de la biblioteca es FTPClient (JFTP.FTPClient).
                    <br /><br />
                    Comience a crear una instancia de FTPClient:

                    <CodeJava linenumbers={false}>
                        import JFTP.FTPClient; // No olvide importar la clase FTPClient
                    </CodeJava>

                    <CodeJava linenumbers={false}>
                        FTPClient client = new FTPClient();
                    </CodeJava>

                    Conéctese ahora a un servicio FTP remoto:

                    <CodeJava>
                        client.connect("ftp.host.com");
                    </CodeJava>

                    Si el puerto de servicio no es el estándar 21 (o 990 si es FTPS):

                    <CodeJava>
                        client.connect("ftp.host.com", port);
                    </CodeJava>

                    Por ejemplo:

                    <CodeJava>
                        client.connect("ftp.host.com", 8021);
                    </CodeJava>

                    Paso ahora al procedimiento de inicio de sesión:

                    <CodeJava>
                        client.login("jeff-agudelo", "mi-contraseña.123");
                    </CodeJava>

                    Si no se produce ninguna excepción, ahora estará autenticado en el servidor
                    remoto. De lo contrario, si el intento de autenticación falla, recibirá una
                    excepción JFTP.FTPException.

                    <br />
                    <br />

                    Haga lo que necesite con el servicio FTP remoto y luego desconéctelo:

                    <CodeJava>
                        client.disconnect(true);
                    </CodeJava>

                    Éste envía el comando FTP QUIT al servidor remoto, solicitando un
                    procedimiento de desconexión legal. Si sólo desea interrumpir la conexión,
                    sin enviar ningún aviso al servidor, llame a:

                    <CodeJava>
                        client.disconnect(false);
                    </CodeJava>

                </React.Fragment>
            }
        },
        {
            nombre: "Conexión a través de un proxy",
            contenido: () => {
                return <React.Fragment>

                    El cliente se conecta al servidor a través de un conector (un objeto que
                    extiende JFTP.FTPConnector), que devuelve al
                    cliente una conexión ya abierta (un objeto que implementa la interfaz
                    JFTP.FTPConnection). Es por eso que JFTP
                    podría admitir un gran conjunto de servidores proxy.

                    <br /><br />


                    El conector para una instancia de cliente se puede configurar con el método
                    setConnector(), obviamente antes de conectar el servidor remoto:

                    <CodeJava>
                        client.setConnector(cualquierConectorQueDesee);
                    </CodeJava>

                    El conector predeterminado, que se utiliza si no se configura ningún otro,
                    es DirectConnector (JFTP.connectors.DirectConnector), que realiza
                    una conexión directa al servidor remoto, sin solicitar la conexión a ningún
                    proxy.


                    Si puede conectar el servidor remoto solo a través de un proxy, la
                    biblioteca JFTP le permite elegir entre otros conectores:

                    <ul className="punto-centrico">
                        <LIDoc>
                            HTTPTunnelConnector (JFTP.connectors.HTTPTunnelConnector)<br />
                            Éste puede conectarse a través de un proxy HTTP que soporta y permite el
                            método CONNECT.
                        </LIDoc>
                        <LIDoc>
                            FTPProxyConnector (JFTP.connectors.FTPProxyConnector)<br />
                            Este puede conectarse a través de un proxy FTP, admitiendo tanto el estilo
                            de comando SITE como OPEN para solicitar la conexión con el host remoto.
                            Otros tipos de servidores proxy FTP, como los que requieren autenticación
                            de nombre de usuario@host remoto, se pueden usar sin un conector
                            específico, ya que fueron diseñados para ser transparentes para el
                            cliente.
                        </LIDoc>
                        <LIDoc>
                            SOCKS4Connector (JFTP.connectors.SOCKS4Connector)<br />
                            Este puede conectarse a través de un proxy SOCKS 4/4a.
                        </LIDoc>
                        <LIDoc>
                            SOCKS5Connector (JFTP.connectors.SOCKS5Connector)<br />
                            Este puede conectarse a través de un proxy SOCKS 5.
                        </LIDoc>
                    </ul>

                    Dado que la arquitectura del conector utilizada por JFTP es conectable,
                    siempre puede crear su propio conector ampliando la clase abstracta
                    FTPConnector.
                </React.Fragment>
            }
        },
        {
            nombre: "Conexión segura FTPS/FTPES",
            contenido: () => {
                return <React.Fragment>

                    La biblioteca JFTP admite tanto FTPS (FTP sobre TLS/SSL implícito) como
                    FTPES (FTP sobre TLS/SSL explícito).


                    El método setSecurity() se puede utilizar para activar la función:

                    <CodeJava>
                        client.setSecurity(FTPClient.SECURITY_FTPS); // Habilita FTPS
                    </CodeJava>

                    <CodeJava>
                        client.setSecurity(FTPClient.SECURITY_FTPES); // Habilita FTPES
                    </CodeJava>

                    Se deben llamar a ambos métodos antes de conectar el servidor remoto.

                    <br /><br />

                    Si la seguridad está configurada en SECURITY_FTPS, el puerto
                    predeterminado utilizado por el método connect() cambia a 990.

                    <br /><br />

                    El objeto cliente, de forma predeterminada, negocia conexiones SSL
                    utilizando la fábrica de sockets SSL proporcionada por
                    javax.net.ssl.SSLSocketFactory.getDefault(). La fábrica de sockets
                    predeterminada se puede cambiar llamando al método
                    setSSLSocketFactory() del cliente. Se puede utilizar un
                    SSLSocketFactory alternativo, por ejemplo, para confiar en cada
                    certificado proporcionado por el host remoto (úselo con cuidado):

                    <h2>
                        Importaciones
                    </h2>
                    <CodeJava>{`
                            import JFTP.FTPClient;
                            import java.security.KeyManagementException;
                            import java.security.NoSuchAlgorithmException;
                            import java.security.SecureRandom;
                            import java.security.cert.X509Certificate;
                            import javax.net.ssl.SSLContext;
                            import javax.net.ssl.SSLSocketFactory;
                            import javax.net.ssl.TrustManager;
                            import javax.net.ssl.X509TrustManager;
                    `}</CodeJava>

                    <h2>
                        Implementación genérica
                    </h2>
                    <CodeJava>{`
                            TrustManager[] trustManager = new TrustManager[] {new X509TrustManager() {
                                public X509Certificate[] getAcceptedIssuers() {
                                    return null;
                                }
                                public void checkClientTrusted(X509Certificate[] certs, String authType) {
                                }
                                public void checkServerTrusted(X509Certificate[] certs, String authType) {
                                }
                            }};

                            SSLContext sslContext = null;

                            try {
                                sslContext = SSLContext.getInstance("SSL");
                                sslContext.init(null, trustManager, new SecureRandom());
                            } catch (NoSuchAlgorithmException e) {
                                e.printStackTrace();
                            } catch (KeyManagementException e) {
                                e.printStackTrace();
                            }
                                
                            SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();
                            FTPClient client = new FTPClient();
                            client.setSSLSocketFactory(sslSocketFactory);
                            client.setSecurity(FTPClient.SECURITY_FTPS); // or client.setSecurity(FTPClient.SECURITY_FTPES);
                    `}</CodeJava>
                </React.Fragment>
            }
        },
        {
            nombre: "Navegando por el sitio remoto",
            contenido: () => {
                return <React.Fragment>
                    Obtenga la ruta absoluta del directorio actual llamando a:

                    <CodeJava>
                        String dir = client.currentDirectory();
                    </CodeJava>

                    Cambiar directorio con:

                    <CodeJava>
                        client.changeDirectory(newPath);
                    </CodeJava>

                    Puede utilizar rutas absolutas y relativas:

                    <CodeJava>
                        client.changeDirectory("/an/absolute/one");
                        <br />
                        client.changeDirectory("relativo");
                    </CodeJava>

                    Regrese al directorio principal con:

                    <CodeJava>
                        client.changeDirectoryUp();
                    </CodeJava>

                </React.Fragment>
            }
        },
        {
            nombre: "Cambiar el nombre de archivos y directorios",
            contenido: () => {
                return <React.Fragment>
                    Para cambiar el nombre de un archivo o directorio remoto:

                    <CodeJava>
                        client.rename("nombre-antiguo.ext", "nombre-nuevo.ext");
                    </CodeJava>
                </React.Fragment>
            }
        },
        {
            nombre: "Mover archivos y directorios",
            contenido: () => {
                return <React.Fragment>
                    El método rename() también se puede utilizar para mover archivos y
                    directorios de una ubicación a otra.


                    Por ejemplo, piense que en el directorio de trabajo actual tiene un archivo
                    llamado "miarchivo.txt" y desea moverlo al subdirectorio "micarpeta":

                    <CodeJava>
                        client.rename("miarchivo.txt", "micarpeta/miarchivo.txt");
                    </CodeJava>
                </React.Fragment>
            }
        },
        {
            nombre: "Eliminar archivos y directorios",
            contenido: () => {
                return <React.Fragment>
                    Para eliminar una llamada de archivo remoto:

                    <CodeJava>
                        client.deleteFile(relativeOrAbsolutePath);
                    </CodeJava>

                    Por ejemplo:

                    <CodeJava>
                        client.deleteFile("useless.txt");
                    </CodeJava>
                </React.Fragment>
            }
        },
        {
            nombre: "Crear y eliminar directorios",
            contenido: () => {
                return <React.Fragment>

                    Puede crear un nuevo directorio en el sitio remoto, si el servicio le brinda
                    esta oportunidad:

                    <CodeJava>
                        client.createDirectory("nueva-carpeta");
                    </CodeJava>

                    También puedes eliminar uno existente:

                    <CodeJava>
                        client.deleteDirectory(absoluteOrRelativePath);
                    </CodeJava>

                    Por ejemplo:

                    <CodeJava>
                        client.deleteDirectory("carpeta-antigua");
                    </CodeJava>

                    Tenga en cuenta que normalmente los servidores FTP sólo pueden eliminar
                    directorios vacíos.

                </React.Fragment>
            }
        },
        {
            nombre: "Listado de archivos, directorios y enlaces",
            contenido: () => {
                return <React.Fragment>

                    El protocolo FTP no ofrece un método ampliamente compatible para obtener información completa sobre el
                    contenido del directorio de trabajo. El comando LIST normalmente proporciona todo lo que necesita saber,
                    pero desafortunadamente cada servidor puede usar un estilo diferente para la respuesta. Esto significa que
                    algunos servidores devuelven una lista de directorios estilo UNIX, algunos servidores prefieren el estilo
                    DOS, otros usan algunos alternativos.

                    <br /><br />

                    La biblioteca JFTP puede manejar muchos formatos de respuesta LIST, creando a partir de ellos una
                    representación de objeto estructurado unificado del contenido del directorio. Actualmente JFTP puede manejar:

                    <ul className="punto-centrico">
                        <LIDoc>Estilo UNIX y variantes (es decir, estilo MAC)</LIDoc>
                        <LIDoc>estilo DOS</LIDoc>
                        <LIDoc>Estilos NetWare</LIDoc>
                        <LIDoc>EPLF</LIDoc>
                        <LIDoc>MLSD</LIDoc>
                    </ul>

                    Esto se hace mediante analizadores conectables. El paquete JFTP.listparsers contiene los
                    que manejan los estilos enumerados anteriormente. La mayoría de las veces esto debería ser suficiente.

                    <br /><br />

                    Para enumerar las entradas actuales del directorio de trabajo, llame a:

                    <CodeJava>
                        FTPFile[] list = client.list();
                    </CodeJava>

                    Si recibe una FTPListParseException (JFTP.FTPListParseException), significa que el
                    servidor ha respondido al comando LIST en un estilo incomprensible, es decir, ninguno de los enumerados
                    anteriormente. Entonces puedes probar con el método listNames(), pero es menos rentable que el método list().

                    <br /><br />

                    cree su propio analizador de respuestas LIST, compatible con el estilo que ha encontrado. Puede hacerlo
                    implementando la interfaz FTPListParser (JFTP.FTPListParser). Luego puede conectar una
                    instancia de su analizador en el cliente llamando al método addListParser().

                    Los objetos FTPFile (JFTP.FTPFile) ofrecen una representación del contenido del directorio, incluidos archivos, subdirectorios y enlaces. Dependiendo de la respuesta proporcionada por el servidor, algunos campos de un objeto FTPFile podrían ser nulos o estar configurados con valores sin sentido. Consulte los javadocs para obtener más detalles.


                    También puede utilizar un parámetro de filtro de archivos con el método list(), es decir:

                    <CodeJava>
                        FTPFile[] list = client.list("*.jpg");
                    </CodeJava>

                    Si el servidor conectado declara explícitamente que admite el comando MLSD especial, JFTP lo usará en
                    lugar del comando LIST básico. De hecho, las respuestas de MLSD son estándar, precisas y más fáciles de
                    analizar. Lamentablemente, no todos los servidores admiten este comando y algunos no lo admiten
                    correctamente. Por estas razones, el desarrollador puede controlar si JFTP debe usar el comando MLSD
                    llamando al método setMLSDPolicy() de un objeto FTPClient. Los valores admitidos son:

                    <ul className="punto-centrico">
                        <LIDoc>
                            FTPClient.MLSD_IF_SUPPORTED
                            <br />
                            El cliente utilizará el comando MLSD (en lugar de LIST) sólo si el servidor declara explícitamente
                            su soporte. Este es el comportamiento predeterminado de JFTP.
                        </LIDoc>
                        <LIDoc>
                            FTPClient.MLSD_ALWAYS
                            <br />
                            El cliente siempre utilizará el comando MLSD (en lugar de LIST), incluso si el servidor no lo admite
                            explícitamente.
                        </LIDoc>
                        <LIDoc>
                            FTPClient.MLSD_NEVER
                            <br />
                            El cliente nunca utilizará el comando MLSD (en lugar de LIST), incluso si el servidor lo admite explícitamente.
                        </LIDoc>
                    </ul>

                    Por ejemplo:

                    <CodeJava>
                        client.setMLSDPolicy(FTPClient.MLSD_NEVER);
                    </CodeJava>

                </React.Fragment>
            }
        },
        {
            nombre: "Obtener la fecha de modificación de archivos y directorios",
            contenido: () => {
                return <React.Fragment>

                    Por lo general, un objeto FTPFile le informa sobre la última fecha de modificación de una entrada, pero como se describió
                    anteriormente, eso depende de la respuesta enviada por el servidor. Si necesita una fecha de modificación y no puede
                    obtenerla mediante el método list(), intente esto:

                    <CodeJava>
                        java.util.Date md = client.modifiedDate("nombre-de-archivo.ext");
                    </CodeJava>

                </React.Fragment>
            }
        },
        {
            nombre: "Descarga y carga de archivos",
            contenido: () => {
                return <React.Fragment>

                    La forma más sencilla de descargar un archivo remoto es llamar al método de descarga (Cadena, Archivo):

                    <CodeJava>
                        client.download("remoteFile.ext", new java.io.File("localFile.ext"));
                    </CodeJava>

                    Para subir:

                    <CodeJava>
                        client.upload(new java.io.File("localFile.ext"));
                    </CodeJava>

                    Para cargar contenidos adjuntos a un archivo existente:

                    <CodeJava>
                        client.append(new java.io.File("localFile.ext"));
                    </CodeJava>

                    Estas son llamadas de bloqueo: regresarán solo cuando la transferencia se complete (o falle o se cancele). Además,
                    se impone un bloqueo de sincronización al cliente, ya que en una comunicación FTP normal sólo se permite una
                    transferencia por hora. Puede manejar múltiples transferencias por vez usando varios objetos FTPClient,
                    cada uno de los cuales establece una conexión separada con el servidor.

                    <br /><br />

                    Puede monitorear transferencias con objetos FTPDataTransferListener ( JFTP.FTPDataTransferListener).
                    Implemente el suyo:

                    <CodeJava>{`
                        import JFTP.FTPDataTransferListener;

                        public class MyTransferListener implements FTPDataTransferListener {

                            public void started() {
                                // Transferencia iniciada 
                            }

                            public void transferred(int length) {
                                // Se han transferido otros bytes de longitud desde la última 
                                // vez que se llamó a este método 
                            }

                            public void completed() {
                                // Transferencia completada 
                            }

                            public void aborted() {
                                // Transferencia abortada 
                            }

                            public void failed() {
                                // Transferencia fallida 
                            }

                        }
                    `}</CodeJava>

                    Ahora descargue o cargue de la siguiente manera:

                    <CodeJava>
                        client.download("remoteFile.ext", new java.io.File("localFile.ext"), new MyTransferListener());
                    </CodeJava>
                    <CodeJava>
                        client.upload(new java.io.File("localFile.ext"), new MyTransferListener());
                    </CodeJava>
                    <CodeJava>
                        client.append(new java.io.File("localFile.ext"), new MyTransferListener());
                    </CodeJava>

                    Mientras el cliente descarga o carga, otro subproceso puede cancelar la transferencia llamando al método
                    abortCurrentDataTransfer() en el mismo objeto FTPClient. Éste requiere un parámetro booleano: verdadero
                    para realizar un procedimiento de aborto legal (se envía un comando ABOR al servidor), falso para cerrar
                    abruptamente la transferencia sin previo aviso:

                    <CodeJava>
                        client.abortCurrentDataTransfer(true); // envía ABOR
                    </CodeJava>
                    <CodeJava>
                        client.abortCurrentDataTransfer(false); // Se rompe abruptamente
                    </CodeJava>

                    Tenga en cuenta que también los métodos list() y listNames() implican una transferencia de datos (la respuesta
                    se sirve en un canal de transferencia de datos), por lo que el método abortCurrentDataTransfer() también se
                    puede utilizar para interrumpir un procedimiento de lista.

                    <br /><br />

                    Cuando se cancela una transferencia de datos, los métodos download(), upload(), append(), list() y listNames()
                    mueren arrojando una FTPAbortedException ( JFTP.FTPAbortedException).

                    <br /><br />

                    La operación de descarga y carga se puede reanudar suministrando un parámetro restartAt:

                    <CodeJava>
                        client.download("remoteFile.ext", new java.io.File("localFile.ext"), 1056);
                    </CodeJava>

                    Éste reanuda la operación de descarga a partir del byte 1056 del archivo. El primer byte transferido será el 1057.

                    Otras variantes download(), upload() y append() permiten trabajar con secuencias en lugar de objetos java.io.File.
                    Así también puedes transferir datos desde y hacia una base de datos, una conexión de red o cualquier otra cosa.

                </React.Fragment>
            }
        },
        {
            nombre: "Modos de transferencia de datos activos y pasivos",
            contenido: () => {
                return <React.Fragment>

                    Los canales de transferencia de datos se establecen a través de una conexión de red separada entre el cliente y el servidor.
                    El servidor podría ser activo o pasivo en el establecimiento del canal de transferencia. Cuando el servidor está activo, las
                    transferencias de datos funcionan de la siguiente manera:

                    <ol>
                        <LIDoc>
                            El cliente envía al servidor su dirección IP y un número de puerto.
                        </LIDoc>
                        <LIDoc>
                            El cliente solicita al servidor una transferencia de datos y este comienza a escuchar el puerto enviado
                            anteriormente.
                        </LIDoc>
                        <LIDoc>
                            El servidor conecta la dirección y el puerto proporcionados por el cliente.
                        </LIDoc>
                        <LIDoc>
                            La transferencia de datos se inicia en el nuevo canal establecido.
                        </LIDoc>
                    </ol>

                    El modo activo requiere que su cliente pueda recibir conexiones entrantes desde el servidor. Si su cliente está detrás
                    de un firewall, un proxy, una puerta de enlace o una combinación de ellos, la mayoría de las veces eso es un problema,
                    ya que no puede recibir conexiones entrantes desde el exterior. Aquí viene el modo de transferencia pasiva de datos:

                    <ol>
                        <LIDoc>
                            El cliente solicita al servidor que prepare una transferencia de datos pasiva.
                        </LIDoc>
                        <LIDoc>
                            El servidor responde con su dirección IP y un número de puerto.
                        </LIDoc>
                        <LIDoc>
                            El cliente solicita la transferencia y se conecta.
                        </LIDoc>
                        <LIDoc>
                            La transferencia de datos se inicia en el nuevo canal establecido.
                        </LIDoc>
                    </ol>

                    En modo pasivo, el cliente se conecta al servidor: no se requiere ninguna conexión entrante.

                    <br /><br />

                    Con JFTP puedes cambiar entre los modos activo y pasivo llamando a:

                    <CodeJava>
                        client.setPassive(false); // modo activo
                    </CodeJava>
                    <CodeJava>
                        client.setPassive(true); // Modo pasivo
                    </CodeJava>

                    El valor predeterminado para un indicador pasivo de cliente JFTP es verdadero : si nunca llama a setPassive(false),
                    su cliente actuará siempre solicitando el modo pasivo al servidor antes de cada transferencia.

                    <br /><br />

                    Cuando se negocia una transferencia pasiva de archivos, el servidor proporciona una dirección IP y un número de puerto.
                    El cliente, según las especificaciones FTP, debe conectarse al host y al puerto indicados. En entornos empresariales,
                    este comportamiento suele ser problemático, ya que las configuraciones NAT podrían impedir conexiones literales a la
                    dirección IP determinada. Esta es la razón por la que los clientes FTP normalmente ignoran cualquier dirección IP
                    devuelta por el servidor y se conectan al mismo host utilizado para la línea de comunicación. El comportamiento de
                    JFTP depende de varios factores:

                    <ul className="punto-centrico">
                        <LIDoc>
                            Cada FTPConnector tiene un comportamiento predeterminado. La mayoría de los incluidos ignoran la dirección
                            IP devuelta por el servidor. Por el momento, el único conector oficial que por defecto utiliza la dirección
                            devuelta por el servidor es FTPProxyConnector.
                        </LIDoc>
                        <LIDoc>
                            El comportamiento del conector se puede anular globalmente definiendo la propiedad del sistema denominada
                            JFTP.passiveDataTransfer.useSuggestedAddress. Si es "true", "yes" o "1", cualquier conector siempre
                            utilizará la dirección devuelta por el servidor; de lo contrario, si el valor de la propiedad del
                            sistema es "false", "no" o "0", ningún conector nunca lo utilizará.
                        </LIDoc>
                        <LIDoc>
                            Finalmente, el comportamiento predeterminado del conector y la configuración global se pueden anular
                            fácilmente en cualquier instancia del conector. Puede lograr esto recuperando el conector de su cliente
                            y llamando a su método setUseSuggestedAddressForDataConnections(). Este es el mejor control que puedes obtener,
                            ya que puedes elegir el comportamiento en cualquier caso y también antes de cualquier transferencia de archivos,
                            si es necesario.
                        </LIDoc>
                    </ul>

                    En el modo de transferencia activo, se pueden configurar las siguientes propiedades del sistema:

                    <ul className="punto-centrico">
                        <LIDoc>

                            JFTP.activeDataTransfer.hostAddress
                            <br />
                            Dirección del host. El cliente reenviará al servidor la dirección proporcionada, cuando se le solicite al
                            servidor que realice una conexión con el cliente. El valor debe ser una dirección IPv4 válida en formato abcd.
                            Es decir, 178.12.34.167. Si no se proporciona el valor, el cliente resuelve automáticamente la dirección del
                            sistema. Pero si el cliente se ejecuta en una LAN, conectando un servidor externo a través de un enrutador con
                            servicio de reenvío de puertos para transferencias de datos activas, la dirección detectada automáticamente podría
                            no ser la correcta. Esto también debería suceder cuando el sistema tiene más interfaces de red. Al utilizar esta
                            propiedad del sistema se pueden resolver este tipo de problemas.

                        </LIDoc>
                        <LIDoc>

                            JFTP.activeDataTransfer.portRange
                            <br />
                            Rango de puertos de conexión. El cliente elegirá un puerto dentro del rango para la transferencia de datos. El
                            valor debe estar en formato start-stop. Es decir, 6000-7000 significa que el cliente seleccionará puertos sólo
                            entre el intervalo dado cuando le pedirá al servidor que realice una conexión. De forma predeterminada, no se
                            especifica ningún rango: eso significa que el cliente puede elegir cualquier puerto disponible.

                        </LIDoc>
                        <LIDoc>

                            JFTP.activeDataTransfer.acceptTimeout
                            <br />
                            Un valor en milisegundos que se seleccionará como tiempo de espera de la conexión. Si el servidor no conecta al
                            cliente dentro del tiempo de espera dado, la transferencia se interrumpe generando una FTPDataTransferException.
                            Un valor igual a 0 significa que no se aplicará ningún tiempo de espera. El valor predeterminado
                            es 30000 (30 segundos).

                        </LIDoc>
                    </ul>

                </React.Fragment>
            }
        },
        {
            nombre: "Tipos de transferencia de datos binarios y textuales",
            contenido: () => {
                return <React.Fragment>

                    Otro concepto clave en la transferencia de datos se refiere a los tipos binario y textual. Cuando una
                    transferencia es binaria, el archivo se trata como una secuencia binaria y la máquina de destino lo almacena
                    tal como se recibe del origen. En cambio, una transferencia de datos textuales trata el archivo transferido
                    como una secuencia de caracteres y realiza una transformación del juego de caracteres. Supongamos que su
                    cliente se ejecuta en una plataforma Windows, mientras que el servidor se ejecuta en UNIX, cuyos conjuntos
                    de caracteres predeterminados suelen ser diferentes. El cliente envía un archivo al servidor seleccionando
                    el tipo de texto. El cliente asume que el archivo está codificado con el juego de caracteres estándar de la
                    máquina, por lo que decodifica cada carácter y lo codifica en un juego de caracteres intermedio antes de
                    enviarlo. El servidor recibe la transmisión, decodifica el juego de caracteres intermedio y codifica el archivo
                    con el juego de caracteres predeterminado de la máquina antes de almacenarlo. Se han cambiado los bytes,
                    pero el contenido es el mismo.

                    <br /><br />

                    Puedes elegir tu tipo de transferencia llamando:

                    <CodeJava>
                        client.setType(FTPClient.TYPE_TEXTUAL);
                    </CodeJava>
                    <CodeJava>
                        client.setType(FTPClient.TYPE_BINARY);
                    </CodeJava>
                    <CodeJava>
                        client.setType(FTPClient.TYPE_AUTO);
                    </CodeJava>

                    La constante TYPE_AUTO, que también es la predeterminada, permite al cliente elegir el tipo automáticamente:
                    se realizará una transferencia textual si la extensión del archivo está entre las que el cliente reconoce como
                    marcadores de tipo textual. Las extensiones de archivo se detectan a través de una instancia de
                    FTPTextualExtensionRecognizer ( JFTP.FTPTextualExtensionRecognizer). El reconocedor de
                    extensiones predeterminado, que es una instancia de  JFTP.recognizers.DefaultTextualExtensionRecognizer,
                    reconoce estas extensiones como textuales:

                    <CodeJava nocode>{`
                        abc acgi aip asm asm asp cc com conf cpp 
                        csh css cxx def el etx ff f77 f90 f90 flx 
                        for ghh hh hh hlb htc htm html htmls
                        htt htx idc jav jav java java js ksh list
                        log lsp lst lsx mm mar mcf p pas php pl 
                        pm py rexx rt rtf rtx s cm scm sdml
                        sgm sgml sh shtml shtml spc ssi hablar 
                        tcl tcsh texto tsv txt uil uni unis
                        uri uris uu uue vcs wml wmls wsc xml zsh
                    `}</CodeJava>

                    Puede crear su propio reconocedor implementando la interfaz
                    FTPTextualExtensionRecognizer, pero tal vez le guste más crear una
                    instancia de la clase de conveniencia
                    ParametricTextualExtensionRecognizer (JFTP.recognizers.ParametricTextualExtensionRecognizer).
                    De todos modos, no olvides conectar tu reconocedor en el cliente:

                    <CodeJava>
                        client.setTextualExtensionRecognizer(myRecognizer);
                    </CodeJava>

                </React.Fragment>
            }
        },
        {
            nombre: "Compresión de transferencia de datos",
            contenido: () => {
                return <React.Fragment>

                    Algunos servidores admiten una función de compresión de transferencia de
                    datos llamada MODE Z. Esta función es útil para ahorrar ancho de banda en
                    transferencias de archivos grandes. Una vez que el cliente está conectado al
                    servidor y autenticado, se puede verificar el soporte de compresión llamando
                    a:

                    <CodeJava>
                        boolean compressionSupported = client.isCompressionSupported();
                    </CodeJava>

                    Si la compresión se admite en el lado del servidor, se puede habilitar
                    llamando a:

                    <CodeJava>
                        client.setCompressionEnabled(true);
                    </CodeJava>

                    Después de esta llamada, cualquier transferencia de datos posterior
                    (descargas, cargas y operaciones de listas) se comprimirá, ahorrando ancho
                    de banda.

                    La compresión de transferencia de datos se puede desactivar nuevamente
                    llamando a:

                    <CodeJava>
                        client.setCompressionEnabled(false);
                    </CodeJava>

                    El valor de la bandera también se puede verificar:

                    <CodeJava>
                        boolean compressionEnabled = client.isCompressionEnabled();
                    </CodeJava>

                    Tenga en cuenta que la transferencia de datos comprimidos se realizará solo
                    si la compresión está habilitada y admitida.

                    De forma predeterminada, la compresión está deshabilitada, incluso si el
                    servidor la admite. Si es necesario, debe activarse explícitamente.

                </React.Fragment>
            }
        },
        {
            nombre: "NOOPing el servidor",
            contenido: () => {
                return <React.Fragment>

                    Supongamos que su cliente no está haciendo nada ya que está esperando la
                    entrada del usuario. Normalmente los servidores FTP desconectan
                    automáticamente un cliente inactivo. Para evitar este tiempo de espera,
                    puede enviar de vez en cuando un comando NOOP. Este no hace nada más que
                    indicarle al servidor que el cliente todavía está vivo, reiniciando el
                    contador de tiempo de espera. Llamar:

                    <CodeJava>
                        cliente.noop();
                    </CodeJava>

                    El cliente también puede emitir NOOP automáticos cuando se produce un tiempo
                    de espera de inactividad. De forma predeterminada, esta función está
                    desactivada. Se puede habilitar configurando la duración del tiempo de
                    espera con el método setAutoNoopTimeout(), proporcionando un valor
                    expresado en milisegundos. Por ejemplo:

                    <CodeJava>
                        cliente.setAutoNoopTimeout(30000);
                    </CodeJava>

                    Con este valor, el cliente emitirá un comando NOOP después de 30 segundos de
                    inactividad.

                    El tiempo de espera NOOP automático se puede desactivar nuevamente
                    utilizando un valor igual o menor que cero:

                    <CodeJava>
                        cliente.setAutoNoopTimeout(-1);
                    </CodeJava>

                </React.Fragment>
            }
        },
        {
            nombre: "Comandos personalizados y específicos del sitio",
            contenido: () => {
                return <React.Fragment>

                    Puede enviar comandos específicos del sitio de la siguiente manera:

                    <CodeJava>
                        FTPReply respuesta = client.sendSiteCommand("SU COMANDO");
                    </CodeJava>

                    También puedes enviar comandos personalizados:

                    <CodeJava>
                        FTPReply respuesta = client.sendCustomCommand("SU COMANDO");
                    </CodeJava>

                    Tanto sendSiteCommand() como sendCustomCommand() devuelven
                    un objeto FTPReply (JFTP.FTPReply).
                    Con este podrás comprobar la respuesta recibida, obteniendo el código de
                    respuesta del servidor y el mensaje. La interfaz FTPCodes (JFTP.FTPCodes) informa algunos códigos de
                    respuesta FTP comunes, por lo que puede intentar hacer coincidir su código
                    de respuesta con uno de los que la biblioteca conoce con seguridad.

                </React.Fragment>
            }
        },
        {
            nombre: "Manejo de excepciones",
            contenido: () => {
                return <React.Fragment>

                    La biblioteca JFTP define cinco tipos de excepciones:

                    <ul className="punto-centrico">
                        <LIDoc>
                            FTPException (JFTP.FTPException)<br />
                            Dependiendo del método, este se lanza para informar una falla de FTP.
                            Puede verificar el código de error informado y compararlo con las
                            constantes FTPCodes para obtener más detalles sobre el motivo del
                            error.
                        </LIDoc>
                        <LIDoc>
                            FTPIllegalReplyException (JFTP.FTPIllegalReplyException)<br />
                            Esto significa que el servidor remoto ha respondido de forma ilegal, es
                            decir, no compatible con FTP. Eso debería ser muy raro.
                        </LIDoc>
                        <LIDoc>
                            FTPListParseException (JFTP.FTPListParseException)<br />
                            Esta es lanzada por el método list() si la respuesta enviada por
                            el servidor no se puede analizar a través de los analizadores de listas
                            conocidos por el cliente.
                        </LIDoc>
                        <LIDoc>
                            FTPDataTransferException (JFTP.FTPDataTransferException)<br />
                            Esta se produce si una transferencia de datos (descarga,
                            carga, pero también lista y nombres de lista)
                            falla debido a un error de conexión de red.
                        </LIDoc>
                        <LIDoc>
                            FTPAbortedException (JFTP.FTPAbortedException)<br />
                            Esta se produce si una transferencia de datos (descarga,
                            carga, pero también lista y nombres de lista)
                            falla debido a una solicitud de cancelación del cliente.
                        </LIDoc>
                    </ul>

                </React.Fragment>
            }
        }
    ],
});