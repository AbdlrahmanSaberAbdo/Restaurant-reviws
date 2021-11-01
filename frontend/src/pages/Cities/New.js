import React, {useState} from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { grey } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import PageBase from "../../components/PageBase";
import CityServices from "../../services/CityServices";

const NewCity = (props) => {

  const initialCityState = {
    id: null,
    name: "",
  };
  const [city, setCity] = useState(initialCityState);
  // eslint-disable-next-line no-unused-vars
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCity({ ...city, [name]: value });
  };

  const saveRestaurant = () => {
    const data = {
      name: city.name,
    };
    CityServices.create(data)
      // eslint-disable-next-line no-unused-vars
      .then(response => {
        setSubmitted(true);
        // eslint-disable-next-line react/prop-types
        props.history.push("/cities/all");
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
    <PageBase title="New City" navigation="Cities / New">
      <form>
        <TextField
          hintText="Name"
          label="Name"
          name="name"
          fullWidth={true}
          margin="normal"
          value={city.name}
          onChange={handleInputChange}
        />

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

export default NewCity;
