import React from 'react';
import moment from 'moment';
import { ListItem } from '../List'

//Adds dates to page using moment.js (it's BACK!)


export const Article = props => (

  <div className="list-group" style={{margin: '2px 0'}}>
    <a rel="noopener noreferrer"href={props.url} className="list-group-item list-group-item-action flex-column align-items-start active" target="_blank">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{props.title}</h5>
        <small>{moment(props.date).format("dddd, MMMM Do YYYY, h:mm")}</small> 
      </div>
    </a>
    <ListItem  className="list-group-item">
      <div className=" w-75" style={{display: 'inline-block'}}>
        <h5 className="mb-1">{props.summary}</h5>
      </div>
      <div className="btn-group" role="group" aria-label="Basic example" style={{float: 'right'}}>
        <a rel="noopener noreferrer"href={props.url} target='_blank'><button type="button" className="btn btn-info">Read</button></a>
        <button type="button" className="btn btn-primary" onClick={props.onClick}>{props.type}</button>
      </div>
    </ListItem>
  </div>
)