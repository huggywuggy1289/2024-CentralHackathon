from django import forms
from .models import *

class GroupForm(forms.ModelForm):
    max_members = forms.IntegerField(
        min_value=2,  # 최소 값 설정
        max_value=25,  # 최대 값 설정
        widget=forms.NumberInput(attrs={
            'min': 2,
            'max': 25,
            'step': 1,
            'placeholder': '25'
        }),
        label='최대 인원 설정'
    )

    class Meta:
        model = Group
        fields = ['name', 'introduce', 'max_members']