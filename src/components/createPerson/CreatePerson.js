import React, { Component } from "react";
import "./createPerson.css";
import SuccessMessage from "./responseMessages/SuccessMessage";
import FailedMessage from "./responseMessages/FailedMessage";
import apiKey from "../../config/config";

class CreatePerson extends Component {

    state={
        name:"",
        email: "",
        phone:"",
        personCreated: false,
        errorCreating: false
    }

    // Handles change in an input, updates state to the value of the correspondant input
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    // Handles form submission
    handleSubmit = event => {

        event.preventDefault();

        // For reseting response message display
        this.setState({ personCreated: false, errorCreating: false})
    
        const data = {
            name: this.state.name,
            email: [{label: "work", value: this.state.email, primary: true}],
            phone: [{label: "work", value: this.state.phone, primary: true}],
            org_id: Math.floor((Math.random() * 20) + 1).toString()
        }
        
        fetch(`https://api.pipedrive.com/v1/persons?api_token=${apiKey}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(data => {

            if( data.success === true) {
                this.setState({
                    personCreated: true
                })
            } else {
                this.setState({
                    errorCreating: true
                })
            }
        })
        .catch( error => this.setState({errorCreating: true}))

    }
    
    render(){

        const {name, personCreated, errorCreating} = this.state;

        return(
            <form onSubmit={ this.handleSubmit }>

                <div className="input_container">
                    <input type="text" id="nombre" name="name" placeholder="Name" onChange={ this.handleChange } required/>
                </div>

                <div className="input_container">
                    <input type="email" id="email" name="email" placeholder="Email - e.g.(email@example.com)" onChange={ this.handleChange }/>
                </div>

                <div className="input_container">
                    <input type="tel" id="phone_number" name="phone" placeholder="Phone Number" onChange={ this.handleChange }/>
                </div>

                <button type="submit" id="submit">Add Person</button>

                { personCreated ? (<SuccessMessage name={name}/>) : ("")}
                { errorCreating ? (<FailedMessage />) : ("")}

            </form>
        )
    }
}

export default CreatePerson;