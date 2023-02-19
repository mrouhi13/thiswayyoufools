---
title: 'How to add extra fields to M2M relations in Django?'
metaDescription: 'Customizing intermediary model for many-to-many relations in 
Django uses the through an attribute.'
excerpt: 'In Django, if you need to create a many-to-many relation, you must use
`ManyToManyField` for this purpose and Django automatically generate an
intermediary model, and everything is okay. But what do we do to add extra 
fields to the intermediary model in Django?'
coverImage:
    file: '/assets/blog/how-to-add-extra-fields-to-m2m-relations-in-django/cover.jpg'
    sourceName: 'Unsplash'
    sourceUrl: 'https://unsplash.com/photos/v1Ur7A-OkYE'
date: '2019-06-11T13:51:31.322Z'
readingTime: '4 Minutes'
author:
    name: 'Majid'
    picture: ''
ogImage:
    url: '/assets/blog/how-to-add-extra-fields-to-m2m-relations-in-django/cover.jpg'
---

Introduction
------------
In Django, if you need to create a many-to-many relation, you must use
`ManyToManyField` for this purpose and Django automatically generate an
intermediary model, and everything is okay. But what do we do to add extra 
fields to the intermediary model in Django?

---
> **Note**
> This tutorial is based on Django 2.\*

What's the problem?
-------------------
If you have worked with relational databases in your projects undoubtedly
familiar with table relations like one-to-many, one-to-one, and many-to-many.
Here we will talk about the third one, many-to-many. The M2M relations are made
by an intermediate table generally related to the Primary Key (PK)s
of the tables involved. If you want to design your database directly, you can
easily create required indexes, add PK fields to it, and add extra
fields if needed. But in Django, if you need to create a many-to-many
relation, you must add a `ManyToManyField` to your model, and Django
automatically generates an intermediary model and manage the relationship. But
what do we do to add extra fields to the intermediary model in Django?

How to solve the problem?
-------------------------
Django officially has a simple solution for this situation. Just with one
word. Here I clarify this solution with a practical example.
Let's go...

**Example:**
We have an application that business owners can add their business to send a 
request to their customers and get feedback. This is our models.py:

`models.py`
----------

```
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


class Business(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=125)


class Customer(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField( max_length=150)
    email = models.EmailField()


class Request(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    customer = models.ManyToManyField(Customer)
    name = models.CharField(max_length=225)
```

Look at my M2M relation between the Request and Customer model. As I said 
before, Django automatically creates an intermediary model for this relation. 
If you want to see what happened precisely, run this command:

-     ./manage.py sqlmigrate my_app 0001_initial

#### `Output`

```
BEGIN;
--
-- Create model Business
--
CREATE TABLE "my_app_business" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(125) NOT NULL, "user_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED);
--
-- Create model Customer
--
CREATE TABLE "my_app_customer" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "first_name" varchar(30) NOT NULL, "last_name" varchar(150) NOT NULL, "email" varchar(254) NOT NULL, "business_id" integer NOT NULL REFERENCES "my_app_business" ("id") DEFERRABLE INITIALLY DEFERRED);
--
-- Create model Request
--
CREATE TABLE "my_app_request" ("id" integer NOT NULL PRIMARY KEY
AUTOINCREMENT, "name" varchar(225) NOT NULL, "business_id" integer NOT NULL
REFERENCES "my_app_business" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE "my_app_request_customer" ("id" integer NOT NULL PRIMARY KEY
AUTOINCREMENT, "request_id" integer NOT NULL REFERENCES "my_app_request" ("id")
DEFERRABLE INITIALLY DEFERRED, "customer_id" integer NOT NULL REFERENCES "my_app_customer" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "my_app_business_user_id_63814e89" ON "my_app_business" ("user_id");
CREATE UNIQUE INDEX "my_app_customer_email_business_id_fd837417_uniq" ON "my_app_customer" ("email", "business_id");
CREATE INDEX "my_app_customer_business_id_03fd167c" ON "my_app_customer" ("business_id");
CREATE INDEX "my_app_request_business_id_bf6497a5" ON "my_app_request" ("business_id");
CREATE UNIQUE INDEX "my_app_request_customer_request_id_customer_id_80e6fd82_uniq" ON "my_app_request_customer" ("request_id", "customer_id");
CREATE INDEX "my_app_request_customer_request_id_3d196cf9" ON "my_app_request_customer" ("request_id");
CREATE INDEX "my_app_request_customer_customer_id_17fb8045" ON "my_app_request_customer" ("customer_id");
COMMIT;
```

