from django.db import models

# City model.
class City(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')