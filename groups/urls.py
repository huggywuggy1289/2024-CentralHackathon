from django.urls import path
from .views import *

app_name = 'groups'

urlpatterns = [
    path('group_detail/', group_detail, name='group_detail'),]