/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Creators } from '../../../../store/ducks/Dashboard';
import { capitalize } from '../../../../services/utils';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  CardText,
} from 'reactstrap';

const Starships = (props) => {
  const { current } = props;
  const [loadingStarships, setLoadingStarships] = useState(true);
  const [starships, setStarships] = useState([]);

  const queueData = [];
  const queueRequest = (queueProcess, entrys, callback) => {
    axios.get(entrys[queueProcess])
      .then(({ data }) => {
        queueData.push(data);

        if (queueProcess === (entrys.length - 1)) {
          callback(queueData);
        } else {
          queueProcess += 1;
          queueRequest(queueProcess, entrys, callback);
        }
      });
  };

  const getStarships = async () => {
    await queueRequest(0, current.starships, data => {
      setLoadingStarships(false);
      setStarships(data);
    });
  };

  useEffect(() => {
    getStarships();
  }, []);

  return (
    <>
      <h5>
        Starships {current.starships.length > 0 && (<span className="font-weight-bold">({current.starships.length})</span>)}
      </h5>
      {current.starships.length > 0 ? (
        loadingStarships ? (
          <p>Loading...</p>
        ) : (
          starships.map((starship, index) => (
            <Card className="mb-2" key={`starship_${index}`}>
              <CardBody>
                <CardText>{starship.name}</CardText>
                <CardText><strong>Model:</strong> {starship.model}</CardText>
                <div className="d-flex">
                  <small className="text-muted">
                    <i className="eva eva-settings-outline"></i> {capitalize(starship.manufacturer)}
                  </small>
                  <small className="text-muted ml-auto">
                    <i className="eva eva-charging-outline"></i> {starship.hyperdrive_rating}
                  </small>
                </div>
              </CardBody>
            </Card>
          ))
        )
      ) : (
        <p>N/a</p>
      )}
    </>
  );
};

class Details extends Component {
  render() {
    const { open, toggled, current } = this.props;
    return (
      <Modal isOpen={open}>
        <ModalHeader toggle={toggled}>{current.name}</ModalHeader>
        <ModalBody>
          <h5>Info</h5>

          <p className="m-0">Birth Year: <strong>{capitalize(current.birth_year)}</strong></p>
          <p className="m-0">Gender: <strong>{capitalize(current.gender)}</strong></p>
          <p className="m-0">Hair Color: <strong>{capitalize(current.hair_color)}</strong></p>

          <p className="m-0">Height: <strong>{capitalize(current.height)}cm</strong></p>
          <p className="m-0">Weight: <strong>{capitalize(current.mass)}kg</strong></p>

          <div className="mt-4">
            <Starships current={current} />
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...Creators
}, dispatch);

export default connect(state => ({
  current: state.Dashboard.current,
}), mapDispatchToProps)(Details);