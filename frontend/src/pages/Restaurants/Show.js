import React, { useState, useEffect } from "react";
import RestaurantServices from "../../services/RestaurantServices";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Card, CardActions,TextareaAutosize} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import ReviewServices from "../../services/ReviewServices";

const ShowRestaurant = props => {
  const initialRestaurantState = {
    id: null,
    name: "",
    city: {},
    reviews: []
  };

  const initialReviewState = {
    id: null,
    text_body: "",
    restaurant_id: null
  };
  const [currentRestaurant, setCurrentRestaurant] = useState(initialRestaurantState);
  const [review, setReview] = useState(initialReviewState);
  // eslint-disable-next-line no-unused-vars
  const [submitted, setSubmitted] = useState(false);

  const getRestaurant = id => {
    RestaurantServices.get(id)
      .then(response => {
        setCurrentRestaurant(response.data);
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    getRestaurant(props.match.params.id);
    // eslint-disable-next-line react/prop-types
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };


  const saveReview = () => {
    // eslint-disable-next-line no-undef,react/prop-types
    const data = {
      text_body: review.text_body,
      restaurant_id: props.match.params.id
    };
    ReviewServices.create(data)
      // eslint-disable-next-line no-unused-vars
      .then(response => {
        setSubmitted(true);
        setReview(initialReviewState);
        // eslint-disable-next-line react/prop-types
        getRestaurant(props.match.params.id);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const styles = {
    saveButton: {
      marginTop: 5
    }
  };
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h3" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {currentRestaurant.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            City: {currentRestaurant.city.name}
          </Typography>
          <Typography variant="body2">

            <br />
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Reviews
            </Typography>
            <div>
              {/* eslint-disable-next-line react/jsx-no-undef */}
              {currentRestaurant.reviews && currentRestaurant.reviews.map((review) => (
                // eslint-disable-next-line react/jsx-key
                <p>

                  {review.text_body}
                </p>
              ))}
            </div>

          </Typography>
        </CardContent>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <CardActions>

        </CardActions>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
            Add new review
          </Typography>
          <br/>
          <Typography variant="body2">
            <form>
              <div style={styles.buttons}>
                <FormControl fullWidth={true}>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Minimum 20 words"
                    name="text_body"
                    value={review.text_body}
                    style={{ width: 200 }}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <Button
                  onClick={saveReview}
                  style={styles.saveButton}
                  variant="contained"
                  type="button"
                  color="primary"
                >
                  Save
                </Button>
              </div>
            </form>

          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowRestaurant;
