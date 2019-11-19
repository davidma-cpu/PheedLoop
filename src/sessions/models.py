from django.db import models

# Create your models here.

class Session(models.Model):
    title = models.TextField()
    description = models.TextField()
    speakers = models.ForeignKey(Speaker, on_delete=models.CASCADE)
    rating = models.IntegerField()

class Speaker(models.Model):
    name = models.TextField()
    biography = models.TextField()
    photo = models.TextField()
    phone_number = models.TextField()
    email = models.TextField()

