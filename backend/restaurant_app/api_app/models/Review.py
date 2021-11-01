from django.db import models
from .Restaurant import Restaurant

# Review model
class Review(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="reviews", )
    text_body = models.CharField(max_length=300, blank=False, default='')

    def __str__(self):
        return self.restaurant.name