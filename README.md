#Description
An app that creates reviews for restaurants in specific city, each restaurant belongs to city and each restaurant has many reviews.


#Technical Reasoning
The app contains two parts (frontend - backend) with different features
- **Backend**
    - Django
    - Django rest framework
    - Api docs (coreapi)
    - Test cases
    - Elasticsearch (implemented simple endpoints for searching)
    - Filters (ordering - searching)
    - Validations
    - Pagination
- **Frontend**
   - ReactJs
   - MaterialUi
   - Dashboard includes basic report 
   - Create & get Restaurant
   - Create new city
   - Create reviews for a restaurant
   - Pagination & ordering by consuming endpoints in the backend
- **DevOps**
  - The backend runs on docker
#Trade-offs
- Dockerize the frontend 
- Authentication (oAuth2) 
- More features with elasticsearch (advanced search)

#Getting started with backend:
- clone the project
- run `docker-compose up -d`
- run `docker-compose run backend python manage.py migrate`
- run `docker-compose run backend python manage.py search_index --rebuild`
- Check the APIs docs from `http://localhost:8000/api/docs/`
- Run tests `docker-compose run backend python manage.py test`
- Visit Elasticsearch from `http://localhost:9200/`

#Getting started with frontend:
- go to `frontend` directory
- run `yarn && yarn start`
- then go to `localhost:3000`
- enjoy.