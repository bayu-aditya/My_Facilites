FROM python:3.7
COPY ./ /code
WORKDIR /code
RUN pip install -r requirement.txt
CMD ["uwsgi", "uwsgi_apimyfacilities.ini"]
#CMD ["uwsgi", "--http", ":8888", "--wsgi-file", "app.py", "--callable", "app", "--master", "--processes", "2", "--threads", "2"]
