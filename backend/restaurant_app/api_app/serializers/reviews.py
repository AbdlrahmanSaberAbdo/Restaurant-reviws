from rest_framework import serializers
#models
from ..models.Review import Review

from rest_framework.validators import UniqueValidator
from rest_framework import serializers

class ReviewSerializer(serializers.ModelSerializer):
    restaurant_id        = serializers.IntegerField()

    class Meta:
        model = Review
        fields = ("id","text_body","restaurant_id")

