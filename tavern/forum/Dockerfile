FROM php:7.4-apache

# Set up Apache and enable mod_rewrite
RUN a2enmod rewrite

# Install required PHP extensions
RUN docker-php-ext-install mysqli

# Install additional dependencies
RUN apt-get update \
    && apt-get install -y wget unzip \
    && rm -rf /var/lib/apt/lists/*

# Create phpBB project
WORKDIR /var/www/html
RUN wget -O phpBB.zip https://download.phpbb.com/pub/release/3.3/3.3.11/phpBB-3.3.11.zip \
    && unzip phpBB.zip \
    && rm phpBB.zip \
    && chown -R www-data:www-data phpBB3 \
    && chmod -R 755 phpBB3

RUN mv /var/www/html/phpBB3/* /var/www/html
# Configure phpBB's recommended settings
#COPY .htaccess /var/www/html/phpBB3/
#COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# Expose ports
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]

