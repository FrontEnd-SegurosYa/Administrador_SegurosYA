
# Mensaje inicial
echo "Bienvenido al asistente del servidor Front-End se SegurosYa."
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



#Lectura de argumentos
source argumentos.txt

contenidoLinkBackEnd="
module.exports = {
    LINKSERVER: \"$linkBackEnd:8080\",
};
"

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

# Actualizar los repositorios
sudo apt-get update

# Instalar editor de JSON por comando
sudo apt-get install -y jq

# Instalar Apache2
sudo apt-get install -y apache2

# Instalar Node.js y npm
sudo apt-get install -y nodejs npm

# Actualizar npm a la última versión
sudo npm install -g npm

# Cierre temporal del servidor Apache
sudo service apache2 stop

# Ubicacion de package.json
package_file="segurosya_frontend/package.json"

# Nuevo valor para la propiedad "homepage"
new_homepage="https://$linkFrontEnd"

# Modificar el valor de la propiedad "homepage" en el archivo package.json
jq --arg new_homepage "$new_homepage" '.homepage = $new_homepage' "$package_file" > temp.json && mv temp.json "$package_file"

# Creacion de archivos para servidor
echo "$contenidoLinkBackEnd" > "segurosya_frontend/src/utiles/constantes.js"
echo "$contenidoVirtualConf" > "/etc/apache2/sites-available/SegurosYa.conf"

# Creacion de archivos estaticos en React
cd segurosya_frontend/
npm ci && npm run build
sudo rm -rf /var/www/html/* && sudo cp -r build/* /var/www/html/

# Configuracion de servidor Apache
sudo a2enmod rewrite
sudo ln -s /etc/apache2/sites-available/SegurosYa.conf /etc/apache2/sites-enabled/
sudo service apache2 restart

echo "Gracias por instalar el servidor Front-End de Administrador de SegurosYa."
echo "Puede acceder al sitio a traves de: http://$linkFrontEnd"







