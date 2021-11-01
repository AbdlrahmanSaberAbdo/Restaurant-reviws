from django.urls import path, include
from .views.cities import *
from .views.restaurants import *
from .views.reviews import *

from rest_framework import routers
from rest_framework.routers import DefaultRouter
from .views.search import SearchCity, SearchRestaurant

router = DefaultRouter()
router.register('restaurants', RestaurantListView, 'restaurants')
router.register('cities', CityListView, 'cities')
router.register('reviews', ReviewListView, 'reviews')

urlpatterns = [
    path('', include(router.urls)),
    path('restaurants_count', RestaurantCountView.as_view()),
    path('reviews_count', ReviewCountView.as_view()),
    path('cities_count', CityCountView.as_view()),
    path('search/city/<str:query>/', SearchCity.as_view()),
    path('search/restaurant/<str:query>/', SearchRestaurant.as_view()),
]
