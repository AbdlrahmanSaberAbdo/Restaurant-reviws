import json
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from rest_framework import status
from ..models.Restaurant import Restaurant
from ..serializers.restaurants import RestaurantSerializer
import sys

class CityTestCase(APITestCase):
    def test_city_list(self):
        response = self.client.get('/api/cities/')
        result   = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(result['results'], list)

    def test_create_new_city(self):
        data = {"name": "Giza"}
        response = self.client.post('/api/cities/', data)
        result = response.json()
        expected_output = {"id": 1, "name": "Giza"}

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(result, expected_output)