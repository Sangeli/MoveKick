import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Tab, Nav, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap';

class ProfilePane extends Component {
  render() {
    const { name, phone, currentAddress, futureAddress, onInputChange, handleUpdateUserProfile } = this.props;
    return (
      <Tab.Pane eventKey="profilePane">
         <div className="panel b">
            <div className="panel-heading bg-gray-lighter text-bold">Client Profile</div>
            <div className="panel-body">
               <form action="">
                  <div className="form-group">
                     <label>Name</label>
                     <input value={ name } type="text" className="form-control" onChange={(e) => onInputChange(e, 'name')}/>
                  </div>
                  <div className="form-group">
                     <label>Phone</label>
                     <input value={ phone }type="text" className="form-control" onChange={(e) => onInputChange(e, 'phone')}/>
                  </div>
                  <div className="form-group">
                     <label>Email</label>
                     <input value={ 'email' }type="text" className="form-control" onChange={(e) => onInputChange(e, 'email')}/>
                  </div>
                  <div className="form-group">
                     <label>Origin</label>
                     <input value={ currentAddress }type="text" className="form-control" onChange={(e) => onInputChange(e, 'currentAddress')}/>
                  </div>
                  <div className="form-group">
                     <label>Destination</label>
                     <input value={ futureAddress }type="text" className="form-control" onChange={(e) => onInputChange(e, 'futureAddress')}/>
                  </div>
                  <div className="form-group">
                     <label>Move Date</label>
                     <input value={ 'moveDate' }type="text" className="form-control" onChange={(e) => onInputChange(e, 'moveDate')}/>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-info"
                    onClick={ handleUpdateUserProfile }>Update User Profile</button>
                  <p>
                     <small className="text-muted">* Click to update user profile settings</small>
                  </p>
               </form>
            </div>
         </div>
      </Tab.Pane>
    )
  }
}

export default ProfilePane;