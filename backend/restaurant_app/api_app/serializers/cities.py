from rest_framework import serializers
from ..models.City import City
from rest_framework.validators import UniqueValidator
from rest_framework import serializers


class CitySerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=70)
    class Meta:
        model  = City
        fields = ("__all__")



