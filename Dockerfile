FROM python:3.8
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD ./backend/restaurant_app/requirements.txt /code/
COPY . /code/
RUN pip install -r requirements.txt