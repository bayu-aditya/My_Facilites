# author: Bayu Aditya
FROM python:3.7
WORKDIR /code
COPY requirement.txt requirement.txt
RUN pip install -r requirement.txt
COPY . .
CMD ["python", "app.py" ]