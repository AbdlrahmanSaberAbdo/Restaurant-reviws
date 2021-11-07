import React, {useEffect, useState} from "react";
// eslint-disable-next-line no-unused-vars
import { Link, useHistory   } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { grey } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import PageBase from "../../components/PageBase";
import RestaurantServices from "../../services/RestaurantServices";
import CityServices from "../../services/CityServices";

const NewRestaurant = (props) => {

  const [cities, setCities] = useState([]);
  useEffect(() => {
    retrieveCities();
  }, []);
  const retrieveCities = () => {
    const data = {
      limit: 999
    };
    CityServices.getAll(data)
      .then(response => {
        setCities(response.data.results);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const initialRestaurantState = {
    id: null,
    name: "",
    city: null,
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);
  // eslint-disable-next-line no-unused-vars
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const saveRestaurant = () => {
    const data = {
      name: restaurant.name,
      city_id: restaurant.city
    };
    RestaurantServices.create(data)
      // eslint-disable-next-line no-unused-vars
      .then(response => {
        setSubmitted(true);
        // eslint-disable-next-line react/prop-types
        props.history.push("/restaurants/all");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const styles = {
    toggleDiv: {
      marginTop: 20,
      marginBottom: 5
    },
    toggleLabel: {
      color: grey[400],
      fontWeight: 100
    },
    buttons: {
      marginTop: 30,
      float: "right"
    },
    saveButton: {
      marginLeft: 5
    }
  };

  return (
    <PageBase title="New Restaurant" navigation="Restaurants / New">
      <form>
        <TextField
          hintText="Name"
          label="Name"
          name="name"
          fullWidth={true}
          margin="normal"
          value={restaurant.name}
          onChange={handleInputChange}
        />

        <FormControl fullWidth={true}>
          <InputLabel htmlFor="City">City</InputLabel>
          <Select
            fullWidth={true}
            margin="normal"
            value={restaurant.city}
            name="city"
            onClick={handleInputChange}
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            {
              cities && cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Divider />

        <div style={styles.buttons}>
          <Link to="/">
            <Button variant="contained">Cancel</Button>
          </Link>

          <Button
            onClick={saveRestaurant}
            style={styles.saveButton}
            variant="contained"
            type="button"
            color="primary"
          >
            Save
          </Button>
        </div>
      </form>
    </PageBase>
  );
};

export default NewRestaurant;
