# Mensaje inicial
echo 
echo
echo "Bienvenido al asistente del servidor Front-End de Administrador de SegurosYa."
echo "Para asegurar la correcta instalacion debe asegurarse de tener permiso de super usuario que permita ejecutar instrucciones con el comando sudo."
echo "Asegurese de abrir los puertos 80 a cualquier destino tanto de entrada como salida y contar con acceso a internet."
echo "Este programa esta diseñado idealmente para sistemas operativos Ubuntu Server (22.04.2 LTS)."
echo "¿Deseas continuar? (y/n)"

# Lee la entrada del usuario
read respuesta

# Comprueba la respuesta del usuario
if [ "$respuesta" = "y" ]; then
    echo "Continuando..."
    # Resto del código
elif [ "$respuesta" = "n" ]; then
    echo "Saliendo..."
    exit 0
else
    echo "Respuesta inválida. Saliendo..."
    exit 1
fi

# Actualizar los repositorios
sudo apt-get update

# Instalar convertidor de texto de DOS a Unix
sudo apt-get install -y dos2unix

# Instalar editor de JSON por comando
sudo apt-get install -y jq

# Instalar Apache2
sudo apt-get install -y apache2

# Instalar Node.js y npm
sudo apt-get install -y nodejs npm


# Cierre temporal del servidor Apache
sudo service apache2 stop

# Obtencion de linkFrontEnd y linkBackEnd
source "./argumentos.txt"

# Ubicacion de package.json
package_file="./segurosya_frontend/package.json"

# Nuevo valor para la propiedad "homepage"
new_homepage="https://$linkFrontEnd"

# Modificar el valor de la propiedad "homepage" en el archivo package.json
jq --arg new_homepage "$new_homepage" '.homepage = $new_homepage' "$package_file" > temp.json && mv temp.json "$package_file"

# Creacion de archivos para servidor

# Modificacion de constante de servidor de FRONT END
contenidoLinkBackEnd="
module.exports = {
    LINKSERVER: \"$linkBackEnd:8080\",
};
"
echo "$contenidoLinkBackEnd" > ./segurosya_frontend/src/utiles/constantes.js

# Creacion de archivo SegurosYa.conf
contenidoVirtualConf="
<VirtualHost *:80>
	ServerName $linkFrontEnd

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/html

	<Directory /var/www/html>
		Options -Indexes +FollowSymLinks +MultiViews
		AllowOverride All
		Require all granted

		RewriteEngine on
		RewriteCond %{REQUEST_FILENAME} -f [OR]
		RewriteCond %{REQUEST_FILENAME} -d
		RewriteRule ^ - [L]
		# Rewrite everything else to index.html to allow html5 state links
		RewriteRule ^ index.html [L]
	</Directory>

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined	
</VirtualHost>
"
echo "$contenidoVirtualConf" > ./SegurosYa.conf

# Creacion de archivos estaticos en React
cd segurosya_frontend/
sudo chmod -R 777 ./node_modules
sudo npm ci 
sudo npm run build
sudo rm -rf /var/www/html/* && sudo cp -r build/* /var/www/html/
cd ..

sudo a2enmod rewrite

sudo cp ./SegurosYa.conf /etc/apache2/sites-available/

sudo a2ensite SegurosYa.conf

sudo service apache2 restart

echo 
echo
echo "Gracias por instalar el servidor Front-End de Administrador de Seguros Ya."
echo "El siguiente link le servira para acceder a la pagina web:"
echo "http://$linkFrontEnd"
