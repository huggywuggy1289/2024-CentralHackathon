from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import User
from users.models import Profile

# 회원가입 폼
class SignupForm(UserCreationForm):
    email = forms.EmailField(label="이메일")
    nickname = forms.CharField(label="닉네임", max_length=40)

    class Meta:
        # AUTH_USER_MODEL이라고 settings.py에 정의한 user모델 가져온다는 의미
        model = User
        fields = ["nickname", "username", "email"]

# 회원 정보 수정 폼
class ProfileUpdateForm(UserChangeForm):
    password = forms.CharField(widget=forms.PasswordInput(), label="비밀번호", required=False)
    password2 = forms.CharField(widget=forms.PasswordInput(), label="비밀번호 확인", required=False)
    email = forms.EmailField(label="이메일")
    nickname = forms.CharField(label="닉네임", max_length=40)

    class Meta:
        model = User
        fields = ['nickname', 'username', 'email', 'password', 'password2']

    def clean_password2(self):
        password = self.cleaned_data.get("password")
        password2 = self.cleaned_data.get("password2")
        if password and password2 and password != password2:
            raise forms.ValidationError("비밀번호가 일치하지 않습니다.")
        return password2
    
    def __init__(self, *args, **kwargs):
        super(ProfileUpdateForm, self).__init__(*args, **kwargs)
        self.fields['username'].disabled = True
