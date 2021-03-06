# Generated by Django 3.2.8 on 2021-10-27 19:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0002_review'),
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=70)),
            ],
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='city',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api_app.city'),
        ),
    ]
