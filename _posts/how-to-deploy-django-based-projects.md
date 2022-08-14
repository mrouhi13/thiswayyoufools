---
title: 'How to deploy Django based projects?'
excerpt: "The world is very wide. Science, too. It's interesting to know that programming is also widespread. Python as a programming language has many orientations. For web development with Python, at this moment where I prepared this post, Django is a great and powerful web framework for this purpose. Let's see how to deploy a Django based project on the server."
coverImage:
    file: '/assets/blog/how-to-deploy-django-based-projects/cover.jpg'
    sourceName: 'Unsplash'
    sourceUrl: 'https://unsplash.com/photos/ogJNR_jhxS8'
date: '2019-02-02T17:35:07.322Z'
readingTime: '5 Minutes'
author:
  name: 'Majid'
  picture: ''
ogImage:
  url: '/assets/blog/how-to-deploy-django-based-projects/cover.jpg'
---

Introduction
------------
The world is very wide. Science, too. It's interesting to know that programming is also widespread. Python as a programming language has many orientations. For web development with Python, at this moment where I prepared this post, Django is a great and powerful web framework for this purpose. Let's see how to deploy a Django based project on the server...

---
For running Django projects on a production/test server we have many tools with different combinations in hand. We use this stack that listed below:

- Ubuntu 18.04
- Python 3.6
- Django 2.1.5
- Nginx 1.14
- Postgres 10.6
- Pip 19.0.2
- Virtualenv 15.1.0
- Supervisor 3.3.1
- Gunicorn 19.9.0

Step 1 - Preparing Environment
------------------------------
At the beginning we need to prepare our deployment environment, so we should update our OS and install the required packages.

1- First of all we need to create a new user for our project (I used my project name as username, you can use anything else):

-     adduser eggplant

###### `Output`

```
Adding user `eggplant' ...
Adding new group `eggplant' (1002) ...
Adding new user `eggplant' (1002) with group `eggplant' ...
Creating home directory `/home/eggplant' ...
Copying files from `/etc/skel' ...
Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully
Changing the user information for eggplant_user
Enter the new value, or press ENTER for the default
Full Name []:
Room Number []:
Work Phone []:
Home Phone []:
Other []:
Is the information correct? [Y/n] y
```

2- Next, add the user to the sudoers group:

-     adduser eggplant sudo

###### `Output`

```
Adding user `eggplant' to group `sudo' ...
Adding user eggplant to group sudo
Done.
```

3- Switch to new user shell:

-     su - eggplant

4- Now, we need upgrade our Ubuntu packages:

-     sudo apt update
-     sudo apt upgrade

5- Next, to running our project we need to install some packages:

-     sudo apt install nginx postgresql python3-pip virtualenv supervisor

Step 2 - Preparing PostgreSQL
-----------------------------
In this step, we create a user and database for our project.

1- Switch to postgres shell:

-     sudo -iu postgres

2- Create a user for our database:

-     createuser eggplant_user --pwprompt

3- Create a database for our project:

-     createdb --owner eggplant_user eggplant

4- Exit from postgres shell:

-     exit

Step 3 - Clone and Setup Project
--------------------------------
Retrieve project files from the source control and then set up the environment.

1- Clone project (In this case I used Github):

-     git clone https://github.com/mrouhi13/eggplant.git

2- Create settings file from sample:

-     cd eggplant
-     cp eggplant/settings.py.sample eggplant/settings.py

3- Update _settings.py_ file:

-     nano eggplant/settings.py

and fill `SECRET_KEY` value. you can use [Djecrety](https://djecrety.ir) to generate `SECRET_KEY` for your project and then update database section with created user and database.

> **Note**
> In the settings.py file, by default `DEBUG = False`, this means you must set your server IP or domain (if exist) in `ALLOWED_HOST`. You can set `DEBUG = True` if testing on localhost.

`eggplants/settings.py`
-----------------------

```
SECRET_KEY = '<secret_key_generated_by_djecrety>'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'eggplant',
        'USER': 'eggplant_user',
        'PASSWORD': '123456',
        'HOST': 'localhost',
        'PORT': '5432'
    }
}
```

4- Create python3 virtualenv and activate it:

-     virtualenv .env --python=python3
-     source .env/bin/activate
- 
At this point our project directory like this:

###### `Output`

```
eggplant/
|--- eggplant/
|------ __init__.py
|------ settings.py
|------ settings.py.sample
|------ usrls.py
|------ wsgi.py
|--- .env/
|--- .git/
|--- LICENSE
|--- manage.py
|--- README.md
|--- requirements.txt
|--- .gitignore
```

5- Install the Django package and other dependencies package from _requirement.txt_:

-     pip install -r requirements.txt

6- Migrate models to the database and collect static files:

-     ./manage.py migrate
-     ./manage.py collectstatic

7- At last, run server for testing everything is okay:

-     ./manage.py runserver

###### `Output`


```
Performing system checks...
System check identified no issues (0 silenced).
February 02, 2019 - 13:26:69
Django version 2.1.5, using settings 'eggplant.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

