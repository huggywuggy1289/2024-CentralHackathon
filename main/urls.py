from django.urls import path
from .views import *

app_name = 'main'

urlpatterns = [
    path('set-open-time/', set_open_time, name='set_open_time'),
    path('', main, name = 'main'),
    path('modify-open-time/', modify_time, name='modify_open_time'),
    path('message_list/', message_list, name = 'message_list'),
    path('message_create/', message_create, name = 'message_create'),
    #알람기능 추가
    path('notifications/', alarm, name='notifications'),
    path('update/<int:id>/', update, name='update'),
    path('like/<int:id>/', like_message, name='like_message'),
]