from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path('signup/', SignUpView.as_view(), name = 'signup'),
    path('welcomepage/', welcomepage.as_view(), name='welcomepage'),  # 새로운 URL 패턴 추가
    path('login/', login_view, name = 'login'),
    path('logout/', logout_view, name ='logout'),
    path('mypage/', mypage_view, name="mypage"),
    path('profile/', profile_view, name="profile"),
    path('liked_messages/', liked_messages, name='liked_messages'),
    path('agreement/', agreement, name = 'agreement'),
    path('fee/', fee, name='fee' ),
]