Hit _Ctrl + c_ to exit.

Step 4 - Preparing Gunicorn
---------------------------
In this step, we must connect gunicorn to project using _wsgi.py_.

> **Note**
> Gunicorn package installed with _requirements.txt_.

1- Create _gunicorn_start_ file and add configuration:

-     nano .env/bin/gunicorn_start


`.env/bin/gunicorn_start`
-------------------------

```
#!/bin/bash
NAME="eggplant"
DIR=/home/eggplant/eggplant
USER=eggplant
GROUP=eggplant
WORKERS=3
BIND=unix:/home/eggplant/eggplant/.env/run/gunicorn.sock
DJANGO_SETTINGS_MODULE=eggplant.settings
DJANGO_WSGI_MODULE=eggplant.wsgi
LOG_LEVEL=error

cd $DIR
source .env/bin/activate

export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DIR:$PYTHONPATH

exec .env/bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
--name $NAME \
--workers $WORKERS \
--user=$USER \
--group=$GROUP \
--bind=$BIND \
--log-level=$LOG_LEVEL \
--log-file=-
```

Hit _Ctrl + x_ and save file.

2- Add execute permission to _gunicorn_start_:

-     chmod u+x .env/bin/gunicorn_start

3- Make run directory for Unix socket file:

-     mkdir .env/run

4- Make logs directory and gunicorn log file:

-     mkdir .env/logs
-     touch .env/logs/gunicorn-error.log

Step 5 - Preparing Supervisor
-----------------------------
We use the supervisor to ensure our project always is running.

1- First start and enable supervisor service:

-     sudo systemctl enable supervisor
-     sudo systemctl start supervisor

2- Create _eggplant.conf_ config file for our project:

-     sudo nano /etc/supervisor/conf.d/eggplant.conf

`/etc/supervisor/conf.d/eggplant.conf`
--------------------------------------

```
[program:eggplant]
command=/home/eggplant/eggplant/.env/bin/gunicorn_start
user= eggplant
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/home/eggplant/eggplant/.env/logs/gunicorn-error.log
```

Hit _Ctrl + x_ and save file.

3- Update supervisor service to read the new configuration file:

-     sudo supervisorctl reread
-     sudo supervisorctl update

4- Check our project status:

-     sudo supervisorctl status eggplant

###### `Output`

```
eggplant RUNNING pid 30668, uptime 00:00:69
```

Step 6 - Preparing Nginx
------------------------
Now we config webserver to publish our project to the internet.

1- First remove default config symlink and then enable and start nginx service:

-     sudo rm /etc/nginx/sites-enabled/default
-     sudo systemctl start nginx
-     sudo systemctl enable nginx

2- Create a configuration file for our project and add the config to it:

-     sudo nano /etc/nginx/sites-available/eggplant

`/etc/nginx/sites-available/eggplant`
-------------------------------------

```
upstream eggplant_server {
    server unix:/home/eggplant/eggplant/.env/run/gunicorn.sock fail_timeout=0;
}

server {
    listen 80;
    listen [::]:80;

    server_name www.example.com;

    access_log /home/eggplant/eggplant/.env/logs/nginx-access.log;
    error_log /home/eggplant/eggplant/.env/logs/nginx-error.log;

    location /static/ {
        alias /home/eggplant/eggplant/static/;
    }

    location /media/ {
        alias /home/eggplant/eggplant/media/;
    }

    location / {
        try_files $uri @proxy_to_app;
    }

    location @proxy_to_app {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_pass http://eggplant_server;
    }
}
```

Hit _Ctrl + x_ and save file.

3- Create symlink for configuration file:

-     sudo ln -s /etc/nginx/sites-available/eggplant /etc/nginx/sites-enabled/eggplant

4- Restart nginx service:

-     sudo systemctl restart nginx

Finally
-------
We reboot the server to check everything is okay and all configuration correctly work:

-     sudo reboot

After all these things, check your domain (or IP or localhost if your on a test environment) and you must see something like this:

![Final Result!](/assets/blog/how-to-deploy-django-based-projects/final-result.jpg 'Final Result')

How to update our project?
--------------------------
For updating our project files using git, we need to take a few steps:

1- First, go to the project directory and activate virtualenv:

-     cd eggplant
-     source .env/bin/activate

2- Next, pull new changes from the repository:

-     git pull origin master

3- And then, do migration and collect static files updates:

-     ./manage.py migrate
-     ./manage.py collectstatic

4- In the end restart project and exit:

-     sudo supervisorctl restart eggplant
-     exit

Conclusion
----------
I tried to show a basic tutorial on this post. Of course, most of the steps have more details and as a developer, you should look for hardening, security, performance, SSL certification and etc. This post is very simplified and general to usable for everyone. you can search about the tools we used in this post and find the best solution for your project. I suggest some link below to start:

[Gunicorn official documentation](http://docs.gunicorn.org/en/stable/configure.html)\
[Supervisor official documentation](http://supervisord.org/running.html)\
[Nginx SSL configuration](https://gist.github.com/nrollr/9a39bb636a820fb97eec2ed85e473d38)
