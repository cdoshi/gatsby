import React from 'react'
import { Link } from 'gatsby'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import Layout from '../components/layout';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

import LinearProgress from '@material-ui/core/LinearProgress';



const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#455A64',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: pink,
    // error: will use the default color
  },
});


// Inline Styles used for the demo. In real site would use css modules
const formControl = {
  margin: '1rem',
  display: 'block'
};

const formStyle = {
  margin: '1rem',
  border: 'solid #f7f7f9',
  borderWidth: '.2rem',
  padding: '1rem'
}

const snackMargin = {
  marginTop: '1rem'
}
//

// Define the state interface
interface IndexState {
  nameField: boolean,
  dobField: boolean,
  submitForm: boolean,
  loading: boolean,
  gender: string
}

class IndexPage extends React.Component<any, IndexState> {

  constructor(props) {
    super(props);

    this.state = {
      nameField: false,
      dobField: false,
      submitForm: false,
      loading: false,
      gender: ''
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  }

  handleClose() {
    this.setState({submitForm: false});
  }

  handleRadio(event) {
    this.setState({ gender: event.target.value });
  }

  // For the test, I am using custom validator. For the site, we could use out of the box validator
  validateForm() {
    if(document.getElementById('name').value.trim() === '') {
      this.setState({nameField: true});
      return;
    } else {
      this.setState({nameField: false});
    }

    if(document.getElementById('dob').value.trim() === '') {
      this.setState({dobField: true});
      return;
    } else {
      this.setState({dobField: false});
    }

    this.setState({loading: true});

    setTimeout(() => {
      this.setState({submitForm: true, loading: false})
    }, 2000);
  }

  render() {

    return (
      <MuiThemeProvider theme={theme}>
      <Layout>

      <form>

        <div style={formControl}>
          <TextField id="name" label="Name" error={this.state.nameField} required margin="normal" fullWidth={true} color="primary" />
        </div>

        <div style={formControl}>
          <TextField id="dob" label="Date of Birth" type="date" error={this.state.dobField} required InputLabelProps={{shrink: true}} fullWidth={true} />
        </div>

          <RadioGroup aria-label="Gender" name="gender1" onChange={this.handleRadio} value={this.state.gender} style={formControl}>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>

        <div style={formControl}>
          <TextField id="allergies" label="List any drug or medical material allergies" rows={3} multiline={true} fullWidth={true} InputLabelProps={{shrink: true}} />
        </div>

        <FormControl component="fieldset" style={formControl}>
          <FormLabel component="legend" color="primary">Family Medical History</FormLabel>
          <FormGroup>
            <Grid container spacing={24}>
              <Grid item md={6} sm={6}>
                <div>
                <FormControlLabel control={<Checkbox value="breastdisease" color="secondary" />} label="Breast Disease" />
              </div>
              <div>
                <FormControlLabel control={<Checkbox value="substanceabuse" color="secondary" />} label="Substance Abuse" />
              </div>
              </Grid>
              <Grid item md={6} sm={6}>
                <div>
                <FormControlLabel control={<Checkbox value="diabetes" color="secondary" />} label="Diabetes" />
              </div>
              <div>
                <FormControlLabel control={<Checkbox value="highcholesterol" color="secondary" />} label="High Cholesterol" />
              </div>
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>

        <div style={formControl}>
          <TextField id="extraIllness" label="Any other illness?" fullWidth={true} InputLabelProps={{shrink: true}} />
        </div>

        <Button variant="contained" color="secondary" fullWidth={true} onClick={this.validateForm}>
          Submit
        </Button>
        {this.state.loading && <LinearProgress color="primary"/>}
      </form>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={this.state.submitForm}
        autoHideDuration={3000}
        message={<span id="message-id">Form submitted successfully!</span>}
        onClose={this.handleClose}
        style={snackMargin}
        />
    </Layout>
  </MuiThemeProvider>
)
  }
}

export default IndexPage
