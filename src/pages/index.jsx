import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import Layout from '../components/layout';


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


class IndexPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nameField: false,
      dobField: false,
      submitForm: false
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({submitForm: false});
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

    this.setState({submitForm: true})

  }

  render() {

    return (<Layout>
      <form style={formStyle}>
        <div style={formControl}>
          <TextField id="name" label="Name" error={this.state.nameField} required margin="normal" fullWidth={true} />
        </div>

        <div style={formControl}>
          <TextField id="dob" label="Date of Birth" type="date" error={this.state.dobField} required InputLabelProps={{shrink: true}} fullWidth={true} />
        </div>

        <div style={formControl}>
          <TextField id="allergies" label="List any drug or medical material allergies and reaction" rows={3} multiline={true} fullWidth={true} InputLabelProps={{shrink: true}} />
        </div>

        <FormControl component="fieldset" style={formControl}>
          <FormLabel component="legend">Family Medical History</FormLabel>
          <FormGroup>
            <Grid container spacing={24}>
              <Grid item md={6} sm={6}>
                <div>
                <FormControlLabel control={<Checkbox value="breastdisease" color="primary" />} label="Breast Disease" />
              </div>
              <div>
                <FormControlLabel control={<Checkbox value="substanceabuse" color="primary" />} label="Substance Abuse" />
              </div>
              </Grid>
              <Grid item md={6} sm={6}>
                <div>
                <FormControlLabel control={<Checkbox value="diabetes" color="primary" />} label="Diabetes" />
              </div>
              <div>
                <FormControlLabel control={<Checkbox value="highcholesterol" color="primary" />} label="High Cholesterol" />
              </div>
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>

        <div style={formControl}>
          <TextField id="extraIllness" label="Any other illness?" fullWidth={true} InputLabelProps={{shrink: true}} />
        </div>

        <Button variant="contained" color="primary" fullWidth={true} onClick={this.validateForm}>
          Submit
        </Button>
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

    </Layout>)
  }
}

export default IndexPage
