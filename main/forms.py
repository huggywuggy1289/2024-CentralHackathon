from django import forms
from .models import *
from django.core.exceptions import ObjectDoesNotExist

# 열람시간 폼
class OpenTimeForm(forms.ModelForm):
    class Meta:
        model = openTime
        fields = ['morning_time', 'night_time']
        widgets = {
            'morning_time': forms.TimeInput(attrs={'type': 'time'}),
            'night_time': forms.TimeInput(attrs={'type': 'time'}),
        }

# 메세지 폼
class MessageForm(forms.ModelForm):
    nickname = forms.CharField(label="닉네임", max_length=40)

    class Meta:
        model = Message
        fields = ['morning_mes', 'night_mes', 'nickname', 'group']
        labels = {
            'morning_mes': '아침메세지',
            'night_mes': '밤메세지',
            'group': '그룹',
        }

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super(MessageForm, self).__init__(*args, **kwargs)

        # 메세지 작성시 썼던 사용자의 닉네임 폼을 수정할때 다시 띄우기 위한 코드
        if user:
            user_profile = Profile.objects.get(user=user)
            self.fields['nickname'].initial = user_profile.nickname
        
        # 그룹필드(정렬) 설정
        if user is not None:
            user_profile = Profile.objects.get(user=user)
            user_groups = Group.objects.filter(memberships__profile=user_profile)
            self.fields['group'].queryset = user_groups
            # 9:21 수정
            self.fields['group'].widget = forms.Select(choices=[(None, '전체')] + [(group.id, group.name) for group in user_groups])

    def clean_nickname(self):
        return self.cleaned_data.get('nickname')