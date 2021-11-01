import json
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from rest_framework import status
from ..models.Restaurant import Restaurant
from ..serializers.restaurants import RestaurantSerializer
import sys

class ReviewTestCase(APITestCase):
    def test_review_list(self):
        response = self.client.get('/api/reviews/')
        result   = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(result['results'], list)

    def test_create_new_review(self):
        # create fake city
        city    = self.client.post('/api/cities/', {"name": "Giza"}).json()
        city_id = city['id']

        # create fake restaurant
        restaurant    = self.client.post('/api/restaurants/', {"name": "Giza", "city_id": city_id}).json()
        restaurant_id = restaurant['id']

        data = {"text_body": "test review", "restaurant_id": restaurant_id}
        response = self.client.post('/api/reviews/', data)
        result = response.json()
        expected_output = {"id": 1, "text_body": "test review", "restaurant_id": restaurant_id}

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(result, expected_output)