from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from main.models import Message
from django.contrib.auth.forms import AuthenticationForm
from .forms import *

# 1. 회원가입
class SignUpView(View):

    def get(self, request, *args, **kwargs):
        form = SignupForm()
        return render(request, 'accounts/signup.html', {'form': form})
    
    def post(self, request, *args, **kwargs):
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('accounts:welcomepage')  # 회원가입 완료 후 'accounts:welcomepage' URL로 리디렉트
        return render(request, 'accounts/signup.html', {'form': form})

# 회원가입 완료창 추가
class welcomepage(View):
    def get(self, request):
        return render(request, 'accounts/welcomepage.html')

# 2. 로그인
def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect('main:main')  # 로그인 성공 시 'accounts:main' URL로 리디렉트
        else:
            error = "아이디 또는 비밀번호가 잘못되었습니다."
            return render(request, 'accounts/login.html', {'form': form, 'error': error})
    else:
        form = AuthenticationForm()
        return render(request, 'accounts/login.html', {'form': form})

# 3. 로그아웃
def logout_view(request):
    if request.method == "POST":
        logout(request)
        return redirect('accounts:login')

# 4. 마이페이지
@login_required
def mypage_view(request):
    user_profile = get_object_or_404(Profile, user=request.user)
    return render(request, 'accounts/mypage.html', {'user_profile': user_profile})


# 4-1. 프로필 수정
@login_required
def profile_view(request):
    if request.method == 'POST':
        form = ProfileUpdateForm(request.POST, instance=request.user)
        if form.is_valid():
            user = form.save(commit=False)
            if form.cleaned_data['password']:
                user.set_password(form.cleaned_data['password'])
            user.save()
            return redirect('accounts:profile')
    else:
        form = ProfileUpdateForm(instance=request.user)
    
    return render(request, 'accounts/profile.html', {'form': form})

# 4-1. 좋아요 글 보기
@login_required
def liked_messages(request):
    user_profile = get_object_or_404(Profile, user=request.user)
    liked_messages = user_profile.liked_messages.all()

    return render(request, 'accounts/liked_messages.html', {
        'liked_messages': liked_messages,
    })