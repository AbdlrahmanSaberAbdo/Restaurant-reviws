import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { cyan, pink, purple } from "@material-ui/core/colors";
import Restaurant from "@material-ui/icons/Restaurant";
import RateReview from "@material-ui/icons/RateReview";
import LocationCity from "@material-ui/icons/RateReview";

import InfoBox from "../components/dashboard/InfoBox";
import globalStyles from "../styles";
import Grid from "@material-ui/core/Grid";
import RestaurantServices from "../services/RestaurantServices";
import ReviewServices from "../services/ReviewServices";
import CityServices from "../services/CityServices";

const DashboardPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [restaurants_count, setRestaurantCount] = useState(0);
  const [cities_count, setCityCount]             = useState(0);
  const [reviews_count, setReviewCount]         = useState(0);

  // eslint-disable-next-line no-unused-vars
  const getRestaurantCount = id => {
    RestaurantServices.getCount(id)
      .then(response => {
        setRestaurantCount(response.data.restaurants_count);
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };

  // eslint-disable-next-line no-unused-vars
  const getCityCount = id => {
    CityServices.getCount()
      .then(response => {
        setCityCount(response.data.cities_count);
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };


  // eslint-disable-next-line no-unused-vars
  const getReviewCount = id => {
    ReviewServices.getCount()
      .then(response => {
        setReviewCount(response.data.reviews_count);
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    getRestaurantCount();
    getReviewCount();
    getCityCount();
    // eslint-disable-next-line react/prop-types
  }, [1]);
  return (
    <div>
      <h3 style={globalStyles.navigation}>Application / Dashboard</h3>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/restaurants/all" className="button">
            <InfoBox Icon={Restaurant} color={pink[600]} title="Total Restaurants" value={restaurants_count} />
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <InfoBox Icon={RateReview} color={cyan[600]} title="Reviews" value={reviews_count} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Link to="/cities/all" className="button">
            <InfoBox Icon={LocationCity} color={purple[600]} title="Cities" value={cities_count} />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardPage;
