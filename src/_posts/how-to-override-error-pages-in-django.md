---
title: 'How to override error pages in Django?'
metaDescription: 'Customizing error pages in your Django web application or
website by overriding default variables.'
excerpt: 'Customizing error pages in your web application or website is a 
handy feature because of giving an excellent experience to users and let you 
lead users to the right page after seeing the error. So lets see how to 
override these pages in Django projects.'
coverImage:
    file: '/blog/how-to-override-error-pages-in-django/cover.jpg'
    sourceName: 'Unsplash'
    sourceUrl: 'https://unsplash.com/photos/4POdKVRh_Lo'
date: '2019-03-21T09:23:01.322Z'
readingTime: '2 Minutes'
author:
  name: 'Majid'
  picture: ''
canonicalUrl: ''
---

Introduction
------------
Overriding error pages in your web application or website is a handy
feature because of giving an excellent experience to users and lets you lead 
users to the right page after seeing the error also improve your site's SEO 
rate. So let's see how to override these pages in Django projects.

---
> **Note**
> This tutorial is based on Django 2.*

Step 1 - Preparing Templates
----------------------------
OK, First, we need to create our templates. By default, Django serves 4
templates for bad requests (400), permission denied (403), not found (404) and
server error (500) errors, so we must override this template to use our
customized pages. You can design your pages on your way and then put those in 
this path:

```
your_project_root/your_app_name/templates/your_app_name/errors/
```

Step 2 - Preparing Views
------------------------
Next, put this code in your _views.py_ file:

`views.py`
---------

```
. . .

from Django.views import defaults

ERROR_400_TEMPLATE_NAME = 'errors/error_400.html'
ERROR_403_TEMPLATE_NAME = 'errors/error_403.html'
ERROR_404_TEMPLATE_NAME = 'errors/error_404.html'
ERROR_500_TEMPLATE_NAME = 'errors/error_500.html'


def bad_request(request, exception, template_name=ERROR_400_TEMPLATE_NAME):
    return defaults.bad_request(request, exception, template_name)


def permission_denied(request, exception, template_name=ERROR_403_TEMPLATE_NAME):
    return defaults.permission_denied(request, exception, template_name)


def page_not_found(request, exception, template_name=ERROR_404_TEMPLATE_NAME):
    return defaults.page_not_found(request, exception, template_name)


def server_error(request, template_name=ERROR_500_TEMPLATE_NAME):
    return defaults.server_error(request, template_name)

. . .
```

Django, by default, defines one function for each error and passes the 
template name to it.

Step 3 - Preparing URLs
-----------------------
In this step, we must declare our views in _urls.py_ file. In _urls.py_
override default error handlers to use our views.

> **Important note**
> You must do the alteration in project level URLs.

`urls.py`
---------

```
from django.contrib import admin
from django.urls import path
from my_app import views

urlpatterns = [
    path('admin/', admin.site.urls)
]

handler400 = views.bad_request
handler403 = views.permission_denied
handler404 = views.page_not_found
handler500 = views.server_error
```

Step 4 - Preparing Settings
---------------------------
Very well. The last step is to change the settings to see the result. You must
deactivate `DEBUG` mode and add your host to `ALLOWED_HOSTS`, so do it:

`settings.py`
-------------

```
DEBUG = False

ALLOWED_HOSTS = [‘localhost’, ‘127.0.0.1’]
```

OK, for testing the changes, make a fake error, for example, an incorrect URL
and see changes.

Conclusion
----------
It’s straightforward but so essential to display the proper page to users. It 
gives a good feeling to them and makes a good user experience.
