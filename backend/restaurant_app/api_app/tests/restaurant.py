import json
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from rest_framework import status
from ..models.Restaurant import Restaurant
from ..serializers.restaurants import RestaurantSerializer
import sys

class RestaurantTestCase(APITestCase):
    def test_restaurant_list(self):
        response = self.client.get('/api/restaurants/')
        result   = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(result['results'], list)

    def test_create_new_restaurant_with_choosing_city_id(self):
        # create fake city
        city    = self.client.post('/api/cities/', {"name": "Giza"}).json()
        city_id = city['id']

        # create restaurant
        response = self.client.post('/api/restaurants/', {"name": "Zezo", "city_id": city_id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_new_restaurant_without_choosing_city_id(self):
        # create restaurant
        response = self.client.post('/api/restaurants/', {"name": "Zezo"})
        self.assertEqual(response.status_code, 400)
