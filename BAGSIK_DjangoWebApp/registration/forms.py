from django import forms
from .models import Student

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = ['student_name', 'program', 'year_level', 'email']


    def clean_year_level(self):
        year_level = self.cleaned_data['year_level']
        if year_level not in [1, 2, 3, 4]:
            raise forms.ValidationError("Year level must be between 1 and 4.")
        return year_level  