Look at the three bold lines. This SQL queries the same rules we need 
in the database if we directly work with the database shell. The first one 
makes Request PK (`request_id`) and Customer PK (`customer_id`) unique 
together index to avoid integrity error. The two next create indexes that 
create an intermediate table to store records.

So far, everything is fine. Now we need to save customer feedback per request.
The optimized solution created the intermediary model to add extra
fields and save data. But how? `ManyToManyField` has an attribute
named `through` to specify the Django model that overrides the automatically
generated model. This option can create a new model class and add our
extra fields.

So we change our models like below:

```
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


class Business(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=125)


class Customer(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.EmailField()


class Request(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    feedback = models.ManyToManyField(Customer, through='Feedback')
    name = models.CharField(max_length=225)


class Feedback(models.Model):
    request = models.ForeignKey(Request, on_delete=models.CASCADE, related_name='request')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer')
    description = models.TextField(default='')
    created_date = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('request', 'customer')
```

Again look at SQL queries:

-     ./manage.py sqlmigrate my_app 0002

#### `Output`

```
BEGIN;
--
-- Remove field customer from request
--
DROP TABLE "my_app_request_customer";
--
-- Create model Feedback
--
CREATE TABLE "my_app_feedback" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "description" text NOT NULL, "created_on" datetime NOT NULL, "customer_id" integer NOT NULL REFERENCES "my_app_customer" ("id") DEFERRABLE INITIALLY DEFERRED, "request_id" integer NOT NULL REFERENCES "my_app_request" ("id") DEFERRABLE INITIALLY DEFERRED);
--
-- Add field feedback to request
--
CREATE TABLE "new__my_app_request" ("id" integer NOT NULL PRIMARY KEY
AUTOINCREMENT, "name" varchar(225) NOT NULL, "business_id" integer NOT NULL
REFERENCES "my_app_business" ("id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO "new__my_app_request" ("id", "name", "business_id") SELECT "id", "name", "business_id" FROM "my_app_request";
DROP TABLE "my_app_request";
ALTER TABLE "new__my_app_request" RENAME TO "my_app_request";
CREATE UNIQUE INDEX "my_app_feedback_request_id_customer_id_2ba04dd3_uniq" ON "my_app_feedback" ("request_id", "customer_id");
CREATE INDEX "my_app_feedback_customer_id_8b326804" ON "my_app_feedback" ("customer_id");
CREATE INDEX "my_app_feedback_request_id_178096e4" ON "my_app_feedback" ("request_id");
CREATE INDEX "my_app_request_business_id_bf6497a5" ON "my_app_request" ("business_id");
COMMIT;
```

As you can see, we have the previous three indexes in the new model.

So we have done!

Conclusion
----------
Having a good understanding of database design is helpful for developers. It
can help your model design, optimize your queries and product
performance, and prevent data redundancy in your database. Here you can find
some helpful references to the learning database:

[Database Tutorial](https://www.quackit.com/database/tutorial/ 'Database Tutorial')\
[Relational Database Basics](https://www.webucator.com/tutorial/learn-sql/relational-database-basics.cfm 'Relational Database Basics')\
[Database Structure and Design Tutorial](https://www.lucidchart.com/pages/database-diagram/database-design 'Database Structure and Design Tutorial')
