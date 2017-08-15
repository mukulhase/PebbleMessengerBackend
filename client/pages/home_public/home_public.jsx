import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {pathFor, menuItemClass} from '/client/lib/router_utils';
import {Loading} from '/client/pages/loading/loading.jsx';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';


export class HomePublicPage extends Component {
  constructor () {
    super();
  }

  componentWillMount () {
		/*TEMPLATE_CREATED_CODE*/
  }

  componentWillUnmount () {
		/*TEMPLATE_DESTROYED_CODE*/
  }

  componentDidMount () {
		/*TEMPLATE_RENDERED_CODE*/

    Meteor.defer(function () {
      globalOnRendered();
    });
  }

  render () {
    if(this.props.data.dataLoading) {
      return (
	<Loading />
      );
    }
    return (
	<div>
		<div className="page-container container" id="content">
			<div className="row" id="title_row">
				<div className="col-md-12">
					<div id="page_menu" className="pull-right">
					</div>
				</div>
			</div>
            <HomePublicPageHomeJumbotron
              data={this.props.data}
              routeParams={this.props.routeParams} />
		</div>
	</div>
    );

  }
}

export const HomePublicPageContainer = createContainer(function (props) {
  var isReady = function () {


    var subs = [
    ];
    var ready = true;
    _.each(subs, function (sub) {
      if(!sub.ready())        {ready = false;}
    });
    return ready;
  };

  var data = { dataLoading: true };

  if(isReady()) {


    data = {

    };



  }
  return { data: data };

}, HomePublicPage);
export class HomePublicPageHomeJumbotron extends Component {
  constructor () {
    super();
  }

  componentWillMount () {
		/*TEMPLATE_CREATED_CODE*/
  }

  componentWillUnmount () {
		/*TEMPLATE_DESTROYED_CODE*/
  }

  componentDidMount () {
		/*TEMPLATE_RENDERED_CODE*/
  }

  render () {
    return (
	<div className="jumbotron ">
		<div id="content" className="container">
			<h1 id="component-title">
				<span id="component-title-icon" className="">
				</span>
				Pebble Messenger
			</h1>
			<p id="jumbotron-text">

				App is still in Beta, make sure to report issues <a href="https://github.com/mukulhase/PebbleMessengerBackend/issues">here</a>.
			</p>
			<p id="jumbotron-button">
				<a href={pathFor('login')} className="btn btn-primary btn-lg" role="button">
					Continue &raquo;
				</a>
              &nbsp;&nbsp;&nbsp;
                <a href='https://apps.getpebble.com/en_US/application/598408d5461a8d34f6000919?section=watchapps' className="btn btn-primary btn-lg" role="button">
                  Get App &raquo;
                </a>
			</p>
		</div>
	</div>
    );
  }
}
