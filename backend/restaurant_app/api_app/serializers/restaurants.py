from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework import serializers
#models
from ..models.City import City
from ..models.Review import Review
from ..models.Restaurant import Restaurant

from .cities import CitySerializer
from .reviews import ReviewSerializer

class RestaurantSerializer(serializers.ModelSerializer):
    reviews        = ReviewSerializer(many=True, read_only=True) #reviews relation ship
    city           = CitySerializer(read_only=True) # city relationship
    city_id        = serializers.IntegerField()

    name = serializers.CharField\
            (
                max_length=200,
                validators=[UniqueValidator(queryset=Restaurant.objects.all())]
             )
    class Meta:
        model = Restaurant
        fields = ('__all__')

