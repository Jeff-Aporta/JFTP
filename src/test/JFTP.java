package test;

import JFTP.FTPClient;
import JFTP.FTPFile;

public class JFTP {

    public static void main(String[] args) throws Exception {
        FTPClient client = new FTPClient();
        client.connect("files.000webhost.com", 21);
        client.login("zona-sauron", "12345678");
        System.out.println("host: " + client.getHost());
        System.out.println("puerto: " + client.getPort());
        System.out.println("usuario: " + client.getUsername());
        System.out.println("contraseña: " + client.getPassword());
        System.out.println("conectado: " + client.isConnected());
        client.changeDirectory("/public_html");
//        client.rename("Hola.txt", "renombrado.txt");
//        client.changeDirectoryUp();
//        client.rename("Nueva carpeta/renombrado.txt", "renombrado.txt");
//        client.deleteFile("renombrado.txt");
//        client.createDirectory("newfolder");
//        client.deleteDirectory("Nueva carpeta");
        client.disconnect(true);
    }

}
