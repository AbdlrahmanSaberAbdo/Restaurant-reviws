from django.db import models
from .City import City
# Restaurant model
class Restaurant(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')
    city = models.ForeignKey(City, on_delete=models.CASCADE)
