from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    path = '/home/ec2-user/MIMO/users'  # 여기 경로를 명시적으로 설정
